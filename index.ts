import { promises as fs } from 'fs';
import {
    importDirectory,
    cleanupSVG,
    runSVGO,
    parseColors,
    isEmptyColor,
} from '@iconify/tools';

(async () => {
    // Import icons
    const iconSet = await importDirectory('./icons', {
        prefix: 'custom',
    });

    // Validate, clean up, fix palette and optimise
    iconSet.forEach((name, type) => {
        if (type !== 'icon') {
            return;
        }

        const svg = iconSet.toSVG(name);
        if (!svg) {
            // Invalid icon
            iconSet.remove(name);
            return;
        }

        // Clean up and optimise icons
        try {
            // Clean up icon code
            cleanupSVG(svg);

            // Assume icon is monotone: replace color with currentColor, add if missing
            // If icon is not monotone, remove this code
            parseColors(svg, {
                defaultColor: 'currentColor',
                callback: (attr, colorStr, color) => {
                    return !color || isEmptyColor(color) ? colorStr : 'currentColor';
                },
            });

            // Optimise
            runSVGO(svg);
        } catch (err) {
            // Invalid icon
            console.error(`Error parsing ${name}:`, err);
            iconSet.remove(name);
            return;
        }

        // Update icon
        iconSet.fromSVG(name, svg);
    });

    // Export as IconifyJSON
    const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n';

    // Save to file
    await fs.writeFile(`./${iconSet.prefix}.json`, exported, 'utf8');
})();