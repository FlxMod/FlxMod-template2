(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.hook = void 0, require("frida-il2cpp-bridge");

const o = o => {
  console.log("start hook"), Il2Cpp.perform((() => {
    console.log(o.var.test, 1), console.log(Il2Cpp.unityVersion);
  }));
};

exports.hook = o;

},{"frida-il2cpp-bridge":34}],2:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("frida-il2cpp-bridge");

const e = require("./main");

setImmediate((() => {
  (0, e.start)();
}));

}).call(this)}).call(this,require("timers").setImmediate)
},{"./main":3,"frida-il2cpp-bridge":34,"timers":40}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.start = void 0;

const e = require("./mod"), t = require("./hook"), o = require("./menu"), r = () => {
  e.Mod.var.test = "666", e.Mod.Init("FlxMod", o.getMenu, t.hook, "1.0.0", "24062700");
};

exports.start = r;

},{"./hook":1,"./menu":4,"./mod":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getMenu = void 0;

const t = require("./mod");

require("frida-il2cpp-bridge");

const e = e => [ {
  type: "tab",
  item: [ {
    title: "tab1",
    item: [ {
      type: "button",
      title: "Test1",
      callback: t => {
        console.log("ok1");
      }
    }, {
      type: "button",
      title: "Test2",
      callback: t => {
        console.log("ok2");
      }
    }, {
      type: "button",
      title: "Test3",
      callback: t => {
        console.log("ok3");
      }
    }, {
      type: "input",
      title: "Input Test",
      val: t.Mod.var.test.toString(),
      callback: e => {
        console.log(e.val), t.Mod.var.test = e.val, console.log("Mod.var.test: " + t.Mod.var.test);
      }
    } ]
  }, {
    title: "关于",
    item: [ {
      type: "text",
      val: "Mod: " + t.Mod.name
    }, {
      type: "text",
      val: "Version: " + t.Mod.version
    }, {
      type: "text",
      val: "Build: " + t.Mod.build
    }, {
      type: "text",
      val: "CoreVersionCode: " + runtime.coreVersionCode
    }, {
      type: "button",
      title: "Dump",
      callback: t => {
        Il2Cpp.perform((() => {
          console.log(Il2Cpp.unityVersion), console.log("DumpStart"), Il2Cpp.dump(), console.log("DumpComplete");
        }));
      }
    } ]
  } ],
  default: 1
} ];

exports.getMenu = e;

},{"./mod":5,"frida-il2cpp-bridge":34}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Mod = void 0, exports.Mod = {
  name: "",
  version: "",
  build: "",
  menu: [],
  callbacks: {},
  var: {},
  Init: (e, o, t, a = "", r = "") => {
    exports.Mod.name = e, exports.Mod.getMenu = o, exports.Mod.version = a, exports.Mod.build = r, 
    exports.Mod.startHook = t, exports.Mod.createMenu(), exports.Mod.startHook(exports.Mod);
  },
  getVar: e => {
    if (exports.Mod.var[e]) return exports.Mod.var[e];
  },
  setVar: (e, o) => !!exports.Mod.var[e] && (exports.Mod.var[e] = o, !0),
  callbackBuild: () => {
    let e = 1;
    exports.Mod.getMenu(exports.Mod).forEach((o => {
      if ("tab" == o.type) o.item.forEach((o => {
        let t = 1;
        o.item.forEach((o => {
          if (o?.callback) {
            let a = e;
            for (let e = 0; e < t; e++) a += "_" + (e + 2);
            exports.Mod.callbacks[a] = o.callback;
          }
          t++;
        })), e++;
      })); else {
        if (o?.callback) {
          let t = "";
          if (1 != e) for (let o = 0; o < e; o++) t += 0 == o ? o + 1 : "_" + (o + 1); else t = 1;
          exports.Mod.callbacks[t] = o.callback;
        }
        e++;
      }
    }));
  },
  callbackHandle: e => {
    console.log(JSON.stringify(e)), exports.Mod.callbacks[e.id] && exports.Mod.callbacks[e.id](e);
  },
  createMenu: () => {
    "undefined" != typeof modmenu && (exports.Mod.callbackBuild(), exports.Mod.menuInstance = modmenu.create(exports.Mod.name, exports.Mod.getMenu(exports.Mod), {
      onchange: exports.Mod.callbackHandle
    }), exports.Mod.menuInstance.state());
  },
  startHook: void 0,
  menuInstance: void 0
};

},{}],6:[function(require,module,exports){
"use strict";

function e(e, r, t) {
  var o = t.get;
  if (!o) throw new TypeError("Getter property descriptor expected");
  t.get = function() {
    var e = o.call(this);
    return Object.defineProperty(this, r, {
      configurable: t.configurable,
      enumerable: t.enumerable,
      writable: !1,
      value: e
    }), e;
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cache = e;

},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = !0, exports.distance = exports.closest = void 0;

var r = new Uint32Array(65536), t = function(t, e) {
  for (var o = t.length, a = e.length, n = 1 << o - 1, h = -1, c = 0, f = o, l = o; l--; ) r[t.charCodeAt(l)] |= 1 << l;
  for (l = 0; l < a; l++) {
    var v = r[e.charCodeAt(l)], i = v | c;
    (c |= ~((v |= (v & h) + h ^ h) | h)) & n && f++, (h &= v) & n && f--, h = h << 1 | ~(i | (c = c << 1 | 1)), 
    c &= i;
  }
  for (l = o; l--; ) r[t.charCodeAt(l)] = 0;
  return f;
}, e = function(t, e) {
  for (var o = e.length, a = t.length, n = [], h = [], c = Math.ceil(o / 32), f = Math.ceil(a / 32), l = 0; l < c; l++) h[l] = -1, 
  n[l] = 0;
  for (var v = 0; v < f - 1; v++) {
    for (var i = 0, s = -1, d = 32 * v, g = Math.min(32, a) + d, u = d; u < g; u++) r[t.charCodeAt(u)] |= 1 << u;
    for (l = 0; l < o; l++) {
      var A = r[e.charCodeAt(l)], C = h[l / 32 | 0] >>> l & 1, p = A | i, x = s & (b = ((A | (U = n[l / 32 | 0] >>> l & 1)) & s) + s ^ s | A | U);
      (j = i | ~(b | s)) >>> 31 ^ C && (h[l / 32 | 0] ^= 1 << l), x >>> 31 ^ U && (n[l / 32 | 0] ^= 1 << l), 
      s = (x = x << 1 | U) | ~(p | (j = j << 1 | C)), i = j & p;
    }
    for (u = d; u < g; u++) r[t.charCodeAt(u)] = 0;
  }
  var M = 0, m = -1, _ = 32 * v, w = Math.min(32, a - _) + _;
  for (u = _; u < w; u++) r[t.charCodeAt(u)] |= 1 << u;
  var y = a;
  for (l = 0; l < o; l++) {
    var U, b, j;
    A = r[e.charCodeAt(l)], C = h[l / 32 | 0] >>> l & 1, p = A | M;
    y += (j = M | ~((b = ((A | (U = n[l / 32 | 0] >>> l & 1)) & m) + m ^ m | A | U) | m)) >>> a - 1 & 1, 
    y -= (x = m & b) >>> a - 1 & 1, j >>> 31 ^ C && (h[l / 32 | 0] ^= 1 << l), x >>> 31 ^ U && (n[l / 32 | 0] ^= 1 << l), 
    m = (x = x << 1 | U) | ~(p | (j = j << 1 | C)), M = j & p;
  }
  for (u = _; u < w; u++) r[t.charCodeAt(u)] = 0;
  return y;
}, o = function(r, o) {
  if (r.length < o.length) {
    var a = o;
    o = r, r = a;
  }
  return 0 === o.length ? r.length : r.length <= 32 ? t(r, o) : e(r, o);
};

exports.distance = o;

var a = function(r, t) {
  for (var e = 1 / 0, a = 0, n = 0; n < t.length; n++) {
    var h = o(r, t[n]);
    h < e && (e = h, a = n);
  }
  return t[a];
};

exports.closest = a;

},{}],8:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, n, i) {
  var r, _ = arguments.length, s = _ < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (_ < 3 ? r(s) : _ > 3 ? r(e, n, s) : r(e, n)) || s);
  return _ > 3 && s && Object.defineProperty(e, n, s), s;
}, e = this && this.__importDefault || function(t) {
  return t && t.__esModule ? t : {
    default: t
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const n = require("decorator-cache-getter"), i = e(require("versioning")), r = require("../utils/console");

class _ {
  constructor() {}
  static get _alloc() {
    return this.r("il2cpp_alloc", "pointer", [ "size_t" ]);
  }
  static get _arrayGetElements() {
    return this.r("il2cpp_array_get_elements", "pointer", [ "pointer" ]);
  }
  static get _arrayGetLength() {
    return this.r("il2cpp_array_length", "uint32", [ "pointer" ]);
  }
  static get _arrayNew() {
    return this.r("il2cpp_array_new", "pointer", [ "pointer", "uint32" ]);
  }
  static get _assemblyGetImage() {
    return this.r("il2cpp_assembly_get_image", "pointer", [ "pointer" ]);
  }
  static get _classForEach() {
    return this.r("il2cpp_class_for_each", "void", [ "pointer", "pointer" ]);
  }
  static get _classFromName() {
    return this.r("il2cpp_class_from_name", "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _classFromSystemType() {
    return this.r("il2cpp_class_from_system_type", "pointer", [ "pointer" ]);
  }
  static get _classFromType() {
    return this.r("il2cpp_class_from_type", "pointer", [ "pointer" ]);
  }
  static get _classGetActualInstanceSize() {
    return this.r("il2cpp_class_get_actual_instance_size", "int32", [ "pointer" ]);
  }
  static get _classGetArrayClass() {
    return this.r("il2cpp_array_class_get", "pointer", [ "pointer", "uint32" ]);
  }
  static get _classGetArrayElementSize() {
    return this.r("il2cpp_class_array_element_size", "int", [ "pointer" ]);
  }
  static get _classGetAssemblyName() {
    return this.r("il2cpp_class_get_assemblyname", "pointer", [ "pointer" ]);
  }
  static get _classGetBaseType() {
    return this.r("il2cpp_class_enum_basetype", "pointer", [ "pointer" ]);
  }
  static get _classGetDeclaringType() {
    return this.r("il2cpp_class_get_declaring_type", "pointer", [ "pointer" ]);
  }
  static get _classGetElementClass() {
    return this.r("il2cpp_class_get_element_class", "pointer", [ "pointer" ]);
  }
  static get _classGetFieldFromName() {
    return this.r("il2cpp_class_get_field_from_name", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetFields() {
    return this.r("il2cpp_class_get_fields", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetFlags() {
    return this.r("il2cpp_class_get_flags", "int", [ "pointer" ]);
  }
  static get _classGetImage() {
    return this.r("il2cpp_class_get_image", "pointer", [ "pointer" ]);
  }
  static get _classGetInstanceSize() {
    return this.r("il2cpp_class_instance_size", "int32", [ "pointer" ]);
  }
  static get _classGetInterfaces() {
    return this.r("il2cpp_class_get_interfaces", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetMethodFromName() {
    return this.r("il2cpp_class_get_method_from_name", "pointer", [ "pointer", "pointer", "int" ]);
  }
  static get _classGetMethods() {
    return this.r("il2cpp_class_get_methods", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetName() {
    return this.r("il2cpp_class_get_name", "pointer", [ "pointer" ]);
  }
  static get _classGetNamespace() {
    return this.r("il2cpp_class_get_namespace", "pointer", [ "pointer" ]);
  }
  static get _classGetNestedClasses() {
    return this.r("il2cpp_class_get_nested_types", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetParent() {
    return this.r("il2cpp_class_get_parent", "pointer", [ "pointer" ]);
  }
  static get _classGetRank() {
    return this.r("il2cpp_class_get_rank", "int", [ "pointer" ]);
  }
  static get _classGetStaticFieldData() {
    return this.r("il2cpp_class_get_static_field_data", "pointer", [ "pointer" ]);
  }
  static get _classGetValueSize() {
    return this.r("il2cpp_class_value_size", "int32", [ "pointer", "pointer" ]);
  }
  static get _classGetType() {
    return this.r("il2cpp_class_get_type", "pointer", [ "pointer" ]);
  }
  static get _classHasReferences() {
    return this.r("il2cpp_class_has_references", "bool", [ "pointer" ]);
  }
  static get _classInit() {
    return this.r("il2cpp_runtime_class_init", "void", [ "pointer" ]);
  }
  static get _classIsAbstract() {
    return this.r("il2cpp_class_is_abstract", "bool", [ "pointer" ]);
  }
  static get _classIsAssignableFrom() {
    return this.r("il2cpp_class_is_assignable_from", "bool", [ "pointer", "pointer" ]);
  }
  static get _classIsBlittable() {
    return this.r("il2cpp_class_is_blittable", "bool", [ "pointer" ]);
  }
  static get _classIsEnum() {
    return this.r("il2cpp_class_is_enum", "bool", [ "pointer" ]);
  }
  static get _classIsGeneric() {
    return this.r("il2cpp_class_is_generic", "bool", [ "pointer" ]);
  }
  static get _classIsInflated() {
    return this.r("il2cpp_class_is_inflated", "bool", [ "pointer" ]);
  }
  static get _classIsInterface() {
    return this.r("il2cpp_class_is_interface", "bool", [ "pointer" ]);
  }
  static get _classIsSubclassOf() {
    return this.r("il2cpp_class_is_subclass_of", "bool", [ "pointer", "pointer", "bool" ]);
  }
  static get _classIsValueType() {
    return this.r("il2cpp_class_is_valuetype", "bool", [ "pointer" ]);
  }
  static get _domainAssemblyOpen() {
    return this.r("il2cpp_domain_assembly_open", "pointer", [ "pointer", "pointer" ]);
  }
  static get _domainGet() {
    return this.r("il2cpp_domain_get", "pointer", []);
  }
  static get _domainGetAssemblies() {
    return this.r("il2cpp_domain_get_assemblies", "pointer", [ "pointer", "pointer" ]);
  }
  static get _fieldGetModifier() {
    return this.r("il2cpp_field_get_modifier", "pointer", [ "pointer" ]);
  }
  static get _fieldGetClass() {
    return this.r("il2cpp_field_get_parent", "pointer", [ "pointer" ]);
  }
  static get _fieldGetFlags() {
    return this.r("il2cpp_field_get_flags", "int", [ "pointer" ]);
  }
  static get _fieldGetName() {
    return this.r("il2cpp_field_get_name", "pointer", [ "pointer" ]);
  }
  static get _fieldGetOffset() {
    return this.r("il2cpp_field_get_offset", "int32", [ "pointer" ]);
  }
  static get _fieldGetStaticValue() {
    return this.r("il2cpp_field_static_get_value", "void", [ "pointer", "pointer" ]);
  }
  static get _fieldGetType() {
    return this.r("il2cpp_field_get_type", "pointer", [ "pointer" ]);
  }
  static get _fieldIsLiteral() {
    return this.r("il2cpp_field_is_literal", "bool", [ "pointer" ]);
  }
  static get _fieldIsStatic() {
    return this.r("il2cpp_field_is_static", "bool", [ "pointer" ]);
  }
  static get _fieldIsThreadStatic() {
    return this.r("il2cpp_field_is_thread_static", "bool", [ "pointer" ]);
  }
  static get _fieldSetStaticValue() {
    return this.r("il2cpp_field_static_set_value", "void", [ "pointer", "pointer" ]);
  }
  static get _free() {
    return this.r("il2cpp_free", "void", [ "pointer" ]);
  }
  static get _gcCollect() {
    return this.r("il2cpp_gc_collect", "void", [ "int" ]);
  }
  static get _gcCollectALittle() {
    return this.r("il2cpp_gc_collect_a_little", "void", []);
  }
  static get _gcDisable() {
    return this.r("il2cpp_gc_disable", "void", []);
  }
  static get _gcEnable() {
    return this.r("il2cpp_gc_enable", "void", []);
  }
  static get _gcGetHeapSize() {
    return this.r("il2cpp_gc_get_heap_size", "int64", []);
  }
  static get _gcGetMaxTimeSlice() {
    return this.r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
  }
  static get _gcGetUsedSize() {
    return this.r("il2cpp_gc_get_used_size", "int64", []);
  }
  static get _gcHandleGetTarget() {
    return this.r("il2cpp_gchandle_get_target", "pointer", [ "uint32" ]);
  }
  static get _gcHandleFree() {
    return this.r("il2cpp_gchandle_free", "void", [ "uint32" ]);
  }
  static get _gcHandleNew() {
    return this.r("il2cpp_gchandle_new", "uint32", [ "pointer", "bool" ]);
  }
  static get _gcHandleNewWeakRef() {
    return this.r("il2cpp_gchandle_new_weakref", "uint32", [ "pointer", "bool" ]);
  }
  static get _gcIsDisabled() {
    return this.r("il2cpp_gc_is_disabled", "bool", []);
  }
  static get _gcIsIncremental() {
    return this.r("il2cpp_gc_is_incremental", "bool", []);
  }
  static get _gcSetMaxTimeSlice() {
    return this.r("il2cpp_gc_set_max_time_slice_ns", "void", [ "int64" ]);
  }
  static get _gcStartIncrementalCollection() {
    return this.r("il2cpp_gc_start_incremental_collection", "void", []);
  }
  static get _gcStartWorld() {
    return this.r("il2cpp_start_gc_world", "void", []);
  }
  static get _gcStopWorld() {
    return this.r("il2cpp_stop_gc_world", "void", []);
  }
  static get _getCorlib() {
    return this.r("il2cpp_get_corlib", "pointer", []);
  }
  static get _imageGetAssembly() {
    return this.r("il2cpp_image_get_assembly", "pointer", [ "pointer" ]);
  }
  static get _imageGetClass() {
    return this.r("il2cpp_image_get_class", "pointer", [ "pointer", "uint" ]);
  }
  static get _imageGetClassCount() {
    return this.r("il2cpp_image_get_class_count", "uint32", [ "pointer" ]);
  }
  static get _imageGetName() {
    return this.r("il2cpp_image_get_name", "pointer", [ "pointer" ]);
  }
  static get _init() {
    return this.r("il2cpp_init", "void", []);
  }
  static get _livenessAllocateStruct() {
    return this.r("il2cpp_unity_liveness_allocate_struct", "pointer", [ "pointer", "int", "pointer", "pointer", "pointer" ]);
  }
  static get _livenessCalculationBegin() {
    return this.r("il2cpp_unity_liveness_calculation_begin", "pointer", [ "pointer", "int", "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _livenessCalculationEnd() {
    return this.r("il2cpp_unity_liveness_calculation_end", "void", [ "pointer" ]);
  }
  static get _livenessCalculationFromStatics() {
    return this.r("il2cpp_unity_liveness_calculation_from_statics", "void", [ "pointer" ]);
  }
  static get _livenessFinalize() {
    return this.r("il2cpp_unity_liveness_finalize", "void", [ "pointer" ]);
  }
  static get _livenessFreeStruct() {
    return this.r("il2cpp_unity_liveness_free_struct", "void", [ "pointer" ]);
  }
  static get _memorySnapshotCapture() {
    return this.r("il2cpp_capture_memory_snapshot", "pointer", []);
  }
  static get _memorySnapshotFree() {
    return this.r("il2cpp_free_captured_memory_snapshot", "void", [ "pointer" ]);
  }
  static get _memorySnapshotGetClasses() {
    return this.r("il2cpp_memory_snapshot_get_classes", "pointer", [ "pointer", "pointer" ]);
  }
  static get _memorySnapshotGetGCHandles() {
    return this.r("il2cpp_memory_snapshot_get_gc_handles", [ "uint32", "pointer" ], [ "pointer" ]);
  }
  static get _memorySnapshotGetRuntimeInformation() {
    return this.r("il2cpp_memory_snapshot_get_information", [ "uint32", "uint32", "uint32", "uint32", "uint32", "uint32" ], [ "pointer" ]);
  }
  static get _methodGetModifier() {
    return this.r("il2cpp_method_get_modifier", "pointer", [ "pointer" ]);
  }
  static get _methodGetClass() {
    return this.r("il2cpp_method_get_class", "pointer", [ "pointer" ]);
  }
  static get _methodGetFlags() {
    return this.r("il2cpp_method_get_flags", "uint32", [ "pointer", "pointer" ]);
  }
  static get _methodGetFromReflection() {
    return this.r("il2cpp_method_get_from_reflection", "pointer", [ "pointer" ]);
  }
  static get _methodGetName() {
    return this.r("il2cpp_method_get_name", "pointer", [ "pointer" ]);
  }
  static get _methodGetObject() {
    return this.r("il2cpp_method_get_object", "pointer", [ "pointer", "pointer" ]);
  }
  static get _methodGetParameterCount() {
    return this.r("il2cpp_method_get_param_count", "uint8", [ "pointer" ]);
  }
  static get _methodGetParameterName() {
    return this.r("il2cpp_method_get_param_name", "pointer", [ "pointer", "uint32" ]);
  }
  static get _methodGetParameters() {
    return this.r("il2cpp_method_get_parameters", "pointer", [ "pointer", "pointer" ]);
  }
  static get _methodGetParameterType() {
    return this.r("il2cpp_method_get_param", "pointer", [ "pointer", "uint32" ]);
  }
  static get _methodGetPointer() {
    return this.r("il2cpp_method_get_pointer", "pointer", [ "pointer" ]);
  }
  static get _methodGetReturnType() {
    return this.r("il2cpp_method_get_return_type", "pointer", [ "pointer" ]);
  }
  static get _methodIsExternal() {
    return this.r("il2cpp_method_is_external", "bool", [ "pointer" ]);
  }
  static get _methodIsGeneric() {
    return this.r("il2cpp_method_is_generic", "bool", [ "pointer" ]);
  }
  static get _methodIsInflated() {
    return this.r("il2cpp_method_is_inflated", "bool", [ "pointer" ]);
  }
  static get _methodIsInstance() {
    return this.r("il2cpp_method_is_instance", "bool", [ "pointer" ]);
  }
  static get _methodIsSynchronized() {
    return this.r("il2cpp_method_is_synchronized", "bool", [ "pointer" ]);
  }
  static get _monitorEnter() {
    return this.r("il2cpp_monitor_enter", "void", [ "pointer" ]);
  }
  static get _monitorExit() {
    return this.r("il2cpp_monitor_exit", "void", [ "pointer" ]);
  }
  static get _monitorPulse() {
    return this.r("il2cpp_monitor_pulse", "void", [ "pointer" ]);
  }
  static get _monitorPulseAll() {
    return this.r("il2cpp_monitor_pulse_all", "void", [ "pointer" ]);
  }
  static get _monitorTryEnter() {
    return this.r("il2cpp_monitor_try_enter", "bool", [ "pointer", "uint32" ]);
  }
  static get _monitorTryWait() {
    return this.r("il2cpp_monitor_try_wait", "bool", [ "pointer", "uint32" ]);
  }
  static get _monitorWait() {
    return this.r("il2cpp_monitor_wait", "void", [ "pointer" ]);
  }
  static get _objectGetClass() {
    return this.r("il2cpp_object_get_class", "pointer", [ "pointer" ]);
  }
  static get _objectGetVirtualMethod() {
    return this.r("il2cpp_object_get_virtual_method", "pointer", [ "pointer", "pointer" ]);
  }
  static get _objectInit() {
    return this.r("il2cpp_runtime_object_init_exception", "void", [ "pointer", "pointer" ]);
  }
  static get _objectNew() {
    return this.r("il2cpp_object_new", "pointer", [ "pointer" ]);
  }
  static get _objectGetSize() {
    return this.r("il2cpp_object_get_size", "uint32", [ "pointer" ]);
  }
  static get _objectUnbox() {
    return this.r("il2cpp_object_unbox", "pointer", [ "pointer" ]);
  }
  static get _resolveInternalCall() {
    return this.r("il2cpp_resolve_icall", "pointer", [ "pointer" ]);
  }
  static get _stringChars() {
    return this.r("il2cpp_string_chars", "pointer", [ "pointer" ]);
  }
  static get _stringLength() {
    return this.r("il2cpp_string_length", "int32", [ "pointer" ]);
  }
  static get _stringNew() {
    return this.r("il2cpp_string_new", "pointer", [ "pointer" ]);
  }
  static get _stringSetLength() {
    return this.r("il2cpp_string_set_length", "void", [ "pointer", "int32" ]);
  }
  static get _valueBox() {
    return this.r("il2cpp_value_box", "pointer", [ "pointer", "pointer" ]);
  }
  static get _threadAttach() {
    return this.r("il2cpp_thread_attach", "pointer", [ "pointer" ]);
  }
  static get _threadCurrent() {
    return this.r("il2cpp_thread_current", "pointer", []);
  }
  static get _threadGetAllAttachedThreads() {
    return this.r("il2cpp_thread_get_all_attached_threads", "pointer", [ "pointer" ]);
  }
  static get _threadIsVm() {
    return this.r("il2cpp_is_vm_thread", "bool", [ "pointer" ]);
  }
  static get _threadDetach() {
    return this.r("il2cpp_thread_detach", "void", [ "pointer" ]);
  }
  static get _typeGetName() {
    return this.r("il2cpp_type_get_name", "pointer", [ "pointer" ]);
  }
  static get _typeGetObject() {
    return this.r("il2cpp_type_get_object", "pointer", [ "pointer" ]);
  }
  static get _typeGetTypeEnum() {
    return this.r("il2cpp_type_get_type", "int", [ "pointer" ]);
  }
  static get _typeIsByReference() {
    return this.r("il2cpp_type_is_byref", "bool", [ "pointer" ]);
  }
  static get _typeIsPrimitive() {
    return this.r("il2cpp_type_is_primitive", "bool", [ "pointer" ]);
  }
  static get cModule() {
    (i.default.lt(Il2Cpp.unityVersion, "5.3.0") || i.default.gte(Il2Cpp.unityVersion, "2022.2.0")) && (0, 
    r.warn)(`current Unity version ${Il2Cpp.unityVersion} is not supported, expect breakage`);
    const t = new CModule("#include <stdint.h>\n\n#define OFFSET_OF(name, type)     int16_t name (char * p,                  type e)    {        for (int16_t i = 0; i < 512; i++) if (* ((type *) p + i) == e) return i;        return -1;    }\n\nOFFSET_OF (offset_of_int32, int32_t)\nOFFSET_OF (offset_of_pointer, void *)\n            "), e = new NativeFunction(t.offset_of_int32, "int16", [ "pointer", "int32" ]), n = new NativeFunction(t.offset_of_pointer, "int16", [ "pointer", "pointer" ]), _ = Il2Cpp.Image.corlib.class("System.String"), s = Il2Cpp.Image.corlib.class("System.DateTime"), a = Il2Cpp.Image.corlib.class("System.Reflection.Module");
    s.initialize(), a.initialize();
    const l = (s.tryField("daysmonth") ?? s.tryField("DaysToMonth365") ?? s.field("s_daysToMonth365")).value, c = a.field("FilterTypeName").value, p = c.field("method_ptr").value, o = c.field("method").value, u = `#include <stdint.h>\n#include <string.h>\n\n\ntypedef struct _Il2CppObject Il2CppObject;\ntypedef enum _Il2CppTypeEnum Il2CppTypeEnum;\ntypedef struct _Il2CppReflectionMethod Il2CppReflectionMethod;\ntypedef struct _Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;\ntypedef struct _Il2CppMetadataType Il2CppMetadataType;\n\n\nstruct _Il2CppObject\n{\n    void * class;\n    void * monitor;\n};\n\nenum _Il2CppTypeEnum\n{\n    IL2CPP_TYPE_END = 0x00,\n    IL2CPP_TYPE_VOID = 0x01,\n    IL2CPP_TYPE_BOOLEAN = 0x02,\n    IL2CPP_TYPE_CHAR = 0x03,\n    IL2CPP_TYPE_I1 = 0x04,\n    IL2CPP_TYPE_U1 = 0x05,\n    IL2CPP_TYPE_I2 = 0x06,\n    IL2CPP_TYPE_U2 = 0x07,\n    IL2CPP_TYPE_I4 = 0x08,\n    IL2CPP_TYPE_U4 = 0x09,\n    IL2CPP_TYPE_I8 = 0x0a,\n    IL2CPP_TYPE_U8 = 0x0b,\n    IL2CPP_TYPE_R4 = 0x0c,\n    IL2CPP_TYPE_R8 = 0x0d,\n    IL2CPP_TYPE_STRING = 0x0e,\n    IL2CPP_TYPE_PTR = 0x0f,\n    IL2CPP_TYPE_BYREF = 0x10,\n    IL2CPP_TYPE_VALUETYPE = 0x11,\n    IL2CPP_TYPE_CLASS = 0x12,\n    IL2CPP_TYPE_VAR = 0x13,\n    IL2CPP_TYPE_ARRAY = 0x14,\n    IL2CPP_TYPE_GENERICINST = 0x15,\n    IL2CPP_TYPE_TYPEDBYREF = 0x16,\n    IL2CPP_TYPE_I = 0x18,\n    IL2CPP_TYPE_U = 0x19,\n    IL2CPP_TYPE_FNPTR = 0x1b,\n    IL2CPP_TYPE_OBJECT = 0x1c,\n    IL2CPP_TYPE_SZARRAY = 0x1d,\n    IL2CPP_TYPE_MVAR = 0x1e,\n    IL2CPP_TYPE_CMOD_REQD = 0x1f,\n    IL2CPP_TYPE_CMOD_OPT = 0x20,\n    IL2CPP_TYPE_INTERNAL = 0x21,\n    IL2CPP_TYPE_MODIFIER = 0x40,\n    IL2CPP_TYPE_SENTINEL = 0x41,\n    IL2CPP_TYPE_PINNED = 0x45,\n    IL2CPP_TYPE_ENUM = 0x55\n};\n\nstruct _Il2CppReflectionMethod\n{\n    Il2CppObject object;\n    void * method;\n    void * name;\n    void * reftype;\n};\n\nstruct _Il2CppManagedMemorySnapshot\n{\n    struct Il2CppManagedHeap\n    {\n        uint32_t section_count;\n        void * sections;\n    } heap;\n    struct Il2CppStacks\n    {\n        uint32_t stack_count;\n        void * stacks;\n    } stacks;\n    struct Il2CppMetadataSnapshot\n    {\n        uint32_t type_count;\n        Il2CppMetadataType * types;\n    } metadata_snapshot;\n    struct Il2CppGCHandles\n    {\n        uint32_t tracked_object_count;\n        Il2CppObject ** pointers_to_objects;\n    } gc_handles;\n    struct Il2CppRuntimeInformation\n    {\n        uint32_t pointer_size;\n        uint32_t object_header_size;\n        uint32_t array_header_size;\n        uint32_t array_bounds_offset_in_header;\n        uint32_t array_size_offset_in_header;\n        uint32_t allocation_granularity;\n    } runtime_information;\n    void * additional_user_information;\n};\n\nstruct _Il2CppMetadataType\n{\n    uint32_t flags;\n    void * fields;\n    uint32_t field_count;\n    uint32_t statics_size;\n    uint8_t * statics;\n    uint32_t base_or_element_type_index;\n    char * name;\n    const char * assembly_name;\n    uint64_t type_info_address;\n    uint32_t size;\n};\n\n\n#define THREAD_STATIC_FIELD_OFFSET -1;\n\n#define FIELD_ATTRIBUTE_FIELD_ACCESS_MASK 0x0007\n#define FIELD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000\n#define FIELD_ATTRIBUTE_PRIVATE 0x0001\n#define FIELD_ATTRIBUTE_FAM_AND_ASSEM 0x0002\n#define FIELD_ATTRIBUTE_ASSEMBLY 0x0003\n#define FIELD_ATTRIBUTE_FAMILY 0x0004\n#define FIELD_ATTRIBUTE_FAM_OR_ASSEM 0x0005\n#define FIELD_ATTRIBUTE_PUBLIC 0x0006\n\n#define FIELD_ATTRIBUTE_STATIC 0x0010\n#define FIELD_ATTRIBUTE_LITERAL 0x0040\n\n#define METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK 0x0007\n#define METHOD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000\n#define METHOD_ATTRIBUTE_PRIVATE 0x0001\n#define METHOD_ATTRIBUTE_FAM_AND_ASSEM 0x0002\n#define METHOD_ATTRIBUTE_ASSEMBLY 0x0003\n#define METHOD_ATTRIBUTE_FAMILY 0x0004\n#define METHOD_ATTRIBUTE_FAM_OR_ASSEM 0x0005\n#define METHOD_ATTRIBUTE_PUBLIC 0x0006\n\n#define METHOD_ATTRIBUTE_STATIC 0x0010\n#define METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL 0x1000\n#define METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED 0x0020\n\n\nstatic const char * (*il2cpp_class_get_name) (void *) = (void *) ${this._classGetName};\nstatic int (*il2cpp_field_get_flags) (void *) = (void *) ${this._fieldGetFlags};\nstatic size_t (*il2cpp_field_get_offset) (void *) = (void *) ${this._fieldGetOffset};\nstatic uint32_t (*il2cpp_method_get_flags) (void *, uint32_t *) = (void *) ${this._methodGetFlags};\nstatic char * (*il2cpp_type_get_name) (void *) = (void *) ${this._typeGetName};\nstatic Il2CppTypeEnum (*il2cpp_type_get_type_enum) (void *) = (void *) ${this._typeGetTypeEnum};\nstatic void (*il2cpp_free) (void * pointer) = (void *) ${this._free};\n\n\nvoid\nil2cpp_string_set_length (int32_t * string,\n                          int32_t length)\n{\n    *(string + ${e(Il2Cpp.String.from("vfsfitvnm"), 9)}) = length;\n}\n\nvoid *\nil2cpp_array_get_elements (int32_t * array)\n{ \n    return array + ${e(l, 31) - 1};\n}\n\nuint8_t\nil2cpp_type_is_byref (void * type)\n{   \n    char * name;\n    char last_char;\n\n    name = il2cpp_type_get_name (type);\n    last_char = name[strlen (name) - 1];\n\n    il2cpp_free (name);\n    return last_char == '&';\n}\n\nuint8_t\nil2cpp_type_is_primitive (void * type)\n{\n    Il2CppTypeEnum type_enum;\n\n    type_enum = il2cpp_type_get_type_enum (type);\n\n    return ((type_enum >= IL2CPP_TYPE_BOOLEAN && \n        type_enum <= IL2CPP_TYPE_R8) || \n        type_enum == IL2CPP_TYPE_I || \n        type_enum == IL2CPP_TYPE_U\n    );\n}\n\nint32_t\nil2cpp_class_get_actual_instance_size (int32_t * class)\n{\n    return *(class + ${e(_, _.instanceSize - 2)});\n}\n\nuint8_t\nil2cpp_class_get_rank (void * class)\n{\n    uint8_t rank;\n    const char * name;\n    \n    rank = 0;\n    name = il2cpp_class_get_name (class);\n\n    for (uint16_t i = strlen (name) - 1; i > 0; i--)\n    {\n        char c = name[i];\n\n        if (c == ']') rank++;\n        else if (c == '[' || rank == 0) break;\n        else if (c == ',') rank++;\n        else break;\n    }\n\n    return rank;\n}\n\nconst char *\nil2cpp_field_get_modifier (void * field)\n{   \n    int flags;\n\n    flags = il2cpp_field_get_flags (field);\n\n    switch (flags & FIELD_ATTRIBUTE_FIELD_ACCESS_MASK) {\n        case FIELD_ATTRIBUTE_PRIVATE:\n            return "private";\n        case FIELD_ATTRIBUTE_FAM_AND_ASSEM:\n            return "private protected";\n        case FIELD_ATTRIBUTE_ASSEMBLY:\n            return "internal";\n        case FIELD_ATTRIBUTE_FAMILY:\n            return "protected";\n        case FIELD_ATTRIBUTE_FAM_OR_ASSEM:\n            return "protected internal";\n        case FIELD_ATTRIBUTE_PUBLIC:\n            return "public";\n    }\n\n    return "";\n}\n\nuint8_t\nil2cpp_field_is_literal (void * field)\n{\n    return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_LITERAL) != 0;\n}\n\nuint8_t\nil2cpp_field_is_static (void * field)\n{\n    return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_STATIC) != 0;\n}\n\nuint8_t\nil2cpp_field_is_thread_static (void * field)\n{\n    return il2cpp_field_get_offset (field) == THREAD_STATIC_FIELD_OFFSET;\n}\n\nconst char *\nil2cpp_method_get_modifier (void * method)\n{\n    uint32_t flags;\n\n    flags = il2cpp_method_get_flags (method, NULL);\n\n    switch (flags & METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK) {\n        case METHOD_ATTRIBUTE_PRIVATE:\n            return "private";\n        case METHOD_ATTRIBUTE_FAM_AND_ASSEM:\n            return "private protected";\n        case METHOD_ATTRIBUTE_ASSEMBLY:\n            return "internal";\n        case METHOD_ATTRIBUTE_FAMILY:\n            return "protected";\n        case METHOD_ATTRIBUTE_FAM_OR_ASSEM:\n            return "protected internal";\n        case METHOD_ATTRIBUTE_PUBLIC:\n            return "public";\n    }\n\n    return "";\n}\n\nvoid *\nil2cpp_method_get_from_reflection (const Il2CppReflectionMethod * method)\n{\n    return method->method;\n}\n\nvoid *\nil2cpp_method_get_pointer (void ** method)\n{\n    return * (method + ${n(o, p)});\n}\n\nuint8_t\nil2cpp_method_is_external (void * method)\n{\n    uint32_t implementation_flags;\n\n    il2cpp_method_get_flags (method, &implementation_flags);\n\n    return (implementation_flags & METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL) != 0;\n}\n\nuint8_t\nil2cpp_method_is_synchronized (void * method)\n{\n    uint32_t implementation_flags;\n\n    il2cpp_method_get_flags (method, &implementation_flags);\n\n    return (implementation_flags & METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED) != 0;\n}\n\nuintptr_t\nil2cpp_memory_snapshot_get_classes (const Il2CppManagedMemorySnapshot * snapshot,\n                                    Il2CppMetadataType ** iter)\n{\n    const int zero;\n    const void * null;\n\n    if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)\n    {\n        if (*iter == null)\n        {\n            *iter = snapshot->metadata_snapshot.types;\n            return (uintptr_t) (*iter)->type_info_address;\n        }\n        else\n        {\n            Il2CppMetadataType * metadata_type = *iter + 1;\n\n            if (metadata_type < snapshot->metadata_snapshot.types + snapshot->metadata_snapshot.type_count)\n            {\n                *iter = metadata_type;\n                return (uintptr_t) (*iter)->type_info_address;\n            }\n        }\n    }\n    return 0;\n}\n\nstruct Il2CppGCHandles\nil2cpp_memory_snapshot_get_gc_handles (const Il2CppManagedMemorySnapshot * snapshot)\n{\n    return snapshot->gc_handles;\n}\n\nstruct Il2CppRuntimeInformation\nil2cpp_memory_snapshot_get_information (const Il2CppManagedMemorySnapshot * snapshot)\n{\n    return snapshot->runtime_information;\n}\n        `;
    return t.dispose(), new CModule(u);
  }
  static r(t, e, n) {
    const i = Il2Cpp.module.findExportByName(t) ?? this.cModule[t];
    return null == i && (0, r.raise)(`cannot resolve export ${t}`), new NativeFunction(i, e, n);
  }
}

t([ n.cache ], _, "_alloc", null), t([ n.cache ], _, "_arrayGetElements", null), 
t([ n.cache ], _, "_arrayGetLength", null), t([ n.cache ], _, "_arrayNew", null), 
t([ n.cache ], _, "_assemblyGetImage", null), t([ n.cache ], _, "_classForEach", null), 
t([ n.cache ], _, "_classFromName", null), t([ n.cache ], _, "_classFromSystemType", null), 
t([ n.cache ], _, "_classFromType", null), t([ n.cache ], _, "_classGetActualInstanceSize", null), 
t([ n.cache ], _, "_classGetArrayClass", null), t([ n.cache ], _, "_classGetArrayElementSize", null), 
t([ n.cache ], _, "_classGetAssemblyName", null), t([ n.cache ], _, "_classGetBaseType", null), 
t([ n.cache ], _, "_classGetDeclaringType", null), t([ n.cache ], _, "_classGetElementClass", null), 
t([ n.cache ], _, "_classGetFieldFromName", null), t([ n.cache ], _, "_classGetFields", null), 
t([ n.cache ], _, "_classGetFlags", null), t([ n.cache ], _, "_classGetImage", null), 
t([ n.cache ], _, "_classGetInstanceSize", null), t([ n.cache ], _, "_classGetInterfaces", null), 
t([ n.cache ], _, "_classGetMethodFromName", null), t([ n.cache ], _, "_classGetMethods", null), 
t([ n.cache ], _, "_classGetName", null), t([ n.cache ], _, "_classGetNamespace", null), 
t([ n.cache ], _, "_classGetNestedClasses", null), t([ n.cache ], _, "_classGetParent", null), 
t([ n.cache ], _, "_classGetRank", null), t([ n.cache ], _, "_classGetStaticFieldData", null), 
t([ n.cache ], _, "_classGetValueSize", null), t([ n.cache ], _, "_classGetType", null), 
t([ n.cache ], _, "_classHasReferences", null), t([ n.cache ], _, "_classInit", null), 
t([ n.cache ], _, "_classIsAbstract", null), t([ n.cache ], _, "_classIsAssignableFrom", null), 
t([ n.cache ], _, "_classIsBlittable", null), t([ n.cache ], _, "_classIsEnum", null), 
t([ n.cache ], _, "_classIsGeneric", null), t([ n.cache ], _, "_classIsInflated", null), 
t([ n.cache ], _, "_classIsInterface", null), t([ n.cache ], _, "_classIsSubclassOf", null), 
t([ n.cache ], _, "_classIsValueType", null), t([ n.cache ], _, "_domainAssemblyOpen", null), 
t([ n.cache ], _, "_domainGet", null), t([ n.cache ], _, "_domainGetAssemblies", null), 
t([ n.cache ], _, "_fieldGetModifier", null), t([ n.cache ], _, "_fieldGetClass", null), 
t([ n.cache ], _, "_fieldGetFlags", null), t([ n.cache ], _, "_fieldGetName", null), 
t([ n.cache ], _, "_fieldGetOffset", null), t([ n.cache ], _, "_fieldGetStaticValue", null), 
t([ n.cache ], _, "_fieldGetType", null), t([ n.cache ], _, "_fieldIsLiteral", null), 
t([ n.cache ], _, "_fieldIsStatic", null), t([ n.cache ], _, "_fieldIsThreadStatic", null), 
t([ n.cache ], _, "_fieldSetStaticValue", null), t([ n.cache ], _, "_free", null), 
t([ n.cache ], _, "_gcCollect", null), t([ n.cache ], _, "_gcCollectALittle", null), 
t([ n.cache ], _, "_gcDisable", null), t([ n.cache ], _, "_gcEnable", null), t([ n.cache ], _, "_gcGetHeapSize", null), 
t([ n.cache ], _, "_gcGetMaxTimeSlice", null), t([ n.cache ], _, "_gcGetUsedSize", null), 
t([ n.cache ], _, "_gcHandleGetTarget", null), t([ n.cache ], _, "_gcHandleFree", null), 
t([ n.cache ], _, "_gcHandleNew", null), t([ n.cache ], _, "_gcHandleNewWeakRef", null), 
t([ n.cache ], _, "_gcIsDisabled", null), t([ n.cache ], _, "_gcIsIncremental", null), 
t([ n.cache ], _, "_gcSetMaxTimeSlice", null), t([ n.cache ], _, "_gcStartIncrementalCollection", null), 
t([ n.cache ], _, "_gcStartWorld", null), t([ n.cache ], _, "_gcStopWorld", null), 
t([ n.cache ], _, "_getCorlib", null), t([ n.cache ], _, "_imageGetAssembly", null), 
t([ n.cache ], _, "_imageGetClass", null), t([ n.cache ], _, "_imageGetClassCount", null), 
t([ n.cache ], _, "_imageGetName", null), t([ n.cache ], _, "_init", null), t([ n.cache ], _, "_livenessAllocateStruct", null), 
t([ n.cache ], _, "_livenessCalculationBegin", null), t([ n.cache ], _, "_livenessCalculationEnd", null), 
t([ n.cache ], _, "_livenessCalculationFromStatics", null), t([ n.cache ], _, "_livenessFinalize", null), 
t([ n.cache ], _, "_livenessFreeStruct", null), t([ n.cache ], _, "_memorySnapshotCapture", null), 
t([ n.cache ], _, "_memorySnapshotFree", null), t([ n.cache ], _, "_memorySnapshotGetClasses", null), 
t([ n.cache ], _, "_memorySnapshotGetGCHandles", null), t([ n.cache ], _, "_memorySnapshotGetRuntimeInformation", null), 
t([ n.cache ], _, "_methodGetModifier", null), t([ n.cache ], _, "_methodGetClass", null), 
t([ n.cache ], _, "_methodGetFlags", null), t([ n.cache ], _, "_methodGetFromReflection", null), 
t([ n.cache ], _, "_methodGetName", null), t([ n.cache ], _, "_methodGetObject", null), 
t([ n.cache ], _, "_methodGetParameterCount", null), t([ n.cache ], _, "_methodGetParameterName", null), 
t([ n.cache ], _, "_methodGetParameters", null), t([ n.cache ], _, "_methodGetParameterType", null), 
t([ n.cache ], _, "_methodGetPointer", null), t([ n.cache ], _, "_methodGetReturnType", null), 
t([ n.cache ], _, "_methodIsExternal", null), t([ n.cache ], _, "_methodIsGeneric", null), 
t([ n.cache ], _, "_methodIsInflated", null), t([ n.cache ], _, "_methodIsInstance", null), 
t([ n.cache ], _, "_methodIsSynchronized", null), t([ n.cache ], _, "_monitorEnter", null), 
t([ n.cache ], _, "_monitorExit", null), t([ n.cache ], _, "_monitorPulse", null), 
t([ n.cache ], _, "_monitorPulseAll", null), t([ n.cache ], _, "_monitorTryEnter", null), 
t([ n.cache ], _, "_monitorTryWait", null), t([ n.cache ], _, "_monitorWait", null), 
t([ n.cache ], _, "_objectGetClass", null), t([ n.cache ], _, "_objectGetVirtualMethod", null), 
t([ n.cache ], _, "_objectInit", null), t([ n.cache ], _, "_objectNew", null), t([ n.cache ], _, "_objectGetSize", null), 
t([ n.cache ], _, "_objectUnbox", null), t([ n.cache ], _, "_resolveInternalCall", null), 
t([ n.cache ], _, "_stringChars", null), t([ n.cache ], _, "_stringLength", null), 
t([ n.cache ], _, "_stringNew", null), t([ n.cache ], _, "_stringSetLength", null), 
t([ n.cache ], _, "_valueBox", null), t([ n.cache ], _, "_threadAttach", null), 
t([ n.cache ], _, "_threadCurrent", null), t([ n.cache ], _, "_threadGetAllAttachedThreads", null), 
t([ n.cache ], _, "_threadIsVm", null), t([ n.cache ], _, "_threadDetach", null), 
t([ n.cache ], _, "_typeGetName", null), t([ n.cache ], _, "_typeGetObject", null), 
t([ n.cache ], _, "_typeGetTypeEnum", null), t([ n.cache ], _, "_typeIsByReference", null), 
t([ n.cache ], _, "_typeIsPrimitive", null), t([ n.cache ], _, "cModule", null), 
Il2Cpp.Api = _;

},{"../utils/console":35,"decorator-cache-getter":6,"versioning":41}],9:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, a = arguments.length, l = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, n, i); else for (var o = e.length - 1; o >= 0; o--) (r = e[o]) && (l = (a < 3 ? r(l) : a > 3 ? r(t, n, l) : r(t, n)) || l);
  return a > 3 && l && Object.defineProperty(t, n, l), l;
}, t = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const n = require("decorator-cache-getter"), i = t(require("versioning")), r = require("../utils/console"), a = require("../utils/native-wait");

class l {
  constructor() {}
  static get moduleName() {
    switch (Process.platform) {
     case "linux":
      try {
        Java.androidVersion;
        return "libil2cpp.so";
      } catch (e) {
        return "GameAssembly.so";
      }

     case "windows":
      return "GameAssembly.dll";

     case "darwin":
      try {
        return "UnityFramework";
      } catch (e) {
        return "GameAssembly.dylib";
      }
    }
    (0, r.raise)(`${Process.platform} is not supported yet`);
  }
  static get applicationDataPath() {
    const e = this.internalCall("UnityEngine.Application::get_persistentDataPath", "pointer", []);
    return new Il2Cpp.String(e()).content;
  }
  static get applicationIdentifier() {
    const e = this.internalCall("UnityEngine.Application::get_identifier", "pointer", []) ?? this.internalCall("UnityEngine.Application::get_bundleIdentifier", "pointer", []);
    return e ? new Il2Cpp.String(e()).content : null;
  }
  static get applicationVersion() {
    const e = this.internalCall("UnityEngine.Application::get_version", "pointer", []);
    return e ? new Il2Cpp.String(e()).content : null;
  }
  static get attachedThreads() {
    null == Il2Cpp.currentThread && (0, r.raise)("only Il2Cpp threads can invoke Il2Cpp.attachedThreads");
    const e = [], t = Memory.alloc(Process.pointerSize), n = Il2Cpp.Api._threadGetAllAttachedThreads(t), i = t.readInt();
    for (let t = 0; t < i; t++) e.push(new Il2Cpp.Thread(n.add(t * Process.pointerSize).readPointer()));
    return e;
  }
  static get currentThread() {
    const e = Il2Cpp.Api._threadCurrent();
    return e.isNull() ? null : new Il2Cpp.Thread(e);
  }
  static get module() {
    return Process.getModuleByName(this.moduleName);
  }
  static get unityVersion() {
    const e = this.internalCall("UnityEngine.Application::get_unityVersion", "pointer", []);
    return null == e && (0, r.raise)("couldn't determine the Unity version, please specify it manually"), 
    new Il2Cpp.String(e()).content;
  }
  static get unityVersionIsBelow201830() {
    return i.default.lt(this.unityVersion, "2018.3.0");
  }
  static alloc(e = Process.pointerSize) {
    return Il2Cpp.Api._alloc(e);
  }
  static dump(e, t) {
    e = e ?? `${Il2Cpp.applicationIdentifier ?? "unknown"}_${Il2Cpp.applicationVersion ?? "unknown"}.cs`;
    const n = `${t ?? Il2Cpp.applicationDataPath}/${e}`, i = new File(n, "w");
    for (const e of Il2Cpp.Domain.assemblies) {
      (0, r.inform)(`dumping ${e.name}...`);
      for (const t of e.image.classes) i.write(`${t}\n\n`);
    }
    i.flush(), i.close(), (0, r.ok)(`dump saved to ${n}`);
  }
  static free(e) {
    return Il2Cpp.Api._free(e);
  }
  static async initialize() {
    if ("darwin" == Process.platform) {
      let e = Process.findModuleByAddress(Module.findExportByName(null, "il2cpp_init") ?? NULL)?.name;
      null == e && (e = await (0, a.forModule)("UnityFramework", "GameAssembly.dylib")), 
      Reflect.defineProperty(Il2Cpp, "moduleName", {
        value: e
      });
    } else await (0, a.forModule)(this.moduleName);
    Il2Cpp.Api._getCorlib().isNull() && await new Promise((e => {
      const t = Interceptor.attach(Il2Cpp.Api._init, {
        onLeave() {
          t.detach(), setImmediate(e);
        }
      });
    }));
  }
  static installExceptionListener(e = "current") {
    const t = Process.getCurrentThreadId();
    return Interceptor.attach(Il2Cpp.module.getExportByName("__cxa_throw"), (function(n) {
      "current" == e && this.threadId != t || (0, r.inform)(new Il2Cpp.Object(n[0].readPointer()));
    }));
  }
  static internalCall(e, t, n) {
    const i = Il2Cpp.Api._resolveInternalCall(Memory.allocUtf8String(e));
    return i.isNull() ? null : new NativeFunction(i, t, n);
  }
  static scheduleOnInitializerThread(e) {
    return new Promise((t => {
      const n = Interceptor.attach(Il2Cpp.Api._threadCurrent, (() => {
        const i = Il2Cpp.currentThread?.id;
        if (null != i && i == Il2Cpp.attachedThreads[0].id) {
          n.detach();
          const i = e();
          setImmediate((() => t(i)));
        }
      }));
    }));
  }
  static async perform(e) {
    await this.initialize();
    let t = this.currentThread;
    const n = null == t;
    null == t && (t = Il2Cpp.Domain.attach());
    try {
      const t = e();
      return t instanceof Promise ? await t : t;
    } catch (e) {
      throw globalThis.console.log(e), e;
    } finally {
      n && t.detach();
    }
  }
  static trace() {
    return new Il2Cpp.Tracer;
  }
}

e([ n.cache ], l, "applicationDataPath", null), e([ n.cache ], l, "applicationIdentifier", null), 
e([ n.cache ], l, "applicationVersion", null), e([ n.cache ], l, "module", null), 
e([ n.cache ], l, "unityVersion", null), e([ n.cache ], l, "unityVersionIsBelow201830", null), 
Reflect.set(globalThis, "Il2Cpp", l);

}).call(this)}).call(this,require("timers").setImmediate)
},{"../utils/console":35,"../utils/native-wait":37,"decorator-cache-getter":6,"timers":40,"versioning":41}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class s {
  constructor() {}
  static Is(s) {
    return e => e instanceof Il2Cpp.Class ? s.isAssignableFrom(e) : s.isAssignableFrom(e.class);
  }
  static IsExactly(s) {
    return e => e instanceof Il2Cpp.Class ? e.equals(s) : e.class.equals(s);
  }
}

Il2Cpp.Filtering = s;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./base"), require("./api"), require("./filtering"), require("./runtime"), 
require("./tracer"), require("./structs/array"), require("./structs/assembly"), 
require("./structs/class"), require("./structs/domain"), require("./structs/field"), 
require("./structs/gc"), require("./structs/gc-handle"), require("./structs/image"), 
require("./structs/memory-snapshot"), require("./structs/method"), require("./structs/object"), 
require("./structs/parameter"), require("./structs/pointer"), require("./structs/reference"), 
require("./structs/string"), require("./structs/thread"), require("./structs/type"), 
require("./structs/type-enum"), require("./structs/value-type");

},{"./api":8,"./base":9,"./filtering":10,"./runtime":12,"./structs/array":13,"./structs/assembly":14,"./structs/class":15,"./structs/domain":16,"./structs/field":17,"./structs/gc":19,"./structs/gc-handle":18,"./structs/image":20,"./structs/memory-snapshot":21,"./structs/method":22,"./structs/object":23,"./structs/parameter":24,"./structs/pointer":25,"./structs/reference":26,"./structs/string":27,"./structs/thread":28,"./structs/type":30,"./structs/type-enum":29,"./structs/value-type":31,"./tracer":32}],12:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, r, o) {
  var i, n = arguments.length, a = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, o); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, r, a) : i(e, r)) || a);
  return n > 3 && a && Object.defineProperty(e, r, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter");

class r {
  constructor() {}
  static get allocationGranularity() {
    return this.information[5];
  }
  static get arrayHeaderSize() {
    return this.information[2];
  }
  static get information() {
    const t = Il2Cpp.MemorySnapshot.capture();
    try {
      return Il2Cpp.Api._memorySnapshotGetRuntimeInformation(t);
    } finally {
      Il2Cpp.Api._memorySnapshotFree(t);
    }
  }
  static get pointerSize() {
    return this.information[0];
  }
  static get objectHeaderSize() {
    return this.information[1];
  }
}

t([ e.cache ], r, "information", null), Il2Cpp.Runtime = r;

},{"decorator-cache-getter":6}],13:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, n) {
  var l, s = arguments.length, i = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var a = e.length - 1; a >= 0; a--) (l = e[a]) && (i = (s < 3 ? l(i) : s > 3 ? l(t, r, i) : l(t, r)) || i);
  return s > 3 && i && Object.defineProperty(t, r, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/console"), n = require("../../utils/native-struct");

class l extends n.NativeStruct {
  static from(e, t) {
    const r = "number" == typeof t ? t : t.length, n = new Il2Cpp.Array(Il2Cpp.Api._arrayNew(e, r));
    return Array.isArray(t) && n.elements.write(t), n;
  }
  get elements() {
    return new Il2Cpp.Pointer(Il2Cpp.Api._arrayGetElements(this), this.elementType);
  }
  get elementSize() {
    return this.elementType.class.arrayElementSize;
  }
  get elementType() {
    return this.object.class.type.class.baseType;
  }
  get length() {
    return Il2Cpp.Api._arrayGetLength(this);
  }
  get object() {
    return new Il2Cpp.Object(this);
  }
  get(e) {
    return (e < 0 || e >= this.length) && (0, r.raise)(`cannot get element at index ${e}: array length is ${this.length}`), 
    this.elements.get(e);
  }
  set(e, t) {
    (e < 0 || e >= this.length) && (0, r.raise)(`cannot get element at index ${e}: array length is ${this.length}`), 
    this.elements.set(e, t);
  }
  toString() {
    return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
  }
  * [Symbol.iterator]() {
    for (let e = 0; e < this.length; e++) yield this.elements.get(e);
  }
}

e([ t.cache ], l.prototype, "elements", null), e([ t.cache ], l.prototype, "elementSize", null), 
e([ t.cache ], l.prototype, "elementType", null), e([ t.cache ], l.prototype, "length", null), 
e([ t.cache ], l.prototype, "object", null), Il2Cpp.Array = l;

},{"../../utils/console":35,"../../utils/native-struct":36,"decorator-cache-getter":6}],14:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, l) {
  var c, o = arguments.length, a = o < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, r) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, l); else for (var n = e.length - 1; n >= 0; n--) (c = e[n]) && (a = (o < 3 ? c(a) : o > 3 ? c(t, r, a) : c(t, r)) || a);
  return o > 3 && a && Object.defineProperty(t, r, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/native-struct"), l = require("../../utils/utils");

let c = class extends r.NonNullNativeStruct {
  get image() {
    return new Il2Cpp.Image(Il2Cpp.Api._assemblyGetImage(this));
  }
  get name() {
    return this.image.name.replace(".dll", "");
  }
  get object() {
    return Il2Cpp.Image.corlib.class("System.Reflection.Assembly").method("Load").invoke(Il2Cpp.String.from(this.name));
  }
};

e([ t.cache ], c.prototype, "image", null), e([ t.cache ], c.prototype, "name", null), 
e([ t.cache ], c.prototype, "object", null), c = e([ l.cacheInstances ], c), Il2Cpp.Assembly = c;

},{"../../utils/native-struct":36,"../../utils/utils":38,"decorator-cache-getter":6}],15:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, l) {
  var r, a = arguments.length, n = a < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, s) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, s, l); else for (var p = e.length - 1; p >= 0; p--) (r = e[p]) && (n = (a < 3 ? r(n) : a > 3 ? r(t, s, n) : r(t, s)) || n);
  return a > 3 && n && Object.defineProperty(t, s, n), n;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), s = require("../../utils/console"), l = require("../../utils/native-struct"), r = require("../../utils/utils");

