
import type { Trait, Creature, Pose, FilterFX, EdgyArtStyle, Costume } from "../types";

/**
 * Creates a detailed text prompt for the Imagen image generation model.
 */
function createPrompt(
    creature: Creature, 
    traits: Trait[], 
    pose?: Pose,
    filterFX?: FilterFX,
    edgyArtStyle?: EdgyArtStyle,
    costume?: Costume,
    isLogoMode?: boolean
): string {
    const traitDescriptions = traits.map(t => t.description).join(', ');
    const isBlankBear = creature.id === 0;

    if (isLogoMode) {
        const logoCreatureName = isBlankBear ? 'a plain teddy bear' : `a ${creature.name}`;
        const logoCreatureDescription = isBlankBear ? '' : ` The character's core identity is: "${creature.description}".`;

        let logoPrompt = `Generate a single, high-quality, graphic die-cut sticker logo of ${logoCreatureName}.${logoCreatureDescription} The character's art style must be a dark, hyper-detailed, 3D render with dramatic lighting. The logo must be bold, clean, and suitable for printing as a sticker. The entire design should be isolated on a plain white background, with a distinct, thick white die-cut border around the entire shape.`;

        if (edgyArtStyle) {
            logoPrompt += ` The specific art style should be: ${edgyArtStyle.name}.`;
        }
        
        if (costume) {
            logoPrompt += ` The character is wearing a full-body ${costume.name} costume that completely covers its form.${isBlankBear ? ' This disguise is the primary, defining feature of the character.' : ''}`;
        }
        
        if (traits.length > 0) {
            logoPrompt += ` Incorporate these additional features into the character design: ${traitDescriptions}.`;
        }
        
        if (pose) {
            logoPrompt += ` The character should be in this pose: ${pose.description}. The pose must be compact and work well for a logo.`;
        }

        if (filterFX) {
            logoPrompt += ` Finally, apply this post-processing effect over the entire logo: ${filterFX.description}.`;
        }
        
        return logoPrompt.trim();
    }

    const artStyleDescription = `A hyper-realistic, dark fantasy 3D render of a SMALL, EVIL TOY TEDDY BEAR. Full body shot, centered, facing forward, dramatic pose.
    
    CRITICAL VISUAL IDENTITY:
    - **Scale & Form:** The character is distinctly a SMALL TOY or DOLL (approx 10-12 inches tall scale). It should have the classic proportions of a teddy bear (large head, stubby limbs) but corrupted. It stands upright like a collectible figure.
    - **Vibe:** This is a HORROR TOY. It must look EVIL, WICKED, and DANGEROUS. It should NOT look like a real animal, but a possessed or killer plush toy brought to life. Think "Killer Toy", "Demonic Doll", or "Cursed Artifact".
    - **Material & Texture:** Extremely detailed, gritty textures are paramount. The fur should look matted, dirty, worn, singed, or wet. Materials like leather, metal, and cloth should look aged, stained, and realistic. Avoid smooth, clean plastics unless specified.
    - **Lighting:** Cinematic, moody, dramatic lighting. Use strong RIM LIGHTING (often fiery orange, deep red, or cold blue) to define the silhouette against a solid DARK background. Deep shadows are essential to define the volume and threatening mood.
    - **Face:** Unless strictly contradicted by a trait, the bear should have a sinister expression. Common features include sharp serrated teeth, a wide manic grin, or an intense scowl. Eyes should typically be glowing intensely (red, yellow, or white) or be hollow voids.
    - **Render Quality:** Unreal Engine 5 style, 8k resolution, highly detailed, photorealistic materials, subsurface scattering, ambient occlusion. Use depth of field or macro-style framing to emphasize its small, toy-like scale.`;


    const finalArtStyleDescription = edgyArtStyle
      ? `${edgyArtStyle.name}. ${artStyleDescription}`
      : artStyleDescription;

    let prompt = `STYLE: ${finalArtStyleDescription}\n\nCHARACTER: ${isBlankBear ? 'A terror-inducing toy teddy bear base.' : creature.description}.`;
    
    if (costume) {
        prompt += `\n\nCOSTUME: The toy bear is wearing a full-body ${costume.name} costume. This costume should completely cover its original form, acting as its new skin and defining its entire appearance. It should look worn, realistic, and creepy.${isBlankBear ? ' This disguise is the primary, defining feature of the character.' : ''}`;
    }
    
    if (traits.length > 0) {
        prompt += `\n\nADDITIONAL MUTATIONS & FEATURES: ${traitDescriptions}. Ensure these features look grotesque and integrated into the horror toy aesthetic.`;
    }
    
    if (pose) {
        prompt += `\n\nPOSE: ${pose.description}.`;
    }

    if (filterFX) {
        prompt += `\n\nPOST-PROCESSING FX: Apply this visual effect over the final image: ${filterFX.description}.`;
    }

    return prompt.trim();
}


/**
 * Generates an image using the Gemini Imagen model via the backend API.
 */
export async function generateCreatureImage(
    creature: Creature, 
    traits: Trait[], 
    pose?: Pose,
    filterFX?: FilterFX,
    edgyArtStyle?: EdgyArtStyle,
    costume?: Costume,
    isLogoMode?: boolean
): Promise<string> {
  const prompt = createPrompt(creature, traits, pose, filterFX, edgyArtStyle, costume, isLogoMode);

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
    }

    return data.imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        const errorMessage = error.message;
        if (errorMessage.includes('RESOURCE_EXHAUSTED')) {
            return Promise.reject("API Busy: Rate limit reached. Please wait for the cooldown to finish.");
        }
        if (errorMessage.includes('SAFETY')) {
            return Promise.reject("Prompt blocked by safety filters. Please try different traits.");
        }
        return Promise.reject(errorMessage);
    }
    return Promise.reject("An unknown error occurred.");
  }
}

/**
 * Takes an image data URL and asks the Gemini model to make the background transparent.
 */
export async function makeImageTransparent(imageDataUrl: string): Promise<string> {
  if (!imageDataUrl.startsWith('data:image/')) {
    throw new Error("Invalid image data URL provided.");
  }
  const base64Image = imageDataUrl.split(',')[1];

  try {
    const response = await fetch('/api/transparent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Image }),
      });
  
      const data = await response.json();
      if (!response.ok) {
          throw new Error(data.error || 'Failed to process image');
      }
  
      return data.imageUrl;
  } catch (error) {
    console.error("Error making image transparent:", error);
    if (error instanceof Error) {
        return Promise.reject(error.message);
    }
    return Promise.reject("An unknown error occurred.");
  }
}
