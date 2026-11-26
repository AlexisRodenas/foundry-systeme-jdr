/**
 * Le jeton affiche trois barres : PV (barre 1), endurance (barre 2) et, pour les agents, la santé mentale,
 * juste au-dessus de la barre des PV.
 */
export default class AtlasToken extends foundry.canvas.placeables.Token {

  static COULEURS = [
    { full: 0xc0392b, empty: 0x4a1410 },
    { full: 0x2e9e5b, empty: 0x123d24 },
    { full: 0x6f73e0, empty: 0x24264f }
  ];

  /** @override */
  _getBarColors(index, data) {
    const c = AtlasToken.COULEURS[index] ?? AtlasToken.COULEURS[0];
    return { full: foundry.utils.Color.from(c.full), empty: foundry.utils.Color.from(c.empty) };
  }

  /** @override */
  drawBars() {
    super.drawBars();
    const sm = this.actor?.system?.sm;
    const cacher = !this.actor || !sm?.max || (this.document.displayBars === CONST.TOKEN_DISPLAY_MODES.NONE);
    if ( cacher ) {
      if ( this.bars?.bar3 ) this.bars.bar3.visible = false;
      return;
    }
    this.bars.bar3 ??= this.bars.addChild(new PIXI.Graphics());
    const bar = this.bars.bar3;
    this._drawBar(2, bar, { value: sm.value, max: sm.max });
    const { height } = this.document.getSize();
    const s = canvas.dimensions.uiScale;
    const bh = 8 * (this.document.height >= 2 ? 1.5 : 1) * s;
    bar.position.set(0, height - (2 * bh) - s);
    bar.visible = true;
  }
}