let a = class extends l.NonNullNativeStruct {
  get actualInstanceSize() {
    return Il2Cpp.Api._classGetActualInstanceSize(this);
  }
  get arrayClass() {
    return new Il2Cpp.Class(Il2Cpp.Api._classGetArrayClass(this, 1));
  }
  get arrayElementSize() {
    return Il2Cpp.Api._classGetArrayElementSize(this);
  }
  get assemblyName() {
    return Il2Cpp.Api._classGetAssemblyName(this).readUtf8String();
  }
  get declaringClass() {
    const e = Il2Cpp.Api._classGetDeclaringType(this);
    return e.isNull() ? null : new Il2Cpp.Class(e);
  }
  get baseType() {
    const e = Il2Cpp.Api._classGetBaseType(this);
    return e.isNull() ? null : new Il2Cpp.Type(e);
  }
  get elementClass() {
    const e = Il2Cpp.Api._classGetElementClass(this);
    return e.isNull() ? null : new Il2Cpp.Class(e);
  }
  get fields() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetFields, Il2Cpp.Field));
  }
  get flags() {
    return Il2Cpp.Api._classGetFlags(this);
  }
  get genericParameterCount() {
    return this.isGeneric ? this.type.object.method("GetGenericArguments").invoke().length : 0;
  }
  get hasReferences() {
    return !!Il2Cpp.Api._classHasReferences(this);
  }
  get hasStaticConstructor() {
    const e = this.tryMethod(".cctor");
    return null != e && !e.virtualAddress.isNull();
  }
  get image() {
    return new Il2Cpp.Image(Il2Cpp.Api._classGetImage(this));
  }
  get instanceSize() {
    return Il2Cpp.Api._classGetInstanceSize(this);
  }
  get isAbstract() {
    return !!Il2Cpp.Api._classIsAbstract(this);
  }
  get isBlittable() {
    return !!Il2Cpp.Api._classIsBlittable(this);
  }
  get isEnum() {
    return !!Il2Cpp.Api._classIsEnum(this);
  }
  get isGeneric() {
    return !!Il2Cpp.Api._classIsGeneric(this);
  }
  get isInflated() {
    return !!Il2Cpp.Api._classIsInflated(this);
  }
  get isInterface() {
    return !!Il2Cpp.Api._classIsInterface(this);
  }
  get isValueType() {
    return !!Il2Cpp.Api._classIsValueType(this);
  }
  get interfaces() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetInterfaces, Il2Cpp.Class));
  }
  get methods() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetMethods, Il2Cpp.Method));
  }
  get name() {
    return Il2Cpp.Api._classGetName(this).readUtf8String();
  }
  get namespace() {
    return Il2Cpp.Api._classGetNamespace(this).readUtf8String();
  }
  get nestedClasses() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetNestedClasses, Il2Cpp.Class));
  }
  get parent() {
    const e = Il2Cpp.Api._classGetParent(this);
    return e.isNull() ? null : new Il2Cpp.Class(e);
  }
  get rank() {
    return Il2Cpp.Api._classGetRank(this);
  }
  get staticFieldsData() {
    return Il2Cpp.Api._classGetStaticFieldData(this);
  }
  get valueSize() {
    return Il2Cpp.Api._classGetValueSize(this, NULL);
  }
  get type() {
    return new Il2Cpp.Type(Il2Cpp.Api._classGetType(this));
  }
  alloc() {
    return new Il2Cpp.Object(Il2Cpp.Api._objectNew(this));
  }
  field(e) {
    return this.tryField(e);
  }
  inflate(...e) {
    this.isGeneric || (0, s.raise)(`cannot inflate class ${this.type.name}: it has no generic parameters`), 
    this.genericParameterCount != e.length && (0, s.raise)(`cannot inflate class ${this.type.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${e.length}`);
    const t = e.map((e => e.type.object)), l = Il2Cpp.Array.from(Il2Cpp.Image.corlib.class("System.Type"), t), r = this.type.object.method("MakeGenericType", 1).invoke(l);
    return new Il2Cpp.Class(Il2Cpp.Api._classFromSystemType(r));
  }
  initialize() {
    Il2Cpp.Api._classInit(this);
  }
  isAssignableFrom(e) {
    return !!Il2Cpp.Api._classIsAssignableFrom(this, e);
  }
  isSubclassOf(e, t) {
    return !!Il2Cpp.Api._classIsSubclassOf(this, e, +t);
  }
  method(e, t = -1) {
    return this.tryMethod(e, t);
  }
  nested(e) {
    return this.tryNested(e);
  }
  new() {
    const e = this.alloc(), t = Memory.alloc(Process.pointerSize);
    Il2Cpp.Api._objectInit(e, t);
    const l = t.readPointer();
    return l.isNull() || (0, s.raise)(new Il2Cpp.Object(l).toString()), e;
  }
  tryField(e) {
    const t = Il2Cpp.Api._classGetFieldFromName(this, Memory.allocUtf8String(e));
    return t.isNull() ? null : new Il2Cpp.Field(t);
  }
  tryMethod(e, t = -1) {
    const s = Il2Cpp.Api._classGetMethodFromName(this, Memory.allocUtf8String(e), t);
    return s.isNull() ? null : new Il2Cpp.Method(s);
  }
  tryNested(e) {
    return this.nestedClasses.find((t => t.name == e));
  }
  toString() {
    const e = [ this.parent ].concat(this.interfaces);
    return `// ${this.assemblyName}\n${this.isEnum ? "enum" : this.isValueType ? "struct" : this.isInterface ? "interface" : "class"} ${this.type.name}${e ? ` : ${e.map((e => e?.type.name)).join(", ")}` : ""}\n{\n    ${this.fields.join("\n    ")}\n    ${this.methods.join("\n    ")}\n}`;
  }
  static enumerate(e) {
    const t = new NativeCallback((function(t, s) {
      e(new Il2Cpp.Class(t));
    }), "void", [ "pointer", "pointer" ]);
    return Il2Cpp.Api._classForEach(t, NULL);
  }
};

