varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

#define GRIDSIZE 20.
#define DOTSIZE 2.

#define DARK 1

#ifdef DARK
vec3 bg=vec3(0.,0.,0.);
vec3 dotColour=vec3(.22,.22,.22);
vec3 mouseColor=vec3(.8706,0.,.898);
#else
vec3 bg=vec3(1.,1.,1.);
vec3 dotColour=vec3(.8314,.8314,.8314);
vec3 mouseColor=vec3(.9333,0.,1.);
#endif

float barrelPower=4.;

float circle(in vec2 _st,in float _radius){
  vec2 l=_st-vec2(.5);
  return 1.-smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(l,l)*4.);
}

// float circle(vec2 p,float r){
  //   return length(p)-r;
// }

float smooth_circle(vec2 position,float radius){
  vec2 d=position-vec2(.5);
  return 1.-smoothstep(0.,radius*radius,dot(d,d));
}

float grid(vec2 st,float res){
  vec2 grid=fract(st*res);
  return 1.-(step(res,grid.x)*step(res,grid.y));
}

float dotGrid(vec2 st,float res){
  vec2 dotsAt=st+.5;
  dotsAt*=5.;
  vec2 dotsAtF=fract(dotsAt);
  return circle(dotsAtF,.1);
}

vec2 distort(vec2 p){
  float theta=atan(p.y,p.x);
  float radius=length(p);
  radius=pow(radius,barrelPower);
  p.x=radius*cos(theta);
  p.y=radius*sin(theta);
  return.5*(p+1.);
}

void main(){
  vec2 uv=vUv;
  // uv.x*=uResolution.x/uResolution.y;
  
  vec3 color=vec3(0.);
  vec2 mouse=(uMouse*.5+.5);
  
  // uv=distort(uv);
  
  // uv*=4.;
  
  // vec2 gridUv=((uv-vec2(.5))*500.);
  // color=vec3(0)+grid(gridUv,.05);
  
  // uv*=50.;
  // uv=fract(uv);
  // float size=GRIDSIZE/uResolution.y;
  vec2 size=vec2(uResolution.x/GRIDSIZE,uResolution.y/GRIDSIZE);
  vec2 gridUv=fract(uv*size);
  color=vec3(gridUv,0.);
  
  // color*=dotColour;
  // vec3 dotMask=bg-(vec3(circle(uv,.1))*(1.-dotColour));
  
  // float dotSize=max(.02,min(.1,distance(vUv,mouse)));
  float dotSize=(DOTSIZE/uResolution.x)*size.x;
  dotSize*=.1;
  
  vec3 dotMask=vec3(circle(gridUv,dotSize));
  color=dotMask;
  
  float mouseRadius=.25;
  vec2 mouseUv=uv*2.-1.;
  // color=vec3(mouseUv,0.);
  mouseUv.x*=uResolution.x/uResolution.y;
  mouseUv=mouseUv*.5+.5;
  
  vec3 mouseMask=vec3(smooth_circle(mouseUv-(mouse-vec2(.5)),mouseRadius));
  // color=mouseMask;
  
  // vec3 c=(.9*vec3(vUv,1.)*(1.-dotMask));
  // vec3 c=(.9*vec3(vUv,1.));
  vec3 c=1.*mouseColor;
  // color=c;
  
  color=dotMask*c;
  color=mouseMask*c*dotMask;
  
  color=bg-(dotMask*(bg-dotColour));
  color+=mouseMask*(c-dotColour)*dotMask;
  
  // color*=(circle(vUv,length(vUv-mouseUv))+.8);
  
  // vec2 testUv=vUv*vec2(uResolution.x/GRIDSIZE,uResolution.y/GRIDSIZE);
  // color=vec3(fract(testUv),1.);
  
  gl_FragColor=vec4(color,1.);
}
