import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { Trait, Creature, Pose, FilterFX, EdgyArtStyle, Costume } from './types';
import Header from './components/Header';
import Controls from './components/Controls';
import BearDisplay from './components/BearDisplay';
import CreatureSelector from './components/CreatureSelector';
import PoseSelector from './components/PoseSelector';
import TraitSelector from './components/TraitSelector';
import FilterFXSelector from './components/FilterFXSelector';
import EdgyArtStyleSelector from './components/EdgyArtStyleSelector';
import CostumeSelector from './components/CostumeSelector';
import type { TraitCategory } from './constants/categories';
import { TRAITS } from './constants/traits';
import { CREATURES } from './constants/creatures';
import { POSES } from './constants/poses';
import { FILTERS } from './constants/filters';
import { EDGY_ART_STYLES } from './constants/edgyArtStyles';
import { COSTUMES } from './constants/costumes';
import { generateCreatureImage, makeImageTransparent } from './services/geminiService';

const LOCAL_STORAGE_KEY = 'streetwearArtGen_v5_filters';
const BLANK_BEAR_ID = 0;

const App: React.FC = () => {
  const defaultCreature = CREATURES.find(c => c.name === 'Wicked Clown Teddy Bear') || CREATURES[0];

  const [selectedTraitIds, setSelectedTraitIds] = useState<Set<number>>(new Set());
  const [selectedCreatureId, setSelectedCreatureId] = useState<number>(defaultCreature.id);
  const [selectedPoseId, setSelectedPoseId] = useState<number | null>(null);
  const [selectedFilterFXId, setSelectedFilterFXId] = useState<number | null>(null);
  const [selectedEdgyArtStyleId, setSelectedEdgyArtStyleId] = useState<number | null>(null);
  const [selectedCostumeId, setSelectedCostumeId] = useState<number | null>(null);
  const [randomTraitCount, setRandomTraitCount] = useState<number>(5);
  const [isLogoMode, setIsLogoMode] = useState<boolean>(false);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMakingTransparent, setIsMakingTransparent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaveDataPresent, setIsSaveDataPresent] = useState<boolean>(false);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);

  // Memoize the derived array of selected Trait objects for downstream components
  const selectedTraits = useMemo(() => {
    return TRAITS.filter(trait => selectedTraitIds.has(trait.id));
  }, [selectedTraitIds]);


  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    setIsSaveDataPresent(!!savedData);
  }, []);

  useEffect(() => {
    if (cooldownTime > 0) {
        const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
        return () => clearTimeout(timer);
    } else if (isCoolingDown) {
        setIsCoolingDown(false);
    }
  }, [cooldownTime, isCoolingDown]);

  const generateImage = useCallback(async (
    traits: Trait[],
    creatureId: number,
    poseId: number | null,
    filterFXId: number | null,
    edgyArtStyleId: number | null,
    costumeId: number | null,
    logoMode: boolean
  ) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    // Find the full objects from IDs
    const creature = CREATURES.find(c => c.id === creatureId) || CREATURES[0];
    const pose = poseId ? POSES.find(p => p.id === poseId) : undefined;
    const filterFX = filterFXId ? FILTERS.find(f => f.id === filterFXId) : undefined;
    const edgyArtStyle = edgyArtStyleId ? EDGY_ART_STYLES.find(s => s.id === edgyArtStyleId) : undefined;
    const costume = costumeId ? COSTUMES.find(c => c.id === costumeId) : undefined;
    
    try {
      const imageUrl = await generateCreatureImage(creature, traits, pose, filterFX, edgyArtStyle, costume, logoMode);
      setGeneratedImage(imageUrl);
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : String(apiError));
    } finally {
      setIsLoading(false);
      setIsCoolingDown(true);
      setCooldownTime(20);
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    // If specific traits are selected, use them. Otherwise, generate random ones.
    let traitsToUse = selectedTraits;
    if (traitsToUse.length === 0) {
      const randomTraits = [...TRAITS].sort(() => 0.5 - Math.random()).slice(0, randomTraitCount);
      setSelectedTraitIds(new Set(randomTraits.map(t => t.id)));
      traitsToUse = randomTraits;
    }
    
    await generateImage(traitsToUse, selectedCreatureId, selectedPoseId, selectedFilterFXId, selectedEdgyArtStyleId, selectedCostumeId, isLogoMode);
  }, [selectedTraits, selectedCreatureId, selectedPoseId, selectedFilterFXId, selectedEdgyArtStyleId, selectedCostumeId, randomTraitCount, generateImage, isLogoMode]);
  
  const handleMakeTransparent = useCallback(async () => {
    if (!generatedImage || isLoading || isMakingTransparent) {
      return;
    }
    setIsMakingTransparent(true);
    setError(null);
    try {
      const transparentImageUrl = await makeImageTransparent(generatedImage);
      setGeneratedImage(transparentImageUrl);
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : String(apiError));
    } finally {
      setIsMakingTransparent(false);
    }
  }, [generatedImage, isLoading, isMakingTransparent]);

  const handleSaveConfiguration = () => {
    if (selectedTraitIds.size === 0) return;
    const config = {
      traits: Array.from(selectedTraitIds),
      creatureId: selectedCreatureId,
      poseId: selectedPoseId,
      filterFXId: selectedFilterFXId,
      edgyArtStyleId: selectedEdgyArtStyleId,
      costumeId: selectedCostumeId,
      isLogoMode: isLogoMode,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    setIsSaveDataPresent(true);
    alert('Nightmare configuration saved!');
  };

  const handleLoadConfiguration = useCallback(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const config = JSON.parse(savedData);
        if (config && Array.isArray(config.traits)) {
          setSelectedTraitIds(new Set(config.traits));
          setSelectedCreatureId(config.creatureId || defaultCreature.id);
          setSelectedPoseId(config.poseId || null);
          setSelectedFilterFXId(config.filterFXId || null);
          setSelectedEdgyArtStyleId(config.edgyArtStyleId || null);
          setSelectedCostumeId(config.costumeId || null);
          setIsLogoMode(config.isLogoMode || false);
          alert('Nightmare loaded! Make any adjustments and press GENERATE.');
          
        } else {
           setError("Saved configuration is invalid or corrupted.");
        }
      }
    } catch (e) {
      setError("Failed to load configuration. The data may be corrupted or local storage is inaccessible.");
      console.error("Error loading or parsing configuration:", e);
    }
  }, [defaultCreature.id]);
  
  const handleToggleTrait = useCallback((traitId: number) => {
    setSelectedTraitIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(traitId)) {
        newIds.delete(traitId);
      } else {
        newIds.add(traitId);
      }
      return newIds;
    });
  }, []);

  const handleShuffleCategory = useCallback((category: TraitCategory) => {
    setSelectedTraitIds(prevIds => {
      const newIds = new Set(prevIds);
      // Remove all currently selected traits from this category
      for (const trait of category.traits) {
        if (newIds.has(trait.id)) {
          newIds.delete(trait.id);
        }
      }
      // Add one new random trait from this category
      const randomTrait = category.traits[Math.floor(Math.random() * category.traits.length)];
      if (randomTrait) {
        newIds.add(randomTrait.id);
      }
      return newIds;
    });
  }, []);

  const handleClearTraits = () => setSelectedTraitIds(new Set());
  
  const handleShuffleCreature = useCallback(() => {
    const randomCreature = CREATURES[Math.floor(Math.random() * CREATURES.length)];
    setSelectedCreatureId(randomCreature.id);
  }, []);

  const handleShufflePose = useCallback(() => {
    const randomPose = POSES[Math.floor(Math.random() * POSES.length)];
    setSelectedPoseId(randomPose.id);
  }, []);
  
  const handleShuffleFilterFX = useCallback(() => {
    const randomFilter = FILTERS[Math.floor(Math.random() * FILTERS.length)];
    setSelectedFilterFXId(randomFilter.id);
  }, []);

  const handleShuffleEdgyArtStyle = useCallback(() => {
    const randomStyle = EDGY_ART_STYLES[Math.floor(Math.random() * EDGY_ART_STYLES.length)];
    setSelectedEdgyArtStyleId(randomStyle.id);
  }, []);
  
  const handleShuffleCostume = useCallback(() => {
    const randomCostume = COSTUMES[Math.floor(Math.random() * COSTUMES.length)];
    setSelectedCostumeId(randomCostume.id);
  }, []);

  const handleCreatureChange = (id: number) => {
    setSelectedCreatureId(id);
    if (id === BLANK_BEAR_ID && selectedCostumeId === null) {
      handleShuffleCostume();
    }
  };
  
  const handlePoseChange = (id: number | null) => setSelectedPoseId(id);
  const handleFilterFXChange = (id: number | null) => setSelectedFilterFXId(id);
  const handleEdgyArtStyleChange = (id: number | null) => setSelectedEdgyArtStyleId(id);
  const handleCostumeChange = (id: number | null) => setSelectedCostumeId(id);
  const handleRandomTraitCountChange = (count: number) => setRandomTraitCount(count);
  const handleToggleLogoMode = () => setIsLogoMode(prev => !prev);
  
  const handleRandomizeTraits = useCallback(() => {
    const traitsToUse = [...TRAITS].sort(() => 0.5 - Math.random()).slice(0, randomTraitCount);
    setSelectedTraitIds(new Set(traitsToUse.map(t => t.id)));
  }, [randomTraitCount]);

  const handleFullRandomize = useCallback(() => {
    handleShuffleCreature();
    handleShufflePose();
    handleShuffleFilterFX();
    handleShuffleEdgyArtStyle();
    handleShuffleCostume();
    handleRandomizeTraits();
  }, [handleShuffleCreature, handleShufflePose, handleShuffleFilterFX, handleShuffleEdgyArtStyle, handleShuffleCostume, handleRandomizeTraits]);


  return (
    <div className="min-h-screen text-gray-300 font-roboto selection:bg-red-900/80">
      <div className="console-container max-w-7xl mx-auto p-4 md:p-6 my-6">
        <Header />
        <main className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* LEFT COLUMN - ALL CONTROLS */}
            <div className="flex flex-col gap-6">
               <Controls 
                  onGenerate={handleGenerate} 
                  isLoading={isLoading || isMakingTransparent}
                  onSave={handleSaveConfiguration}
                  onLoad={handleLoadConfiguration}
                  isSaveDisabled={selectedTraitIds.size === 0}
                  isLoadDisabled={!isSaveDataPresent}
                  isCoolingDown={isCoolingDown}
                  cooldownTime={cooldownTime}
                  selectedTraitCount={selectedTraitIds.size}
                  randomTraitCount={randomTraitCount}
                  onRandomTraitCountChange={handleRandomTraitCountChange}
                  isLogoMode={isLogoMode}
                  onToggleLogoMode={handleToggleLogoMode}
                  onRandomizeTraits={handleRandomizeTraits}
                  onFullRandomize={handleFullRandomize}
              />
               <div className="panel p-4 flex flex-col gap-4">
                <CreatureSelector
                  selectedCreatureId={selectedCreatureId}
                  onChange={handleCreatureChange}
                  isDisabled={isLoading || isCoolingDown || isMakingTransparent}
                  onShuffle={handleShuffleCreature}
                />
                <CostumeSelector
                  selectedCostumeId={selectedCostumeId}
                  onChange={handleCostumeChange}
                  isDisabled={isLoading || isCoolingDown || isMakingTransparent}
                  onShuffle={handleShuffleCostume}
                />
                <PoseSelector
                  selectedPoseId={selectedPoseId}
                  onChange={handlePoseChange}
                  isDisabled={isLoading || isCoolingDown || isMakingTransparent}
                  onShuffle={handleShufflePose}
                />
                <FilterFXSelector
                  selectedFilterFXId={selectedFilterFXId}
                  onChange={handleFilterFXChange}
                  isDisabled={isLoading || isCoolingDown || isMakingTransparent}
                  onShuffle={handleShuffleFilterFX}
                />
                <EdgyArtStyleSelector
                  selectedEdgyArtStyleId={selectedEdgyArtStyleId}
                  onChange={handleEdgyArtStyleChange}
                  isDisabled={isLoading || isCoolingDown || isMakingTransparent}
                  onShuffle={handleShuffleEdgyArtStyle}
                />
              </div>
              <TraitSelector
                selectedIds={selectedTraitIds}
                onToggle={handleToggleTrait}
                isDisabled={isLoading || isCoolingDown || isMakingTransparent}
                onClear={handleClearTraits}
                onShuffleCategory={handleShuffleCategory}
              />
            </div>

            {/* RIGHT COLUMN - DISPLAY */}
            <div className="lg:sticky top-6">
              <BearDisplay
                image={generatedImage} 
                traits={selectedTraits} 
                isLoading={isLoading}
                error={error}
                onMakeTransparent={handleMakeTransparent}
                isMakingTransparent={isMakingTransparent}
                isLogoMode={isLogoMode}
              />
            </div>
          </div>
        </main>
      </div>
      <footer className="text-center p-6 text-gray-700 text-sm font-roboto-mono">
          <p>Skarebears Nightmare Engine &copy; 2024. Conjured by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;