e([ t.cache ], a.prototype, "actualInstanceSize", null), e([ t.cache ], a.prototype, "arrayClass", null), 
e([ t.cache ], a.prototype, "arrayElementSize", null), e([ t.cache ], a.prototype, "assemblyName", null), 
e([ t.cache ], a.prototype, "declaringClass", null), e([ t.cache ], a.prototype, "baseType", null), 
e([ t.cache ], a.prototype, "elementClass", null), e([ t.cache ], a.prototype, "fields", null), 
e([ t.cache ], a.prototype, "flags", null), e([ t.cache ], a.prototype, "genericParameterCount", null), 
e([ t.cache ], a.prototype, "hasReferences", null), e([ t.cache ], a.prototype, "hasStaticConstructor", null), 
e([ t.cache ], a.prototype, "image", null), e([ t.cache ], a.prototype, "instanceSize", null), 
e([ t.cache ], a.prototype, "isAbstract", null), e([ t.cache ], a.prototype, "isBlittable", null), 
e([ t.cache ], a.prototype, "isEnum", null), e([ t.cache ], a.prototype, "isGeneric", null), 
e([ t.cache ], a.prototype, "isInflated", null), e([ t.cache ], a.prototype, "isInterface", null), 
e([ t.cache ], a.prototype, "isValueType", null), e([ t.cache ], a.prototype, "interfaces", null), 
e([ t.cache ], a.prototype, "methods", null), e([ t.cache ], a.prototype, "name", null), 
e([ t.cache ], a.prototype, "namespace", null), e([ t.cache ], a.prototype, "nestedClasses", null), 
e([ t.cache ], a.prototype, "parent", null), e([ t.cache ], a.prototype, "rank", null), 
e([ t.cache ], a.prototype, "staticFieldsData", null), e([ t.cache ], a.prototype, "valueSize", null), 
e([ t.cache ], a.prototype, "type", null), e([ (0, r.levenshtein)("fields") ], a.prototype, "field", null), 
e([ (0, r.levenshtein)("methods") ], a.prototype, "method", null), e([ (0, r.levenshtein)("nestedClasses") ], a.prototype, "nested", null), 
a = e([ r.cacheInstances ], a), Il2Cpp.Class = a;

},{"../../utils/console":35,"../../utils/native-struct":36,"../../utils/utils":38,"decorator-cache-getter":6}],16:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, r) {
  var l, n = arguments.length, o = n < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, s) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, s, r); else for (var i = e.length - 1; i >= 0; i--) (l = e[i]) && (o = (n < 3 ? l(o) : n > 3 ? l(t, s, o) : l(t, s)) || o);
  return n > 3 && o && Object.defineProperty(t, s, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), s = require("../../utils/utils");

