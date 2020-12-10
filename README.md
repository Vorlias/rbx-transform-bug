# Transformer Bug
So this is a reproduction of a bug I've found with the transformer system for roblox-ts. This is a minimal reproduction of the issue I'm running into with the Zenerith project.

In certain cases, when using `this`, it will have conflicts. I believe this is due to somehow the `this` symbol not staying the same during compile when using transformers.


# Reproduction

## `this is X`
```
src/server/CastableSpell.ts:5:2 - error TS2416: Property 'IsCastableSpell' in type 'CastableSpell' is not assignable to the same property in base type 'Spell'.
  Type '() => this is import("E:/Development/roblox-ts/rbx-transform-bug/src/server/CastableSpell").default' is not assignable to type '() => this is import("E:/Development/roblox-ts/rbx-transform-bug/src/server/CastableSpell").default'. Two different types with this name exist, but they are unrelated.
    Type predicate 'this is CastableSpell' is not assignable to 'this is CastableSpell'.
      Type 'import("E:/Development/roblox-ts/rbx-transform-bug/src/server/CastableSpell").default' is not assignable to type 'import("E:/Development/roblox-ts/rbx-transform-bug/src/server/CastableSpell").default'. Two different types with this name exist, but they are unrelated.
        Types have separate declarations of a private property '_classes'.

5  IsCastableSpell(): this is CastableSpell {
```
Seems like it thinks there's two separate definitions of CastableSpell here, each with their own '_classes'

## `Method(this)`
```
src/server/CastableSpell.ts:12:30 - error TS2345: Argument of type 'this' is not assignable to parameter of type 'CastableSpell'.
  Type 'import("E:/Development/roblox-ts/rbx-transform-bug/src/server/CastableSpell").default' is not assignable to type 'import("E:/Development/roblox-ts/rbx-transform-bug/src/server/CastableSpell").default'. Two different types with this name exist, but they are unrelated.
    Types have separate declarations of a private property '_classes'.

12      return this._logic.GetInfo(this);
                                   ~~~~
```
Like the aformentioned issue, this also seems to be a conflict of symbols. 