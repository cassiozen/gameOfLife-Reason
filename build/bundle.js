var gameOfLife = (function (exports) {
'use strict';

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

failure.tag = 248;

invalid_argument.tag = 248;

assert_failure.tag = 248;


/*  Not a pure module */

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  return result;
}

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    xs[index] = newval;
    return /* () */0;
  }
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return xs[index];
  }
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
}


/* No side effect */

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var arity = f.length;
    var arity$1 = arity ? arity : 1;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d) {
      if (d < 0) {
        _args = caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity$1));
        continue ;
        
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    } else {
      return f.apply(null, args);
    }
  }
}

function curry_1(o, a0, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[a0]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return o(a0);
      case 2 : 
          return (function (param) {
              return o(a0, param);
            });
      case 3 : 
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 : 
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      
    }
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function curry_2(o, a0, a1, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return app(o(a0), /* array */[a1]);
      case 2 : 
          return o(a0, a1);
      case 3 : 
          return (function (param) {
              return o(a0, a1, param);
            });
      case 4 : 
          return (function (param, param$1) {
              return o(a0, a1, param, param$1);
            });
      case 5 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            });
      
    }
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}


/* No side effect */

/* No side effect */

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return 0;
    } else {
      var a_type = typeof a;
      var b_type = typeof b;
      if (a_type === "string") {
        var x = a;
        var y = b;
        if (x < y) {
          return -1;
        } else if (x === y) {
          return 0;
        } else {
          return 1;
        }
      } else {
        var is_a_number = +(a_type === "number");
        var is_b_number = +(b_type === "number");
        if (is_a_number !== 0) {
          if (is_b_number !== 0) {
            return caml_int_compare(a, b);
          } else {
            return -1;
          }
        } else if (is_b_number !== 0) {
          return 1;
        } else if (a_type === "boolean" || a_type === "undefined" || a === null) {
          var x$1 = a;
          var y$1 = b;
          if (x$1 === y$1) {
            return 0;
          } else if (x$1 < y$1) {
            return -1;
          } else {
            return 1;
          }
        } else if (a_type === "function" || b_type === "function") {
          throw [
                invalid_argument,
                "compare: functional value"
              ];
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
            
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
            
          } else if (tag_a === 248) {
            return caml_int_compare(a[1], b[1]);
          } else if (tag_a === 251) {
            throw [
                  invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            if (tag_a < tag_b) {
              return -1;
            } else {
              return 1;
            }
          } else {
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              var a$1 = a;
              var b$1 = b;
              var _i = 0;
              var same_length = len_a;
              while(true) {
                var i = _i;
                if (i === same_length) {
                  return 0;
                } else {
                  var res = caml_compare(a$1[i], b$1[i]);
                  if (res !== 0) {
                    return res;
                  } else {
                    _i = i + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            } else if (len_a < len_b) {
              var a$2 = a;
              var b$2 = b;
              var _i$1 = 0;
              var short_length = len_a;
              while(true) {
                var i$1 = _i$1;
                if (i$1 === short_length) {
                  return -1;
                } else {
                  var res$1 = caml_compare(a$2[i$1], b$2[i$1]);
                  if (res$1 !== 0) {
                    return res$1;
                  } else {
                    _i$1 = i$1 + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            } else {
              var a$3 = a;
              var b$3 = b;
              var _i$2 = 0;
              var short_length$1 = len_b;
              while(true) {
                var i$2 = _i$2;
                if (i$2 === short_length$1) {
                  return 1;
                } else {
                  var res$2 = caml_compare(a$3[i$2], b$3[i$2]);
                  if (res$2 !== 0) {
                    return res$2;
                  } else {
                    _i$2 = i$2 + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function caml_greaterequal(a, b) {
  return +(caml_compare(a, b) >= 0);
}


/* No side effect */

/* stdin Not a pure module */

function caml_sys_random_seed() {
  return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
}


/* No side effect */

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);


/* imul Not a pure module */

/* repeat Not a pure module */

/* two_ptr_32_dbl Not a pure module */

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c - /* "0" */48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    case 3 : 
        return 2;
    
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base = /* Dec */2;
  var i = 0;
  if (s[i] === "-") {
    sign = -1;
    i = i + 1 | 0;
  }
  var match = s.charCodeAt(i);
  var match$1 = s.charCodeAt(i + 1 | 0);
  if (match === 48) {
    if (match$1 >= 89) {
      if (match$1 !== 98) {
        if (match$1 !== 111) {
          if (match$1 === 120) {
            base = /* Hex */1;
            i = i + 2 | 0;
          }
          
        } else {
          base = /* Oct */0;
          i = i + 2 | 0;
        }
      } else {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
    } else if (match$1 !== 66) {
      if (match$1 !== 79) {
        if (match$1 >= 88) {
          base = /* Hex */1;
          i = i + 2 | 0;
        }
        
      } else {
        base = /* Oct */0;
        i = i + 2 | 0;
      }
    } else {
      base = /* Bin */3;
      i = i + 2 | 0;
    }
  }
  return /* tuple */[
          i,
          sign,
          base
        ];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw [
          failure,
          "int_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
          
        } else {
          var v = parse_digit(a);
          if (v < 0 || v >= base) {
            throw [
                  failure,
                  "int_of_string"
                ];
          } else {
            var acc$1 = base * acc + v;
            if (acc$1 > threshold) {
              throw [
                    failure,
                    "int_of_string"
                  ];
            } else {
              _k = k + 1 | 0;
              _acc = acc$1;
              continue ;
              
            }
          }
        }
      }
    }
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw [
          failure,
          "int_of_string"
        ];
  }
  return or_res;
}


/* float_of_string Not a pure module */

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}


/* No side effect */

var id = [0];

function get_id() {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = get_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}

function isCamlExceptionOrOpenVariant(e) {
  if (e === undefined) {
    return /* false */0;
  } else if (e.tag === 248) {
    return /* true */1;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return +(slot.tag === 248);
    } else {
      return /* false */0;
    }
  }
}


/* No side effect */

/* not_implemented Not a pure module */

/* No side effect */

var Exit = create("Pervasives.Exit");

function max(x, y) {
  if (caml_greaterequal(x, y)) {
    return x;
  } else {
    return y;
  }
}


/* No side effect */

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      _1(f, param[0]);
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  }
}


/* No side effect */

var $$Error = create("Js_exn.Error");

function internalToOCamlException(e) {
  if (isCamlExceptionOrOpenVariant(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}


/* No side effect */

var Bottom = create("Array.Bottom");


/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

function cmn(q, a, b, x, s, t) {
  var a$1 = ((a + q | 0) + x | 0) + t | 0;
  return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
}

function f(a, b, c, d, x, s, t) {
  return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
}

function g(a, b, c, d, x, s, t) {
  return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
}

function h(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function i(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
}

function cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = f(a, b, c, d, k[0], 7, -680876936);
  d = f(d, a, b, c, k[1], 12, -389564586);
  c = f(c, d, a, b, k[2], 17, 606105819);
  b = f(b, c, d, a, k[3], 22, -1044525330);
  a = f(a, b, c, d, k[4], 7, -176418897);
  d = f(d, a, b, c, k[5], 12, 1200080426);
  c = f(c, d, a, b, k[6], 17, -1473231341);
  b = f(b, c, d, a, k[7], 22, -45705983);
  a = f(a, b, c, d, k[8], 7, 1770035416);
  d = f(d, a, b, c, k[9], 12, -1958414417);
  c = f(c, d, a, b, k[10], 17, -42063);
  b = f(b, c, d, a, k[11], 22, -1990404162);
  a = f(a, b, c, d, k[12], 7, 1804603682);
  d = f(d, a, b, c, k[13], 12, -40341101);
  c = f(c, d, a, b, k[14], 17, -1502002290);
  b = f(b, c, d, a, k[15], 22, 1236535329);
  a = g(a, b, c, d, k[1], 5, -165796510);
  d = g(d, a, b, c, k[6], 9, -1069501632);
  c = g(c, d, a, b, k[11], 14, 643717713);
  b = g(b, c, d, a, k[0], 20, -373897302);
  a = g(a, b, c, d, k[5], 5, -701558691);
  d = g(d, a, b, c, k[10], 9, 38016083);
  c = g(c, d, a, b, k[15], 14, -660478335);
  b = g(b, c, d, a, k[4], 20, -405537848);
  a = g(a, b, c, d, k[9], 5, 568446438);
  d = g(d, a, b, c, k[14], 9, -1019803690);
  c = g(c, d, a, b, k[3], 14, -187363961);
  b = g(b, c, d, a, k[8], 20, 1163531501);
  a = g(a, b, c, d, k[13], 5, -1444681467);
  d = g(d, a, b, c, k[2], 9, -51403784);
  c = g(c, d, a, b, k[7], 14, 1735328473);
  b = g(b, c, d, a, k[12], 20, -1926607734);
  a = h(a, b, c, d, k[5], 4, -378558);
  d = h(d, a, b, c, k[8], 11, -2022574463);
  c = h(c, d, a, b, k[11], 16, 1839030562);
  b = h(b, c, d, a, k[14], 23, -35309556);
  a = h(a, b, c, d, k[1], 4, -1530992060);
  d = h(d, a, b, c, k[4], 11, 1272893353);
  c = h(c, d, a, b, k[7], 16, -155497632);
  b = h(b, c, d, a, k[10], 23, -1094730640);
  a = h(a, b, c, d, k[13], 4, 681279174);
  d = h(d, a, b, c, k[0], 11, -358537222);
  c = h(c, d, a, b, k[3], 16, -722521979);
  b = h(b, c, d, a, k[6], 23, 76029189);
  a = h(a, b, c, d, k[9], 4, -640364487);
  d = h(d, a, b, c, k[12], 11, -421815835);
  c = h(c, d, a, b, k[15], 16, 530742520);
  b = h(b, c, d, a, k[2], 23, -995338651);
  a = i(a, b, c, d, k[0], 6, -198630844);
  d = i(d, a, b, c, k[7], 10, 1126891415);
  c = i(c, d, a, b, k[14], 15, -1416354905);
  b = i(b, c, d, a, k[5], 21, -57434055);
  a = i(a, b, c, d, k[12], 6, 1700485571);
  d = i(d, a, b, c, k[3], 10, -1894986606);
  c = i(c, d, a, b, k[10], 15, -1051523);
  b = i(b, c, d, a, k[1], 21, -2054922799);
  a = i(a, b, c, d, k[8], 6, 1873313359);
  d = i(d, a, b, c, k[15], 10, -30611744);
  c = i(c, d, a, b, k[6], 15, -1560198380);
  b = i(b, c, d, a, k[13], 21, 1309151649);
  a = i(a, b, c, d, k[4], 6, -145523070);
  d = i(d, a, b, c, k[11], 10, -1120210379);
  c = i(c, d, a, b, k[2], 15, 718787259);
  b = i(b, c, d, a, k[9], 21, -343485551);
  x[0] = a + x[0] | 0;
  x[1] = b + x[1] | 0;
  x[2] = c + x[2] | 0;
  x[3] = d + x[3] | 0;
  return /* () */0;
}

var state = /* array */[
  1732584193,
  -271733879,
  -1732584194,
  271733878
];

var md5blk = /* array */[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

function caml_md5_string(s, start, len) {
  var s$1 = s.slice(start, len);
  var n = s$1.length;
  state[0] = 1732584193;
  state[1] = -271733879;
  state[2] = -1732584194;
  state[3] = 271733878;
  for(var i = 0; i <= 15; ++i){
    md5blk[i] = 0;
  }
  var i_end = n / 64 | 0;
  for(var i$1 = 1; i$1 <= i_end; ++i$1){
    for(var j = 0; j <= 15; ++j){
      var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
      md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
    }
    cycle(state, md5blk);
  }
  var s_tail = s$1.slice((i_end << 6));
  for(var kk = 0; kk <= 15; ++kk){
    md5blk[kk] = 0;
  }
  var i_end$1 = s_tail.length - 1 | 0;
  for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
    md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
  }
  var i$3 = i_end$1 + 1 | 0;
  md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
  if (i$3 > 55) {
    cycle(state, md5blk);
    for(var i$4 = 0; i$4 <= 15; ++i$4){
      md5blk[i$4] = 0;
    }
  }
  md5blk[14] = (n << 3);
  cycle(state, md5blk);
  return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
}


/* No side effect */

function string(str) {
  return caml_md5_string(str, 0, str.length);
}


/* No side effect */

/* No side effect */

function full_init(s, seed) {
  var combine = function (accu, x) {
    return string(accu + x);
  };
  var extract = function (d) {
    return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length ? seed : /* int array */[0];
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    caml_array_set(s[/* st */0], i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + max(55, l) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, caml_array_get(seed$1, k));
    caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
  }
  s[/* idx */1] = 0;
  return /* () */0;
}

function bits(s) {
  s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
  var curval = caml_array_get(s[/* st */0], s[/* idx */1]);
  var newval = caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
  var newval30 = newval & 1073741823;
  caml_array_set(s[/* st */0], s[/* idx */1], newval30);
  return newval30;
}

function $$int(s, bound) {
  if (bound > 1073741823 || bound <= 0) {
    throw [
          invalid_argument,
          "Random.int"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var r = bits(s$1);
      var v = r % n;
      if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
        continue ;
        
      } else {
        return v;
      }
    }
  }
}

var $$default = /* record */[
  /* st : array */[
    987910699,
    495797812,
    364182224,
    414272206,
    318284740,
    990407751,
    383018966,
    270373319,
    840823159,
    24560019,
    536292337,
    512266505,
    189156120,
    730249596,
    143776328,
    51606627,
    140166561,
    366354223,
    1003410265,
    700563762,
    981890670,
    913149062,
    526082594,
    1021425055,
    784300257,
    667753350,
    630144451,
    949649812,
    48546892,
    415514493,
    258888527,
    511570777,
    89983870,
    283659902,
    308386020,
    242688715,
    482270760,
    865188196,
    1027664170,
    207196989,
    193777847,
    619708188,
    671350186,
    149669678,
    257044018,
    87658204,
    558145612,
    183450813,
    28133145,
    901332182,
    710253903,
    510646120,
    652377910,
    409934019,
    801085050
  ],
  /* idx */0
];

function $$int$1(bound) {
  return $$int($$default, bound);
}

function full_init$1(seed) {
  return full_init($$default, seed);
}

function self_init() {
  return full_init$1(caml_sys_random_seed(/* () */0));
}


/* No side effect */

function null_to_opt(x) {
  if (x === null) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.0, PLEASE EDIT WITH CARE
function indexFor(param, board) {
  var col = param[1];
  var row = param[0];
  if (row < 0 || row >= board[/* height */1] || col < 0 || col >= board[/* width */0]) {
    return /* None */0;
  } else {
    return /* Some */[imul(row, board[/* width */0]) + col | 0];
  }
}

function getCell(coords, board) {
  var index = indexFor(coords, board);
  if (index) {
    return caml_array_get(board[/* cells */2], index[0]);
  } else {
    return 0;
  }
}

function setCell(value, coords, board) {
  var index = indexFor(coords, board);
  if (index) {
    return caml_array_set(board[/* cells */2], index[0], value);
  } else {
    return /* () */0;
  }
}

function livingNeighbors(param, board) {
  var col = param[1];
  var row = param[0];
  return ((((((getCell(/* tuple */[
                          row - 1 | 0,
                          col - 1 | 0
                        ], board) + getCell(/* tuple */[
                          row - 1 | 0,
                          col
                        ], board) | 0) + getCell(/* tuple */[
                        row - 1 | 0,
                        col + 1 | 0
                      ], board) | 0) + getCell(/* tuple */[
                      row,
                      col - 1 | 0
                    ], board) | 0) + getCell(/* tuple */[
                    row,
                    col + 1 | 0
                  ], board) | 0) + getCell(/* tuple */[
                  row + 1 | 0,
                  col - 1 | 0
                ], board) | 0) + getCell(/* tuple */[
                row + 1 | 0,
                col
              ], board) | 0) + getCell(/* tuple */[
              row + 1 | 0,
              col + 1 | 0
            ], board) | 0;
}

function conwayRule(cellValue, livingNeighbors) {
  var isAlive = +(cellValue === 1);
  if (isAlive) {
    if (livingNeighbors === 2 || livingNeighbors === 3) {
      return 1;
    } else {
      return 0;
    }
  } else if (livingNeighbors === 3) {
    return 1;
  } else {
    return 0;
  }
}

function tick(present, future, $staropt$star, _) {
  var rule = $staropt$star ? $staropt$star[0] : conwayRule;
  for(var r = 0 ,r_finish = future[/* height */1]; r <= r_finish; ++r){
    for(var c = 0 ,c_finish = future[/* width */0]; c <= c_finish; ++c){
      var coords = /* tuple */[
        r,
        c
      ];
      var nextCell = _2(rule, getCell(coords, present), livingNeighbors(coords, present));
      setCell(nextCell, coords, future);
    }
  }
  return /* () */0;
}

function make$3(param) {
  var h = param[1];
  var w = param[0];
  return /* record */[
          /* width */w,
          /* height */h,
          /* cells */caml_make_vect(imul(w, h), 0)
        ];
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.0, PLEASE EDIT WITH CARE
var random = self_init(/* () */0);

function map(f, param) {
  if (param) {
    return /* Some */[_1(f, param[0])];
  } else {
    return /* None */0;
  }
}

var cells = [/* [] */0];

function createTable(param) {
  var columns = param[1];
  var table = document.createElement("table");
  table.className = "board";
  for(var r = 0 ,r_finish = param[0] - 1 | 0; r <= r_finish; ++r){
    var tr = document.createElement("tr");
    for(var c = 0 ,c_finish = columns - 1 | 0; c <= c_finish; ++c){
      var td = document.createElement("td");
      cells[0] = /* :: */[
        td,
        cells[0]
      ];
      td.id = "" + (String(r) + ("-" + (String(c) + "")));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

var size = /* tuple */[
  40,
  60
];

var presentBoard = [make$3(size)];

var futureBoard = [make$3(size)];

var table = createTable(size);

var interval = [/* None */0];

var root = map((function (param) {
        param.appendChild(table);
        return /* () */0;
      }), null_to_opt(document.getElementById("root")));

function paint() {
  return iter((function (td) {
                var id = td.id;
                var coords = id.split("-");
                var cell = getCell(/* tuple */[
                      caml_int_of_string(caml_array_get(coords, 1)),
                      caml_int_of_string(caml_array_get(coords, 0))
                    ], presentBoard[0]);
                console.log(cell);
                if (cell) {
                  td.className = "alive";
                  return /* () */0;
                } else {
                  td.className = "dead";
                  return /* () */0;
                }
              }), cells[0]);
}

function step(rules) {
  if (rules) {
    tick(presentBoard[0], futureBoard[0], /* Some */[rules[0]], /* () */0);
  } else {
    tick(presentBoard[0], futureBoard[0], /* None */0, /* () */0);
  }
  var temp = presentBoard[0];
  presentBoard[0] = futureBoard[0];
  futureBoard[0] = temp;
  return paint(/* () */0);
}

function randomizeBoard() {
  return step(/* Some */[(function (_, _$1) {
                  return $$int$1(2);
                })]);
}

function play() {
  var match = interval[0];
  if (match) {
    clearInterval(match[0]);
    interval[0] = /* None */0;
    return /* () */0;
  } else {
    interval[0] = /* Some */[setInterval((function () {
              return step(/* None */0);
            }), 100)];
    return /* () */0;
  }
}

map((function (param) {
        param.addEventListener("click", randomizeBoard);
        return /* () */0;
      }), null_to_opt(document.getElementById("reset_btn")));

map((function (param) {
        param.addEventListener("click", play);
        return /* () */0;
      }), null_to_opt(document.getElementById("play_btn")));

var WebApi = 0;


/* random Not a pure module */

exports.WebApi = WebApi;
exports.random = random;
exports.map = map;
exports.cells = cells;
exports.createTable = createTable;
exports.size = size;
exports.presentBoard = presentBoard;
exports.futureBoard = futureBoard;
exports.table = table;
exports.interval = interval;
exports.root = root;
exports.paint = paint;
exports.step = step;
exports.randomizeBoard = randomizeBoard;
exports.play = play;

return exports;

}({}));