class r {
  constructor() {}
  static get assemblies() {
    const e = Memory.alloc(Process.pointerSize), t = Il2Cpp.Api._domainGetAssemblies(this, e), s = e.readInt(), r = new Array(s);
    for (let e = 0; e < s; e++) r[e] = new Il2Cpp.Assembly(t.add(e * Process.pointerSize).readPointer());
    if (0 == s) for (const e of this.object.method("GetAssemblies").overload().invoke()) {
      const t = e.method("GetSimpleName").invoke().content;
      null != t && r.push(this.assembly(t));
    }
    return r;
  }
  static get handle() {
    return Il2Cpp.Api._domainGet();
  }
  static get object() {
    return Il2Cpp.Image.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke();
  }
  static assembly(e) {
    return this.tryAssembly(e);
  }
  static attach() {
    return new Il2Cpp.Thread(Il2Cpp.Api._threadAttach(this));
  }
  static tryAssembly(e) {
    const t = Il2Cpp.Api._domainAssemblyOpen(this, Memory.allocUtf8String(e));
    return t.isNull() ? null : new Il2Cpp.Assembly(t);
  }
}

e([ t.cache ], r, "assemblies", null), e([ t.cache ], r, "handle", null), e([ t.cache ], r, "object", null), 
e([ (0, s.levenshtein)("assemblies") ], r, "assembly", null), Il2Cpp.Domain = r;

},{"../../utils/utils":38,"decorator-cache-getter":6}],17:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, i, r) {
  var l, s = arguments.length, a = s < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, i, r); else for (var p = e.length - 1; p >= 0; p--) (l = e[p]) && (a = (s < 3 ? l(a) : s > 3 ? l(t, i, a) : l(t, i)) || a);
  return s > 3 && a && Object.defineProperty(t, i, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), i = require("../../utils/console"), r = require("../../utils/native-struct"), l = require("../utils");

