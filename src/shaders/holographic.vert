varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
  vec3 objectNormal = normal;
  vec3 transformedNormal = normalMatrix * objectNormal;
  vNormal = normalize(transformedNormal);

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  gl_Position = projectionMatrix * mvPosition;
}
