uniform float uTime;
varying vec2 vUv;

void main(){
  gl_FragColor.rgba=vec4(vUv,sin(uTime)*.5+.5,1.);
}
