export const HOLOGRAPHIC_VERTEX = `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
uniform float pointSize;

void main() {
  vec3 objectNormal = normal;
  vec3 transformedNormal = normalMatrix * objectNormal;
  vNormal = normalize(transformedNormal);

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = pointSize * (300.0 / -mvPosition.z);
}
`;

export const HOLOGRAPHIC_FRAGMENT = `
uniform vec3 baseColor;
uniform vec3 wireColor;
uniform float time;
uniform float opacityPulse;
uniform float emissiveIntensity;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  vec3 normalVal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  // Fresnel edge glow
  float fresnel = pow(1.0 - max(dot(normalVal, viewDir), 0.0), 3.0);
  vec3 glow = baseColor * fresnel * 2.5 * emissiveIntensity;

  // Scan line animation
  float scanLine = sin(vWorldPosition.y * 15.0 - time * 3.5) * 0.5 + 0.5;
  scanLine = pow(scanLine, 4.0);

  // Hologram compose
  vec3 finalColor = mix(baseColor, wireColor, 0.4) + glow + (baseColor * scanLine * 0.4);

  // Pulsing alpha
  float alpha = mix(0.7, 1.0, opacityPulse) * (0.3 + fresnel * 0.7);

  gl_FragColor = vec4(finalColor, alpha * uOpacity);
}
`;
