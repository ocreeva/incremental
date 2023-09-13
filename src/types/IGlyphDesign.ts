declare interface IGlyphDesign {
    /** The glyph component. */
    readonly GlyphComponent: React.FC;
    /** The glyph's UI name. */
    readonly name: string;
}

export default IGlyphDesign;
