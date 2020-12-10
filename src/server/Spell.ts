import CastableSpell from "./CastableSpell";
import CastableSpellLogic from "./Logic";

export default class Spell {
	IsCastableSpell(): this is CastableSpell {
		return false;
	}
}
