import { Mod } from './mod'
import { hook } from './hook'
import { getMenu } from './menu'

export const start = () => {
    Mod.var.test = '666';
    Mod.Init('FlxMod',getMenu,hook,'1.0.0','24062700');
}