class s extends r.NonNullNativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._fieldGetClass(this));
  }
  get flags() {
    return Il2Cpp.Api._fieldGetFlags(this);
  }
  get isLiteral() {
    return !!Il2Cpp.Api._fieldIsLiteral(this);
  }
  get isStatic() {
    return !!Il2Cpp.Api._fieldIsStatic(this);
  }
  get isThreadStatic() {
    return !!Il2Cpp.Api._fieldIsThreadStatic(this);
  }
  get modifier() {
    return Il2Cpp.Api._fieldGetModifier(this).readUtf8String();
  }
  get name() {
    return Il2Cpp.Api._fieldGetName(this).readUtf8String();
  }
  get offset() {
    return Il2Cpp.Api._fieldGetOffset(this);
  }
  get type() {
    return new Il2Cpp.Type(Il2Cpp.Api._fieldGetType(this));
  }
  get value() {
    const e = Memory.alloc(Process.pointerSize);
    return Il2Cpp.Api._fieldGetStaticValue(this.handle, e), (0, l.read)(e, this.type);
  }
  set value(e) {
    (this.isThreadStatic || this.isLiteral) && (0, i.raise)(`cannot modify the value of field ${this.name}: is thread static or literal`);
    const t = Memory.alloc(Process.pointerSize);
    (0, l.write)(t, e, this.type), Il2Cpp.Api._fieldSetStaticValue(this.handle, t);
  }
  toString() {
    return `${this.isThreadStatic ? "[ThreadStatic] " : ""}${this.isStatic ? "static " : ""}${this.type.name} ${this.name}${this.isLiteral ? ` = ${this.type.class.isEnum ? (0, 
    l.read)(this.value.handle, this.type.class.baseType) : this.value}` : ""};${this.isThreadStatic || this.isLiteral ? "" : ` // 0x${this.offset.toString(16)}`}`;
  }
  withHolder(e) {
    let t = e.handle.add(this.offset);
    return e instanceof Il2Cpp.ValueType && (t = t.sub(Il2Cpp.Runtime.objectHeaderSize)), 
    new Proxy(this, {
      get: (e, i) => "value" == i ? (0, l.read)(t, e.type) : Reflect.get(e, i),
      set: (e, i, r) => "value" == i ? ((0, l.write)(t, r, e.type), !0) : Reflect.set(e, i, r)
    });
  }
}

e([ t.cache ], s.prototype, "class", null), e([ t.cache ], s.prototype, "flags", null), 
e([ t.cache ], s.prototype, "isLiteral", null), e([ t.cache ], s.prototype, "isStatic", null), 
e([ t.cache ], s.prototype, "isThreadStatic", null), e([ t.cache ], s.prototype, "name", null), 
e([ t.cache ], s.prototype, "offset", null), e([ t.cache ], s.prototype, "type", null), 
Reflect.set(Il2Cpp, "Field", s);

},{"../../utils/console":35,"../../utils/native-struct":36,"../utils":33,"decorator-cache-getter":6}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class e {
  handle;
  constructor(e) {
    this.handle = e;
  }
  get target() {
    const e = Il2Cpp.Api._gcHandleGetTarget(this.handle);
    return e.isNull() ? null : new Il2Cpp.Object(e);
  }
  free() {
    return Il2Cpp.Api._gcHandleFree(this.handle);
  }
}

