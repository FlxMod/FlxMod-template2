import 'frida-il2cpp-bridge'

export const hook = (Mod) => {
    console.log('start hook');
    Il2Cpp.perform(() => {
        console.log(Mod.var.test,1);
        console.log(Il2Cpp.unityVersion);
    });
}