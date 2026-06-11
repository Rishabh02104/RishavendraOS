uniform vec3 baseColor;
uniform vec3 wireColor;
uniform float time;
uniform float opacityPulse;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  // Normalized view normal
  vec3 normalVal = normalize(vNormal);

  // Fresnel effect (edge glow)
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normalVal, viewDir), 0.0), 3.0);
  vec3 glow = baseColor * fresnel * 2.5;

  // Scan line effect scrolling top to bottom based on time
  float scanLine = sin(vWorldPosition.y * 15.0 - time * 3.5) * 0.5 + 0.5;
  scanLine = pow(scanLine, 4.0); // Make scanline sharper

  // Compose holographic output
  vec3 finalColor = mix(baseColor, wireColor, 0.4) + glow + (baseColor * scanLine * 0.4);

  // Alpha pulse animation
  float alpha = mix(0.7, 1.0, opacityPulse) * (0.3 + fresnel * 0.7);

  gl_FragColor = vec4(finalColor, alpha);
}