Il2Cpp.GC.Handle = e;

},{}],19:[function(require,module,exports){
"use strict";

var e = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = e(require("versioning"));

class i {
  constructor() {}
  static get heapSize() {
    return Il2Cpp.Api._gcGetHeapSize();
  }
  static get isEnabled() {
    return !Il2Cpp.Api._gcIsDisabled();
  }
  static get isIncremental() {
    return !!Il2Cpp.Api._gcIsIncremental();
  }
  static get maxTimeSlice() {
    return Il2Cpp.Api._gcGetMaxTimeSlice();
  }
  static get usedHeapSize() {
    return Il2Cpp.Api._gcGetUsedSize();
  }
  static set isEnabled(e) {
    e ? Il2Cpp.Api._gcEnable() : Il2Cpp.Api._gcDisable();
  }
  static set maxTimeSlice(e) {
    Il2Cpp.Api._gcSetMaxTimeSlice(e);
  }
  static choose(e) {
    const i = [], l = new NativeCallback(((e, t, l) => {
      for (let l = 0; l < t; l++) i.push(new Il2Cpp.Object(e.add(l * Process.pointerSize).readPointer()));
    }), "void", [ "pointer", "int", "pointer" ]);
    if (t.default.gte(Il2Cpp.unityVersion, "2021.2.0")) {
      const t = new NativeCallback(((e, t) => e.isNull() || 0 != t.compare(0) ? Il2Cpp.alloc(t) : (Il2Cpp.free(e), 
      NULL)), "pointer", [ "pointer", "size_t", "pointer" ]), i = Il2Cpp.Api._livenessAllocateStruct(e.handle, 0, l, NULL, t);
      Il2Cpp.Api._livenessCalculationFromStatics(i), Il2Cpp.Api._livenessFinalize(i), 
      Il2Cpp.Api._livenessFreeStruct(i);
    } else {
      const t = new NativeCallback((() => {}), "void", []), i = Il2Cpp.Api._livenessCalculationBegin(e.handle, 0, l, NULL, t, t);
      Il2Cpp.Api._livenessCalculationFromStatics(i), Il2Cpp.Api._livenessCalculationEnd(i);
    }
    return i;
  }
  static collect(e) {
    Il2Cpp.Api._gcCollect(e < 0 ? 0 : e > 2 ? 2 : e);
  }
  static collectALittle() {
    Il2Cpp.Api._gcCollectALittle();
  }
  static startWorld() {
    return Il2Cpp.Api._gcStartWorld();
  }
  static startIncrementalCollection() {
    return Il2Cpp.Api._gcStartIncrementalCollection();
  }
  static stopWorld() {
    return Il2Cpp.Api._gcStopWorld();
  }
}

Reflect.set(Il2Cpp, "GC", i);

},{"versioning":41}],20:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, l) {
  var r, a = arguments.length, n = a < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, s) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, s, l); else for (var p = e.length - 1; p >= 0; p--) (r = e[p]) && (n = (a < 3 ? r(n) : a > 3 ? r(t, s, n) : r(t, s)) || n);
  return a > 3 && n && Object.defineProperty(t, s, n), n;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), s = require("../../utils/native-struct"), l = require("../../utils/utils");

let r = class extends s.NonNullNativeStruct {
  static get corlib() {
    return new Il2Cpp.Image(Il2Cpp.Api._getCorlib());
  }
  get assembly() {
    return new Il2Cpp.Assembly(Il2Cpp.Api._imageGetAssembly(this));
  }
  get classCount() {
    return Il2Cpp.Api._imageGetClassCount(this);
  }
  get classes() {
    if (Il2Cpp.unityVersionIsBelow201830) {
      const e = this.assembly.object.method("GetTypes").invoke(!1);
      return Array.from(e).map((e => new Il2Cpp.Class(Il2Cpp.Api._classFromSystemType(e))));
    }
    return Array.from(Array(this.classCount), ((e, t) => new Il2Cpp.Class(Il2Cpp.Api._imageGetClass(this, t))));
  }
  get name() {
    return Il2Cpp.Api._imageGetName(this).readUtf8String();
  }
  class(e) {
    return this.tryClass(e);
  }
  tryClass(e) {
    const t = e.lastIndexOf("."), s = Memory.allocUtf8String(-1 == t ? "" : e.slice(0, t)), l = Memory.allocUtf8String(e.slice(t + 1)), r = Il2Cpp.Api._classFromName(this, s, l);
    return r.isNull() ? null : new Il2Cpp.Class(r);
  }
};

e([ t.cache ], r.prototype, "assembly", null), e([ t.cache ], r.prototype, "classCount", null), 
e([ t.cache ], r.prototype, "classes", null), e([ t.cache ], r.prototype, "name", null), 
e([ (0, l.levenshtein)("classes", (e => e.namespace ? `${e.namespace}.${e.name}` : e.name)) ], r.prototype, "class", null), 
e([ t.cache ], r, "corlib", null), r = e([ l.cacheInstances ], r), Il2Cpp.Image = r;

},{"../../utils/native-struct":36,"../../utils/utils":38,"decorator-cache-getter":6}],21:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, o) {
  var s, p = arguments.length, c = p < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var l = e.length - 1; l >= 0; l--) (s = e[l]) && (c = (p < 3 ? s(c) : p > 3 ? s(t, r, c) : s(t, r)) || c);
  return p > 3 && c && Object.defineProperty(t, r, c), c;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/native-struct"), o = require("../../utils/utils");

class s extends r.NonNullNativeStruct {
  static capture() {
    return new Il2Cpp.MemorySnapshot;
  }
  constructor(e = Il2Cpp.Api._memorySnapshotCapture()) {
    super(e);
  }
  get classes() {
    return Array.from((0, o.nativeIterator)(this, Il2Cpp.Api._memorySnapshotGetClasses, Il2Cpp.Class));
  }
  get objects() {
    const e = [], [t, r] = Il2Cpp.Api._memorySnapshotGetGCHandles(this);
    for (let o = 0; o < t; o++) e.push(new Il2Cpp.Object(r.add(o * Process.pointerSize).readPointer()));
    return e;
  }
  free() {
    Il2Cpp.Api._memorySnapshotFree(this);
  }
}

e([ t.cache ], s.prototype, "classes", null), e([ t.cache ], s.prototype, "objects", null), 
Il2Cpp.MemorySnapshot = s;

},{"../../utils/native-struct":36,"../../utils/utils":38,"decorator-cache-getter":6}],22:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, a) {
  var i, n = arguments.length, s = n < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, r) : a;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, a); else for (var o = e.length - 1; o >= 0; o--) (i = e[o]) && (s = (n < 3 ? i(s) : n > 3 ? i(t, r, s) : i(t, r)) || s);
  return n > 3 && s && Object.defineProperty(t, r, s), s;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/console"), a = require("../../utils/native-struct"), i = require("../../utils/utils"), n = require("../utils");

class s extends a.NonNullNativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._methodGetClass(this));
  }
  get flags() {
    return Il2Cpp.Api._methodGetFlags(this, NULL);
  }
  get implementationFlags() {
    const e = Memory.alloc(Process.pointerSize);
    return Il2Cpp.Api._methodGetFlags(this, e), e.readU32();
  }
  get fridaSignature() {
    const e = [];
    for (const t of this.parameters) e.push(t.type.fridaAlias);
    return this.isStatic && !Il2Cpp.unityVersionIsBelow201830 || e.unshift("pointer"), 
    this.isInflated && e.push("pointer"), e;
  }
  get genericParameterCount() {
    return this.isGeneric ? this.object.method("GetGenericArguments").invoke().length : 0;
  }
  get isExternal() {
    return !!Il2Cpp.Api._methodIsExternal(this);
  }
  get isGeneric() {
    return !!Il2Cpp.Api._methodIsGeneric(this);
  }
  get isInflated() {
    return !!Il2Cpp.Api._methodIsInflated(this);
  }
  get isStatic() {
    return !Il2Cpp.Api._methodIsInstance(this);
  }
  get isSynchronized() {
    return !!Il2Cpp.Api._methodIsSynchronized(this);
  }
  get modifier() {
    return Il2Cpp.Api._methodGetModifier(this).readUtf8String();
  }
  get name() {
    return Il2Cpp.Api._methodGetName(this).readUtf8String();
  }
  get nativeFunction() {
    return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
  }
  get object() {
    return new Il2Cpp.Object(Il2Cpp.Api._methodGetObject(this, NULL));
  }
  get parameterCount() {
    return Il2Cpp.Api._methodGetParameterCount(this);
  }
  get parameters() {
    return Array.from(Array(this.parameterCount), ((e, t) => {
      const r = Il2Cpp.Api._methodGetParameterName(this, t).readUtf8String(), a = Il2Cpp.Api._methodGetParameterType(this, t);
      return new Il2Cpp.Parameter(r, t, new Il2Cpp.Type(a));
    }));
  }
  get relativeVirtualAddress() {
    return this.virtualAddress.sub(Il2Cpp.module.base);
  }
  get returnType() {
    return new Il2Cpp.Type(Il2Cpp.Api._methodGetReturnType(this));
  }
  get virtualAddress() {
    return Il2Cpp.Api._methodGetPointer(this);
  }
  set implementation(e) {
    const t = +!this.isStatic | +Il2Cpp.unityVersionIsBelow201830, a = (...r) => {
      const a = this.parameters.map(((e, a) => (0, n.fromFridaValue)(r[a + t], e.type)));
      return (0, n.toFridaValue)(e.call(this.isStatic ? this.class : new Il2Cpp.Object(r[0]), ...a));
    };
    try {
      Interceptor.replace(this.virtualAddress, new NativeCallback(a, this.returnType.fridaAlias, this.fridaSignature));
    } catch (e) {
      switch (e.message) {
       case "access violation accessing 0x0":
        (0, r.raise)(`cannot implement method ${this.name}: it has a NULL virtual address`);

       case `unable to intercept function at ${this.virtualAddress}; please file a bug`:
        (0, r.warn)(`cannot implement method ${this.name}: it may be a thunk`);
        break;

       case "already replaced this function":
        (0, r.warn)(`cannot implement method ${this.name}: already replaced by a thunk`);
        break;

       default:
        throw e;
      }
    }
  }
  inflate(...e) {
    this.isGeneric || (0, r.raise)(`cannot inflate method ${this.name}: it has no generic parameters`), 
    this.genericParameterCount != e.length && (0, r.raise)(`cannot inflate method ${this.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${e.length}`);
    const t = e.map((e => e.type.object)), a = Il2Cpp.Array.from(Il2Cpp.Image.corlib.class("System.Type"), t), i = this.object.method("MakeGenericMethod", 1).invoke(a);
    return new Il2Cpp.Method(Il2Cpp.Api._methodGetFromReflection(i));
  }
  invoke(...e) {
    return this.isStatic || (0, r.raise)(`cannot invoke a non-static method ${this.name}: must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`), 
    this.invokeRaw(NULL, ...e);
  }
  invokeRaw(e, ...t) {
    const a = t.map(n.toFridaValue);
    this.isStatic && !Il2Cpp.unityVersionIsBelow201830 || a.unshift(e), this.isInflated && a.push(this.handle);
    try {
      const e = this.nativeFunction(...a);
      return (0, n.fromFridaValue)(e, this.returnType);
    } catch (e) {
      switch (null == e && (0, r.raise)("an unexpected native function exception occurred, this is due to parameter types mismatch"), 
      e.message) {
       case "bad argument count":
        (0, r.raise)(`cannot invoke method ${this.name}: it needs ${this.parameterCount} parameter(s), not ${t.length}`);

       case "expected a pointer":
       case "expected number":
       case "expected array with fields":
        (0, r.raise)(`cannot invoke method ${this.name}: parameter types mismatch`);
      }
      throw e;
    }
  }
  overload(...e) {
    const t = this.tryOverload(...e);
    if (null != t) return t;
    (0, r.raise)(`cannot find overloaded method ${this.name}(${e})`);
  }
  parameter(e) {
    return this.tryParameter(e);
  }
  revert() {
    Interceptor.revert(this.virtualAddress), Interceptor.flush();
  }
  tryOverload(...e) {
    return this.class.methods.find((t => t.name == this.name && t.parameterCount == e.length && t.parameters.every(((t, r) => t.type.name == e[r]))));
  }
  tryParameter(e) {
    return this.parameters.find((t => t.name == e));
  }
  toString() {
    return `${this.isStatic ? "static " : ""}${this.returnType.name} ${this.name}(${this.parameters.join(", ")});${this.virtualAddress.isNull() ? "" : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, "0")}`}`;
  }
  withHolder(e) {
    return new Proxy(this, {
      get(t, r) {
        switch (r) {
         case "invoke":
          return t.invokeRaw.bind(t, e.handle);

         case "inflate":
         case "overload":
         case "tryOverload":
          return function(...a) {
            return t[r](...a)?.withHolder(e);
          };
        }
        return Reflect.get(t, r);
      }
    });
  }
}

e([ t.cache ], s.prototype, "class", null), e([ t.cache ], s.prototype, "flags", null), 
e([ t.cache ], s.prototype, "implementationFlags", null), e([ t.cache ], s.prototype, "fridaSignature", null), 
e([ t.cache ], s.prototype, "genericParameterCount", null), e([ t.cache ], s.prototype, "isExternal", null), 
e([ t.cache ], s.prototype, "isGeneric", null), e([ t.cache ], s.prototype, "isInflated", null), 
e([ t.cache ], s.prototype, "isStatic", null), e([ t.cache ], s.prototype, "isSynchronized", null), 
e([ t.cache ], s.prototype, "name", null), e([ t.cache ], s.prototype, "nativeFunction", null), 
e([ t.cache ], s.prototype, "object", null), e([ t.cache ], s.prototype, "parameterCount", null), 
e([ t.cache ], s.prototype, "parameters", null), e([ t.cache ], s.prototype, "relativeVirtualAddress", null), 
e([ t.cache ], s.prototype, "returnType", null), e([ t.cache ], s.prototype, "virtualAddress", null), 
e([ (0, i.levenshtein)("parameters") ], s.prototype, "parameter", null), Reflect.set(Il2Cpp, "Method", s);

},{"../../utils/console":35,"../../utils/native-struct":36,"../../utils/utils":38,"../utils":33,"decorator-cache-getter":6}],23:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, r, i) {
  var l, p = arguments.length, s = p < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (l = t[n]) && (s = (p < 3 ? l(s) : p > 3 ? l(e, r, s) : l(e, r)) || s);
  return p > 3 && s && Object.defineProperty(e, r, s), s;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter"), r = require("../../utils/native-struct");

class i extends r.NativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._objectGetClass(this));
  }
  get size() {
    return Il2Cpp.Api._objectGetSize(this);
  }
  enter() {
    return Il2Cpp.Api._monitorEnter(this);
  }
  exit() {
    return Il2Cpp.Api._monitorExit(this);
  }
  field(t) {
    return this.class.field(t).withHolder(this);
  }
  method(t, e = -1) {
    return this.class.method(t, e).withHolder(this);
  }
  pulse() {
    return Il2Cpp.Api._monitorPulse(this);
  }
  pulseAll() {
    return Il2Cpp.Api._monitorPulseAll(this);
  }
  ref(t) {
    return new Il2Cpp.GC.Handle(Il2Cpp.Api._gcHandleNew(this, +t));
  }
  virtualMethod(t) {
    return new Il2Cpp.Method(Il2Cpp.Api._objectGetVirtualMethod(this, t)).withHolder(this);
  }
  tryEnter(t) {
    return !!Il2Cpp.Api._monitorTryEnter(this, t);
  }
  tryField(t) {
    return this.class.tryField(t)?.withHolder(this);
  }
  tryMethod(t, e = -1) {
    return this.class.tryMethod(t, e)?.withHolder(this);
  }
  tryWait(t) {
    return !!Il2Cpp.Api._monitorTryWait(this, t);
  }
  toString() {
    return this.isNull() ? "null" : this.method("ToString").invoke().content ?? "null";
  }
  unbox() {
    return new Il2Cpp.ValueType(Il2Cpp.Api._objectUnbox(this), this.class.type);
  }
  wait() {
    return Il2Cpp.Api._monitorWait(this);
  }
  weakRef(t) {
    return new Il2Cpp.GC.Handle(Il2Cpp.Api._gcHandleNewWeakRef(this, +t));
  }
}

t([ e.cache ], i.prototype, "class", null), t([ e.cache ], i.prototype, "size", null), 
Il2Cpp.Object = i;

},{"../../utils/native-struct":36,"decorator-cache-getter":6}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class t {
  name;
  position;
  type;
  constructor(t, e, s) {
    this.name = t, this.position = e, this.type = s;
  }
  toString() {
    return `${this.type.name} ${this.name}`;
  }
}

Il2Cpp.Parameter = t;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("../utils"), e = require("../../utils/native-struct");

class r extends e.NativeStruct {
  type;
  constructor(t, e) {
    super(t), this.type = e;
  }
  get(e) {
    return (0, t.read)(this.handle.add(e * this.type.class.arrayElementSize), this.type);
  }
  read(t, e = 0) {
    const r = new Array(t);
    for (let s = 0; s < t; s++) r[s] = this.get(s + e);
    return r;
  }
  set(e, r) {
    (0, t.write)(this.handle.add(e * this.type.class.arrayElementSize), r, this.type);
  }
  toString() {
    return this.handle.toString();
  }
  write(t, e = 0) {
    for (let r = 0; r < t.length; r++) this.set(r + e, t[r]);
  }
}

Il2Cpp.Pointer = r;

},{"../../utils/native-struct":36,"../utils":33}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../utils"), t = require("../../utils/native-struct"), r = require("../../utils/console");

class n extends t.NativeStruct {
  type;
  constructor(e, t) {
    super(e), this.type = t;
  }
  get value() {
    return (0, e.read)(this.handle, this.type);
  }
  set value(t) {
    (0, e.write)(this.handle, t, this.type);
  }
  toString() {
    return this.isNull() ? "null" : `->${this.value}`;
  }
  static to(e, t) {
    const n = Memory.alloc(Process.pointerSize);
    switch (typeof e) {
     case "boolean":
      return new Il2Cpp.Reference(n.writeS8(+e), Il2Cpp.Image.corlib.class("System.Boolean").type);

     case "number":
      switch (t?.typeEnum) {
       case 5:
        return new Il2Cpp.Reference(n.writeU8(e), t);

       case 4:
        return new Il2Cpp.Reference(n.writeS8(e), t);

       case 3:
       case 7:
        return new Il2Cpp.Reference(n.writeU16(e), t);

       case 6:
        return new Il2Cpp.Reference(n.writeS16(e), t);

       case 9:
        return new Il2Cpp.Reference(n.writeU32(e), t);

       case 8:
        return new Il2Cpp.Reference(n.writeS32(e), t);

       case 11:
        return new Il2Cpp.Reference(n.writeU64(e), t);

       case 10:
        return new Il2Cpp.Reference(n.writeS64(e), t);

       case 12:
        return new Il2Cpp.Reference(n.writeFloat(e), t);

       case 13:
        return new Il2Cpp.Reference(n.writeDouble(e), t);
      }

     case "object":
      if (e instanceof Il2Cpp.ValueType || e instanceof Il2Cpp.Pointer) return new Il2Cpp.Reference(n.writePointer(e), e.type);
      if (e instanceof Il2Cpp.Object) return new Il2Cpp.Reference(n.writePointer(e), e.class.type);
      if (e instanceof Il2Cpp.String || e instanceof Il2Cpp.Array) return new Il2Cpp.Reference(n.writePointer(e), e.object.class.type);
      if (e instanceof NativePointer) switch (t?.typeEnum) {
       case 25:
       case 24:
        return new Il2Cpp.Reference(n.writePointer(e), t);
      } else {
        if (e instanceof Int64) return new Il2Cpp.Reference(n.writeS64(e), Il2Cpp.Image.corlib.class("System.Int64").type);
        if (e instanceof UInt64) return new Il2Cpp.Reference(n.writeU64(e), Il2Cpp.Image.corlib.class("System.UInt64").type);
      }

     default:
      (0, r.raise)(`don't know how to create a reference to ${e} using type ${t?.name}`);
    }
  }
}

