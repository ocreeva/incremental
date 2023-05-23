const importGlyph = async (assetPath: string): Promise<React.FC<React.SVGProps<SVGSVGElement>>> => {
    return (await import(`./glyphs/${assetPath}.svg`)).ReactComponent;
};

export default importGlyph;
