import CastableSpellLogic from "./Logic";
import Spell from "./Spell";

export default class CastableSpell extends Spell {
	private _classes = new Array<string>();
	private _logic = new CastableSpellLogic();
	IsCastableSpell(): this is CastableSpell {
		return true;
	}

	GetInfo() {
		return this._logic.GetInfo(this);
	}
}