Il2Cpp.Reference = n;

},{"../../utils/console":35,"../../utils/native-struct":36,"../utils":33}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("../../utils/native-struct");

class e extends t.NativeStruct {
  get content() {
    return Il2Cpp.Api._stringChars(this).readUtf16String(this.length);
  }
  set content(t) {
    Il2Cpp.Api._stringChars(this).writeUtf16String(t ?? ""), Il2Cpp.Api._stringSetLength(this, t?.length ?? 0);
  }
  get length() {
    return Il2Cpp.Api._stringLength(this);
  }
  get object() {
    return new Il2Cpp.Object(this);
  }
  toString() {
    return this.isNull() ? "null" : `"${this.content}"`;
  }
  static from(t) {
    return new Il2Cpp.String(Il2Cpp.Api._stringNew(Memory.allocUtf8String(t || "")));
  }
}

Il2Cpp.String = e;

},{"../../utils/native-struct":36}],28:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var t = this && this.__decorate || function(t, e, r, n) {
  var i, o = arguments.length, a = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, r, a) : i(e, r)) || a);
  return o > 3 && a && Object.defineProperty(e, r, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter"), r = require("../../utils/console"), n = require("../../utils/native-struct");

class i extends n.NativeStruct {
  static get idOffset() {
    const t = ptr(Il2Cpp.currentThread.internal.field("thread_id").value.toString()), e = Process.getCurrentThreadId();
    for (let r = 0; r < 1024; r++) {
      if (t.add(r).readS32() == e) return r;
    }
    (0, r.raise)("couldn't determine the offset for a native thread id value");
  }
  get id() {
    return ptr(this.internal.field("thread_id").value.toString()).add(Il2Cpp.Thread.idOffset).readS32();
  }
  get internal() {
    const t = this.object.tryField("internal_thread")?.value;
    return t || this.object;
  }
  get isFinalizer() {
    return !Il2Cpp.Api._threadIsVm(this);
  }
  get object() {
    return new Il2Cpp.Object(this);
  }
  get staticData() {
    return this.internal.field("static_data").value;
  }
  get synchronizationContext() {
    const t = this.object.tryMethod("GetMutableExecutionContext") || this.object.method("get_ExecutionContext");
    let e = t.invoke().tryMethod("get_SynchronizationContext")?.invoke();
    if (null == e) {
      const t = Il2Cpp.Image.corlib.class("System.Threading.SynchronizationContext");
      for (let r = 0; r < 16; r++) try {
        const n = new Il2Cpp.Object(this.staticData.add(Process.pointerSize * r).readPointer().readPointer());
        if (n.class.isSubclassOf(t, !1)) {
          e = n;
          break;
        }
      } catch (t) {}
    }
    return null == e && (0, r.raise)("couldn't retrieve the SynchronizationContext for this thread."), 
    e;
  }
  detach() {
    return Il2Cpp.Api._threadDetach(this);
  }
  schedule(t, e = 0) {
    const r = this.id, n = Il2Cpp.Image.corlib.class("Mono.Runtime").method("GetDisplayName"), i = Il2Cpp.Image.corlib.class("System.Threading.SendOrPostCallback").alloc();
    i.method(".ctor").invoke(NULL, n.handle);
    const o = this.synchronizationContext.method("Post");
    return new Promise((a => {
      const c = Interceptor.attach(n.virtualAddress, (function() {
        if (this.threadId == r) {
          c.detach();
          const e = t();
          setImmediate((() => a(e)));
        }
      }));
      setTimeout((() => o.invoke(i, NULL)), e);
    }));
  }
}

t([ e.cache ], i.prototype, "internal", null), t([ e.cache ], i.prototype, "object", null), 
t([ e.cache ], i.prototype, "staticData", null), t([ e.cache ], i.prototype, "synchronizationContext", null), 
t([ e.cache ], i, "idOffset", null), Il2Cpp.Thread = i;

}).call(this)}).call(this,require("timers").setImmediate)
},{"../../utils/console":35,"../../utils/native-struct":36,"decorator-cache-getter":6,"timers":40}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

},{}],30:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, c) {
  var n, s = arguments.length, i = s < 3 ? t : null === c ? c = Object.getOwnPropertyDescriptor(t, r) : c;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, c); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (i = (s < 3 ? n(i) : s > 3 ? n(t, r, i) : n(t, r)) || i);
  return s > 3 && i && Object.defineProperty(t, r, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/native-struct");

class c extends r.NonNullNativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._classFromType(this));
  }
  get fridaAlias() {
    if (this.isByReference) return "pointer";
    switch (this.typeEnum) {
     case 1:
      return "void";

     case 2:
      return "bool";

     case 3:
      return "uchar";

     case 4:
      return "int8";

     case 5:
      return "uint8";

     case 6:
      return "int16";

     case 7:
      return "uint16";

     case 8:
      return "int32";

     case 9:
      return "uint32";

     case 10:
      return "int64";

     case 11:
      return "uint64";

     case 12:
      return "float";

     case 13:
      return "double";

     case 17:
      return n(this);

     case 24:
     case 25:
     case 15:
     case 14:
     case 29:
     case 20:
     default:
      return "pointer";

     case 18:
     case 28:
     case 21:
      return this.class.isValueType ? n(this) : "pointer";
    }
  }
  get isByReference() {
    return !!Il2Cpp.Api._typeIsByReference(this);
  }
  get isPrimitive() {
    return !!Il2Cpp.Api._typeIsPrimitive(this);
  }
  get name() {
    const e = Il2Cpp.Api._typeGetName(this);
    try {
      return e.readUtf8String();
    } finally {
      Il2Cpp.free(e);
    }
  }
  get object() {
    return new Il2Cpp.Object(Il2Cpp.Api._typeGetObject(this));
  }
  get typeEnum() {
    return Il2Cpp.Api._typeGetTypeEnum(this);
  }
  toString() {
    return this.name;
  }
}

function n(e) {
  const t = e.class.fields.filter((e => !e.isStatic));
  return 0 == t.length ? [ "char" ] : t.map((e => e.type.fridaAlias));
}

e([ t.cache ], c.prototype, "class", null), e([ t.cache ], c.prototype, "fridaAlias", null), 
e([ t.cache ], c.prototype, "isByReference", null), e([ t.cache ], c.prototype, "isPrimitive", null), 
e([ t.cache ], c.prototype, "name", null), e([ t.cache ], c.prototype, "object", null), 
e([ t.cache ], c.prototype, "typeEnum", null), Reflect.set(Il2Cpp, "Type", c);

},{"../../utils/native-struct":36,"decorator-cache-getter":6}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("../../utils/native-struct");

class e extends t.NativeStruct {
  type;
  constructor(t, e) {
    super(t), this.type = e;
  }
  box() {
    return new Il2Cpp.Object(Il2Cpp.Api._valueBox(this.type.class, this));
  }
  field(t) {
    return this.type.class.field(t).withHolder(this);
  }
  toString() {
    return this.isNull() ? "null" : this.box().toString();
  }
}

Il2Cpp.ValueType = e;

},{"../../utils/native-struct":36}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const s = require("../utils/console"), e = require("./utils");

