

// FIX: Replaced the non-existent 'Likeness' type with 'ArtisticInfluence'. The 'Artist' type error will be resolved by another change.
import type { Trait, ArtisticInfluence, Artist, Creature, Genre, Pose } from '../types';

export function generatePlaceholderImage(
    creature: Creature, 
    traits: Trait[], 
    // FIX: Replaced the non-existent 'Likeness' type with 'ArtisticInfluence'.
    likeness: ArtisticInfluence | null, 
    artist: Artist | null, 
    pose: Pose | null,
    isLogoMode: boolean, 
    logoText: string,
    isAlbumCoverMode: boolean,
    genres: Genre[]
): string {
  const width = 512;
  const height = 512;
  const backgroundColor = '#111827'; // gray-900
  const textColor = '#D1D5DB'; // gray-300
  const titleColor = '#FBBF24'; // yellow-400
  const specialColor = '#60A5FA'; // blue-400


  const traitLines = traits.map((trait) => 
    `<tspan x="${width / 2}" dy="1.4em">${trait.id}. ${trait.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`
  ).join('');
  
  const likenessLine = likeness
    ? `<tspan x="${width / 2}" dy="1.5em" font-weight="bold" fill="${specialColor}">Likeness: ${likeness.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`
    : '';
  
  const artistLine = artist
    ? `<tspan x="${width / 2}" dy="1.5em" font-weight="bold" fill="${specialColor}">Artist: ${artist.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`
    : '';
    
  const poseLine = pose
    ? `<tspan x="${width / 2}" dy="1.5em" font-weight="bold" fill="${specialColor}">Pose: ${pose.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`
    : '';

  const creatureLine = `<tspan x="${width / 2}" dy="1.5em" font-weight="bold" fill="${textColor}">Creature: ${creature.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`;
  
  const genreTitle = isAlbumCoverMode ? `<tspan x="${width / 2}" dy="1.8em" font-weight="bold" fill="${textColor}">Genres:</tspan>` : '';
  const genreLines = isAlbumCoverMode ? genres.map(genre => 
      `<tspan x="${width / 2}" dy="1.4em">${genre.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`
  ).join('') : '';

  let titleText: string;
    if (isAlbumCoverMode) {
        titleText = `ALBUM: ${logoText}`;
    } else if (isLogoMode) {
        titleText = `LOGO: ${logoText}`;
    } else {
        titleText = '';
    }
  const title = titleText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const svgString = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      
      <text 
        x="${width / 2}" 
        y="40" 
        font-family="monospace" 
        font-size="20" 
        fill="${titleColor}" 
        text-anchor="middle"
        font-weight="bold"
      >
        ${title}
      </text>

      <text 
        x="${width / 2}" 
        y="80" 
        font-family="sans-serif" 
        font-size="14" 
        fill="${textColor}" 
        text-anchor="middle"
        style="white-space: pre-line;"
      >
        ${creatureLine}
        ${poseLine}
        ${likenessLine}
        ${artistLine}
        ${genreTitle}
        ${genreLines}
        ${traitLines}
      </text>

      <text
        x="${width / 2}"
        y="${height - 30}"
        font-family="monospace"
        font-size="10"
        fill="#4B5563"
        text-anchor="middle"
      >
        (This is a placeholder. Disable Placeholder Mode to generate AI image)
      </text>
    </svg>
  `;

  const base64Svg = btoa(unescape(encodeURIComponent(svgString)));

  return `data:image/svg+xml;base64,${base64Svg}`;
}