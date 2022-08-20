varying vec2 vUv;

uniform float uTime;
uniform vec2 uMouse;

vec3 bg=vec3(1.,1.,1.);
vec3 dotColour=vec3(.85,.85,.85);

float circle(in vec2 _st,in float _radius){
  vec2 l=_st-vec2(.5);
  return 1.-smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(l,l)*4.);
}

float smooth_circle(vec2 position,float radius){
  vec2 d=position-vec2(.5);
  return 1.-smoothstep(0.,radius*radius,dot(d,d));
}

void main(){
  vec2 uv=vUv;
  vec3 color=vec3(0.);
  vec2 mouse=uMouse*.5+.5;
  
  uv*=vec2(80.,90.);
  
  uv=fract(uv);
  
  // color*=dotColour;
  // vec3 dotMask=bg-(vec3(circle(uv,.1))*(1.-dotColour));
  
  // float dotSize=max(.02,min(.1,distance(vUv,mouse)));
  float dotSize=.04;
  
  vec3 dotMask=vec3(circle(uv,dotSize));
  color=dotMask;
  
  // vec2 mouse=vec2(.5,.5);
  // vec3 mouseMask=vec3(min(.7,1.-pow(distance(vUv,mouse),.1)));
  
  float mouseRadius=.25;
  vec3 mouseMask=vec3(smooth_circle(vUv-(mouse-vec2(.5)),mouseRadius))*dotMask;
  color=mouseMask;
  
  vec3 c=vec3(vUv,1.)-dotColour;
  
  color=bg-(dotMask*(bg-dotColour));
  color+=mouseMask*c;
  
  // color*=(circle(vUv,length(vUv-mouse))+.8);
  
  gl_FragColor=vec4(color,1.);
}
