uniform float uTime;
varying vec2 vUv;

uniform vec2 uResolution;

#define R uResolution.xy

float Cir(vec2 uv,float r,bool blur){
  float a=blur?.01:0.;
  float b=blur?.08:5./R.y;
  return smoothstep(a,b,length(uv)-r);
}

void main(){
  vec2 uv=vUv-.5*R.xy/R.y;
  vec2 t=vec2(sin(uTime*1.),cos(uTime*1.+cos(uTime*.2)))*.05;
  
  vec3 Col0=vec3(1.);
  vec3 Col1=vec3(.1+uv.y*2.,.4+uv.x*-1.1,.8)*1.;
  vec3 Col2=vec3(1.);
  
  float cir1=Cir(uv,.2,false);
  float cir2=Cir(uv+t,.2,false);
  float cir2B=Cir(uv+t,.15,true);
  
  vec3 col=mix(Col1+vec3(.3,.1,1.),Col2,cir2B);
  col=mix(col,Col0,cir1);
  col=mix(col,Col1,clamp(cir1-cir2,.6,1.));
  
  gl_FragColor=vec4(col,1.);
  
  // gl_FragColor.rgba=vec4(vUv,sin(uTime)*.5+.5,1.);
}