class t {
  targets=[];
  #s;
  #e;
  #t;
  #i;
  #r;
  #a;
  #l;
  domain() {
    return this;
  }
  assemblies(...s) {
    return this.#s = s, this;
  }
  classes(...s) {
    return this.#e = s, this;
  }
  methods(...s) {
    return this.#t = s, this;
  }
  filterAssemblies(s) {
    return this.#i = s, this;
  }
  filterClasses(s) {
    return this.#r = s, this;
  }
  filterMethods(s) {
    return this.#a = s, this;
  }
  filterParameters(s) {
    return this.#l = s, this;
  }
  and() {
    const s = s => {
      if (null != this.#l) {
        for (const e of s.parameters) if (this.#l(e)) {
          this.targets.push(s);
          break;
        }
      } else this.targets.push(s);
    }, e = e => {
      for (const t of e) s(t);
    }, t = t => {
      if (null != this.#a) for (const e of t.methods) this.#a(e) && s(e); else e(t.methods);
    }, i = s => {
      for (const e of s) t(e);
    }, r = s => {
      if (null != this.#r) for (const e of s.image.classes) this.#r(e) && t(e); else i(s.image.classes);
    }, a = s => {
      for (const e of s) r(e);
    };
    return this.#t ? e(this.#t) : this.#e ? i(this.#e) : this.#s ? a(this.#s) : (s => {
      if (null != this.#i) for (const e of s.assemblies) this.#i(e) && r(e); else a(s.assemblies);
    })(Il2Cpp.Domain), this.#s = void 0, this.#e = void 0, this.#t = void 0, this.#i = void 0, 
    this.#r = void 0, this.#a = void 0, this.#l = void 0, this;
  }
  attach(t = "full") {
    let i = 0;
    for (const r of this.targets) {
      if (r.virtualAddress.isNull()) continue;
      const a = `[2m0x${r.relativeVirtualAddress.toString(16).padStart(8, "0")}[0m`, l = `${r.class.type.name}.[1m${r.name}[0m`;
      if ("detailed" == t) {
        const t = +!r.isStatic | +Il2Cpp.unityVersionIsBelow201830, o = (...o) => {
          const m = r.isStatic ? void 0 : new Il2Cpp.Parameter("this", -1, r.class.type), n = m ? [ m ].concat(r.parameters) : r.parameters;
          (0, s.inform)(`${a} ${"│ ".repeat(i++)}┌─[35m${l}[0m(${n.map((s => `[32m${s.name}[0m = [31m${(0, 
          e.fromFridaValue)(o[s.position + t], s.type)}[0m`)).join(", ")});`);
          const h = r.nativeFunction(...o);
          return (0, s.inform)(`${a} ${"│ ".repeat(--i)}└─[33m${l}[0m${null == h ? "" : ` = [36m${(0, 
          e.fromFridaValue)(h, r.returnType)}`}[0m;`), h;
        };
        try {
          r.revert();
          const s = new NativeCallback(o, r.returnType.fridaAlias, r.fridaSignature);
          Interceptor.replace(r.virtualAddress, s);
        } catch (s) {}
      } else try {
        Interceptor.attach(r.virtualAddress, {
          onEnter: () => (0, s.inform)(`${a} ${"│ ".repeat(i++)}┌─[35m${l}[0m`),
          onLeave: () => (0, s.inform)(`${a} ${"│ ".repeat(--i)}└─[33m${l}[0m${0 == i ? "\n" : ""}`)
        });
      } catch (s) {}
    }
  }
}

Il2Cpp.Tracer = t;

},{"../utils/console":35,"./utils":33}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.toFridaValue = exports.fromFridaValue = exports.write = exports.read = void 0;

const e = require("../utils/console"), r = require("../utils/native-struct");

function a(r, a) {
  switch (a.typeEnum) {
   case 2:
    return !!r.readS8();

   case 4:
    return r.readS8();

   case 5:
    return r.readU8();

   case 6:
    return r.readS16();

   case 7:
   case 3:
    return r.readU16();

   case 8:
    return r.readS32();

   case 9:
    return r.readU32();

   case 10:
    return r.readS64();

   case 11:
    return r.readU64();

   case 12:
    return r.readFloat();

   case 13:
    return r.readDouble();

   case 24:
   case 25:
    return r.readPointer();

   case 15:
    return new Il2Cpp.Pointer(r.readPointer(), a.class.baseType);

   case 17:
    return new Il2Cpp.ValueType(r, a);

   case 28:
   case 18:
    return new Il2Cpp.Object(r.readPointer());

   case 21:
    return a.class.isValueType ? new Il2Cpp.ValueType(r, a) : new Il2Cpp.Object(r.readPointer());

   case 14:
    return new Il2Cpp.String(r.readPointer());

   case 29:
   case 20:
    return new Il2Cpp.Array(r.readPointer());
  }
  (0, e.raise)(`read: "${a.name}" (${a.typeEnum}) has not been handled yet. Please file an issue!`);
}

function t(r, a, t) {
  switch (t.typeEnum) {
   case 2:
    return r.writeS8(+a);

   case 4:
    return r.writeS8(a);

   case 5:
    return r.writeU8(a);

   case 6:
    return r.writeS16(a);

   case 7:
   case 3:
    return r.writeU16(a);

   case 8:
    return r.writeS32(a);

   case 9:
    return r.writeU32(a);

   case 10:
    return r.writeS64(a);

   case 11:
    return r.writeU64(a);

   case 12:
    return r.writeFloat(a);

   case 13:
    return r.writeDouble(a);

   case 24:
   case 25:
   case 15:
   case 17:
   case 14:
   case 28:
   case 18:
   case 29:
   case 20:
   case 21:
    return a instanceof Il2Cpp.ValueType ? (Memory.copy(r, a.handle, t.class.valueSize), 
    r) : r.writePointer(a);
  }
  (0, e.raise)(`write: "${t.name}" (${t.typeEnum}) has not been handled yet. Please file an issue!`);
}

function s(e, r) {
  if (Array.isArray(e)) return i(r, e);
  if (!(e instanceof NativePointer)) return 2 == r.typeEnum ? !!e : e;
  if (r.isByReference) return new Il2Cpp.Reference(e, r);
  switch (r.typeEnum) {
   case 15:
    return new Il2Cpp.Pointer(e, r.class.baseType);

   case 14:
    return new Il2Cpp.String(e);

   case 18:
   case 21:
   case 28:
    return new Il2Cpp.Object(e);

   case 29:
   case 20:
    return new Il2Cpp.Array(e);

   default:
    return e;
  }
}

function n(e) {
  return "boolean" == typeof e ? +e : e instanceof Il2Cpp.ValueType ? c(e) : e;
}

function c(e) {
  const a = e.type.class.fields.filter((e => !e.isStatic));
  return 0 == a.length ? [ e.handle.readU8() ] : a.map((r => r.withHolder(e).value)).map((e => e instanceof Il2Cpp.ValueType ? c(e) : e instanceof r.NativeStruct ? e.handle : "boolean" == typeof e ? +e : e));
}

function i(r, a) {
  const t = Memory.alloc(r.class.valueSize);
  a = a.flat(1 / 0);
  const s = function e(r, a = 0) {
    const t = [];
    for (const s of r.class.fields) if (!s.isStatic) {
      const r = a + s.offset - Il2Cpp.Runtime.objectHeaderSize;
      17 == s.type.typeEnum || 21 == s.type.typeEnum && s.type.class.isValueType ? t.push(...e(s.type, r)) : t.push([ s.type.typeEnum, r ]);
    }
    return 0 == t.length && t.push([ 5, 0 ]), t;
  }(r);
  for (let r = 0; r < a.length; r++) {
    const n = a[r], [c, i] = s[r], u = t.add(i);
    switch (c) {
     case 2:
     case 4:
      u.writeS8(n);
      break;

     case 5:
      u.writeU8(n);
      break;

     case 6:
      u.writeS16(n);
      break;

     case 7:
     case 3:
      u.writeU16(n);
      break;

     case 8:
      u.writeS32(n);
      break;

     case 9:
      u.writeU32(n);
      break;

     case 10:
      u.writeS64(n);
      break;

     case 11:
      u.writeU64(n);
      break;

     case 12:
      u.writeFloat(n);
      break;

     case 13:
      u.writeDouble(n);
      break;

     case 24:
     case 25:
     case 15:
     case 29:
     case 20:
     case 14:
     case 28:
     case 18:
     case 21:
      u.writePointer(n);
      break;

     default:
      (0, e.warn)(`arrayToValueType: defaulting ${c} to pointer`), u.writePointer(n);
    }
  }
  return new Il2Cpp.ValueType(t, r);
}

exports.read = a, exports.write = t, exports.fromFridaValue = s, exports.toFridaValue = n;

},{"../utils/console":35,"../utils/native-struct":36}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./il2cpp");

},{"./il2cpp":11}],35:[function(require,module,exports){
"use strict";

function o(o) {
  throw `[0m[38;5;9mil2cpp[0m: ${o}`;
}

function e(o) {
  globalThis.console.log(`[38;5;11mil2cpp[0m: ${o}`);
}

function s(o) {
  globalThis.console.log(`[38;5;10mil2cpp[0m: ${o}`);
}

function r(o) {
  globalThis.console.log(`[38;5;12mil2cpp[0m: ${o}`);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.inform = exports.ok = exports.warn = exports.raise = void 0, exports.raise = o, 
exports.warn = e, exports.ok = s, exports.inform = r;

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NonNullNativeStruct = exports.NativeStruct = void 0;

class t {
  handle;
  constructor(t) {
    t instanceof NativePointer ? this.handle = t : this.handle = t.handle;
  }
  equals(t) {
    return this.handle.equals(t.handle);
  }
  isNull() {
    return this.handle.isNull();
  }
}

exports.NativeStruct = t;

class e extends t {
  constructor(t) {
    if (super(t), t.isNull()) throw new Error(`Handle for "${this.constructor.name}" cannot be NULL.`);
  }
}

exports.NonNullNativeStruct = e;

},{}],37:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var e = this && this.__decorate || function(e, t, r, n) {
  var o, s = arguments.length, i = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (i = (s < 3 ? o(i) : s > 3 ? o(t, r, i) : o(t, r)) || i);
  return s > 3 && i && Object.defineProperty(t, r, i), i;
}, t = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.forModule = void 0;

const r = require("decorator-cache-getter"), n = t(require("versioning"));

class o {
  stringEncoding;
  address;
  constructor(e, t, r) {
    this.stringEncoding = r, this.address = Module.findExportByName(e, t) ?? NULL;
  }
  static get targets() {
    const [e, ...t] = function() {
      switch (Process.platform) {
       case "linux":
        try {
          return n.default.gte(Java.androidVersion, "12") ? [ null, [ "__loader_dlopen", "utf8" ] ] : [ "libdl.so", [ "dlopen", "utf8" ], [ "android_dlopen_ext", "utf8" ] ];
        } catch (e) {
          return [ null, [ "dlopen", "utf8" ] ];
        }

       case "darwin":
        return [ "libdyld.dylib", [ "dlopen", "utf8" ] ];

       case "windows":
        const e = "LoadLibrary";
        return [ "kernel32.dll", [ `${e}W`, "utf16" ], [ `${e}ExW`, "utf16" ], [ `${e}A`, "ansi" ], [ `${e}ExA`, "ansi" ] ];
      }
    }();
    return t.map((([t, r]) => new o(e, t, r))).filter((e => !e.address.isNull()));
  }
  readString(e) {
    switch (this.stringEncoding) {
     case "utf8":
      return e.readUtf8String();

     case "utf16":
      return e.readUtf16String();

     case "ansi":
      return e.readAnsiString();
    }
  }
}

function s(...e) {
  return new Promise((t => {
    for (const r of e) {
      if (null != Process.findModuleByName(r)) return void t(r);
    }
    const r = o.targets.map((n => Interceptor.attach(n.address, {
      onEnter(e) {
        this.modulePath = n.readString(e[0]) ?? "";
      },
      onLeave(n) {
        if (!n.isNull()) for (const n of e) this.modulePath.endsWith(n) && (setImmediate((() => r.forEach((e => e.detach())))), 
        t(n));
      }
    })));
  }));
}

e([ r.cache ], o, "targets", null), exports.forModule = s;

}).call(this)}).call(this,require("timers").setImmediate)
},{"decorator-cache-getter":6,"timers":40,"versioning":41}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.levenshtein = exports.cacheInstances = exports.nativeIterator = void 0;

const e = require("fastest-levenshtein"), t = require("./console");

function* n(e, t, n) {
  const s = Memory.alloc(Process.pointerSize);
  let o;
  for (;!(o = t(e, s)).isNull(); ) yield new n(o);
}

function s(e) {
  const t = new Map;
  return new Proxy(e, {
    construct(e, n) {
      const s = n[0].toUInt32();
      return t.has(s) || t.set(s, new e(n[0])), t.get(s);
    }
  });
}

function o(n, s = (e => e.name)) {
  return function(o, r, c) {
    const i = c.value;
    c.value = function(o, ...c) {
      const a = i.call(this, o, ...c);
      if (null != a) return a;
      const u = (0, e.closest)(o, this[n].map(s));
      (0, t.raise)(`couldn't find ${r} ${o} in ${this.name}${u ? `, did you mean ${u}?` : ""}`);
    };
  };
}

exports.nativeIterator = n, exports.cacheInstances = s, exports.levenshtein = o;

},{"./console":35,"fastest-levenshtein":7}],39:[function(require,module,exports){
var t, e, n = module.exports = {};

function r() {
  throw new Error("setTimeout has not been defined");
}

function o() {
  throw new Error("clearTimeout has not been defined");
}

function i(e) {
  if (t === setTimeout) return setTimeout(e, 0);
  if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
  try {
    return t(e, 0);
  } catch (n) {
    try {
      return t.call(null, e, 0);
    } catch (n) {
      return t.call(this, e, 0);
    }
  }
}

function u(t) {
  if (e === clearTimeout) return clearTimeout(t);
  if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
  try {
    return e(t);
  } catch (n) {
    try {
      return e.call(null, t);
    } catch (n) {
      return e.call(this, t);
    }
  }
}

!function() {
  try {
    t = "function" == typeof setTimeout ? setTimeout : r;
  } catch (e) {
    t = r;
  }
  try {
    e = "function" == typeof clearTimeout ? clearTimeout : o;
  } catch (t) {
    e = o;
  }
}();

var c, s = [], l = !1, a = -1;

function f() {
  l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h());
}

function h() {
  if (!l) {
    var t = i(f);
    l = !0;
    for (var e = s.length; e; ) {
      for (c = s, s = []; ++a < e; ) c && c[a].run();
      a = -1, e = s.length;
    }
    c = null, l = !1, u(t);
  }
}

function m(t, e) {
  this.fun = t, this.array = e;
}

function p() {}

n.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  s.push(new m(t, e)), 1 !== s.length || l || i(h);
}, m.prototype.run = function() {
  this.fun.apply(null, this.array);
}, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", 
n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, 
n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, 
n.listeners = function(t) {
  return [];
}, n.binding = function(t) {
  throw new Error("process.binding is not supported");
}, n.cwd = function() {
  return "/";
}, n.chdir = function(t) {
  throw new Error("process.chdir is not supported");
}, n.umask = function() {
  return 0;
};

},{}],40:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var e = require("process/browser.js").nextTick, t = Function.prototype.apply, o = Array.prototype.slice, i = {}, n = 0;

function r(e, t) {
  this._id = e, this._clearFn = t;
}

exports.setTimeout = function() {
  return new r(t.call(setTimeout, window, arguments), clearTimeout);
}, exports.setInterval = function() {
  return new r(t.call(setInterval, window, arguments), clearInterval);
}, exports.clearTimeout = exports.clearInterval = function(e) {
  e.close();
}, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
  this._clearFn.call(window, this._id);
}, exports.enroll = function(e, t) {
  clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
}, exports.unenroll = function(e) {
  clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
}, exports._unrefActive = exports.active = function(e) {
  clearTimeout(e._idleTimeoutId);
  var t = e._idleTimeout;
  t >= 0 && (e._idleTimeoutId = setTimeout((function() {
    e._onTimeout && e._onTimeout();
  }), t));
}, exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(t) {
  var r = n++, l = !(arguments.length < 2) && o.call(arguments, 1);
  return i[r] = !0, e((function() {
    i[r] && (l ? t.apply(null, l) : t.call(null), exports.clearImmediate(r));
  })), r;
}, exports.clearImmediate = "function" == typeof clearImmediate ? clearImmediate : function(e) {
  delete i[e];
};

}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":39,"timers":40}],41:[function(require,module,exports){
var t = ".", n = function(t) {
  this._version = String(t);
};

function r(n, r, i) {
  if ((n = String(n)) === (r = String(r))) return 0;
  for (var e = n.split(t), o = r.split(t), u = Math[i ? "max" : "min"](e.length, o.length), s = 0; s < u; s++) {
    if (e[s] = void 0 === e[s] ? 0 : parseInt(e[s], 10), o[s] = void 0 === o[s] ? 0 : parseInt(o[s], 10), 
    e[s] > o[s]) return 1;
    if (e[s] < o[s]) return -1;
  }
  return 0;
}

n.compare = function(t, n) {
  return r(t, n, !0);
}, n.eq = function(t, n, i) {
  return 0 === r(t, n, i);
}, n.gt = function(t, n) {
  return r(t, n, !0) > 0;
}, n.gte = function(t, n) {
  return r(t, n, !0) >= 0;
}, n.lt = function(t, n) {
  return r(t, n, !0) < 0;
}, n.lte = function(t, n) {
  return r(t, n, !0) <= 0;
}, n.prototype = {
  eq: function(t) {
    return n.eq(this._version, t);
  },
  gt: function(t) {
    return n.gt(this._version, t);
  },
  gte: function(t) {
    return n.gte(this._version, t);
  },
  lt: function(t) {
    return n.lt(this._version, t);
  },
  lte: function(t) {
    return n.lte(this._version, t);
  },
  valueOf: function() {
    return parseFloat(this._version.split(t).slice(0, 2).join(t), 10);
  },
  toString: function(n) {
    return void 0 === n ? this._version : this._version.split(t).slice(0, n).join(t);
  }
}, module.exports = n;

},{}]},{},[2]);
