import * as THREE from 'three'

export type CottageSceneController = {
  setHeroProgress: (value: number) => void
  setArchitectureProgress: (value: number) => void
  setMode: (mode: 'hero' | 'architecture' | 'hidden') => void
  resize: () => void
  dispose: () => void
}

const smoothstep = (min: number, max: number, value: number): number => {
  const x = THREE.MathUtils.clamp((value - min) / (max - min), 0, 1)
  return x * x * (3 - 2 * x)
}

const addEdges = (mesh: THREE.Mesh, color = 0x59675d, opacity = 0.34): THREE.LineSegments => {
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  )
  mesh.add(edges)
  return edges
}

const createTree = (scale: number): THREE.Group => {
  const tree = new THREE.Group()
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.12, 1.45, 8),
    new THREE.MeshStandardMaterial({ color: 0x58473a, roughness: 1 })
  )
  trunk.position.y = 0.72
  const crownMaterial = new THREE.MeshStandardMaterial({ color: 0x273c30, roughness: 0.94 })
  const lower = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.65, 10), crownMaterial)
  const upper = new THREE.Mesh(new THREE.ConeGeometry(0.54, 1.4, 10), crownMaterial)
  lower.position.y = 1.55
  upper.position.y = 2.38
  tree.add(trunk, lower, upper)
  tree.scale.setScalar(scale)
  return tree
}

const createTopographicLine = (radius: number, y: number, offset: number): THREE.LineLoop => {
  const points = Array.from({ length: 96 }, (_, index) => {
    const angle = (index / 96) * Math.PI * 2
    const variation = Math.sin(angle * 3 + offset) * 0.32 + Math.sin(angle * 7 - offset) * 0.11
    const distance = radius + variation
    return new THREE.Vector3(Math.cos(angle) * distance, y, Math.sin(angle) * distance * 0.72)
  })
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  return new THREE.LineLoop(
    geometry,
    new THREE.LineBasicMaterial({ color: 0xa8bd9a, transparent: true, opacity: 0.15 })
  )
}

export const createCottageScene = (
  canvas: HTMLCanvasElement,
  reducedMotion: boolean
): CottageSceneController => {
  const iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, reducedMotion || iOSDevice ? 1 : 1.35))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.08

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x101713, 0.028)

  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100)
  camera.position.set(10.2, 6.4, 11.8)

  const world = new THREE.Group()
  world.rotation.y = -0.48
  world.position.y = -1.25
  scene.add(world)

  const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xbeb9ab, roughness: 0.84, metalness: 0.02 })
  const darkStoneMaterial = new THREE.MeshStandardMaterial({ color: 0x2e3732, roughness: 0.9 })
  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x332a24, roughness: 0.76 })
  const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x161d19, roughness: 0.42, metalness: 0.68 })
  const warmMaterial = new THREE.MeshStandardMaterial({ color: 0xffd79a, emissive: 0xffa85f, emissiveIntensity: 1.4, roughness: 0.7 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x9eb6ab,
    roughness: 0.12,
    metalness: 0.04,
    transmission: 0.54,
    thickness: 0.3,
    transparent: true,
    opacity: 0.64
  })
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x55776a,
    roughness: 0.08,
    metalness: 0.12,
    transmission: 0.28,
    transparent: true,
    opacity: 0.64
  })

  const terrain = new THREE.Group()
  const island = new THREE.Mesh(new THREE.CylinderGeometry(8.4, 7.2, 0.62, 64), darkStoneMaterial)
  island.scale.z = 0.72
  island.receiveShadow = true
  terrain.add(island)

  const grass = new THREE.Mesh(
    new THREE.CylinderGeometry(8.25, 8.25, 0.12, 64),
    new THREE.MeshStandardMaterial({ color: 0x435744, roughness: 1 })
  )
  grass.position.y = 0.36
  grass.scale.z = 0.7
  grass.receiveShadow = true
  terrain.add(grass)

  for (let index = 0; index < 6; index += 1) {
    terrain.add(createTopographicLine(8.8 + index * 0.54, -0.27 - index * 0.04, index * 0.7))
  }

  const pathMaterial = new THREE.MeshStandardMaterial({ color: 0xafa99b, roughness: 0.95 })
  for (let index = 0; index < 8; index += 1) {
    const stone = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.54), pathMaterial)
    stone.position.set(-4.1 + index * 0.58, 0.47, 3.15 + Math.sin(index * 1.3) * 0.22)
    stone.rotation.y = -0.12 + Math.sin(index) * 0.08
    stone.receiveShadow = true
    terrain.add(stone)
  }

  const water = new THREE.Mesh(new THREE.CylinderGeometry(2.12, 2.12, 0.12, 48), waterMaterial)
  water.position.set(4.15, 0.48, 0.88)
  water.scale.z = 0.58
  terrain.add(water)

  const treePositions: Array<[number, number, number, number]> = [
    [-5.8, 0.35, -2.7, 1.25],
    [-6.8, 0.35, 0.2, 0.88],
    [-4.8, 0.35, 3.3, 0.72],
    [5.9, 0.35, -2.6, 1.04],
    [6.8, 0.35, 1.7, 0.72],
    [3.8, 0.35, -4.3, 0.78]
  ]
  treePositions.forEach(([x, y, z, scale]) => {
    const tree = createTree(scale)
    tree.position.set(x, y, z)
    tree.rotation.y = x * 0.3
    tree.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    terrain.add(tree)
  })
  world.add(terrain)

  const house = new THREE.Group()
  house.position.set(-0.35, 0.42, -0.18)
  world.add(house)

  const foundation = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.34, 4.2), stoneMaterial)
  foundation.position.y = 0.16
  foundation.castShadow = true
  foundation.receiveShadow = true
  addEdges(foundation)
  house.add(foundation)

  const deck = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.16, 1.72), woodMaterial)
  deck.position.set(0.4, 0.4, 2.52)
  deck.castShadow = true
  deck.receiveShadow = true
  house.add(deck)

  for (let index = 0; index < 12; index += 1) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.012, 1.64), metalMaterial)
    seam.position.set(-3.7 + index * 0.74, 0.49, 2.52)
    deck.add(seam)
  }

  const shell = new THREE.Group()
  house.add(shell)

  const rearWall = new THREE.Mesh(new THREE.BoxGeometry(7.15, 2.62, 0.22), stoneMaterial)
  rearWall.position.set(0, 1.75, -1.82)
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.62, 3.55), stoneMaterial)
  leftWall.position.set(-3.46, 1.75, 0)
  const serviceCore = new THREE.Mesh(new THREE.BoxGeometry(1.58, 2.62, 3.38), woodMaterial)
  serviceCore.position.set(2.56, 1.75, -0.02)
  shell.add(rearWall, leftWall, serviceCore)

  const glassFacade = new THREE.Group()
  for (let index = 0; index < 6; index += 1) {
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.98, 2.35, 0.06), glassMaterial)
    glass.position.set(-2.73 + index * 1.08, 1.74, 1.77)
    glass.castShadow = true
    glassFacade.add(glass)
    const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.055, 2.58, 0.08), metalMaterial)
    mullion.position.set(-3.27 + index * 1.08, 1.75, 1.8)
    glassFacade.add(mullion)
  }
  const lastMullion = new THREE.Mesh(new THREE.BoxGeometry(0.055, 2.58, 0.08), metalMaterial)
  lastMullion.position.set(3.21, 1.75, 1.8)
  glassFacade.add(lastMullion)
  shell.add(glassFacade)

  const interior = new THREE.Group()
  const floorGlow = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.05, 2.7), warmMaterial)
  floorGlow.material = warmMaterial.clone()
  ;(floorGlow.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.42
  floorGlow.position.set(-0.38, 0.56, -0.05)
  interior.add(floorGlow)

  const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.38, 0.72), new THREE.MeshStandardMaterial({ color: 0xaaa79d, roughness: 0.96 }))
  sofaBase.position.set(-1.52, 0.82, -0.72)
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.72, 0.2), sofaBase.material)
  sofaBack.position.set(-1.52, 1.15, -1.02)
  const table = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 32), woodMaterial)
  table.position.set(-0.65, 0.8, 0.42)
  interior.add(sofaBase, sofaBack, table)

  const kitchen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.88, 0.64), darkStoneMaterial)
  kitchen.position.set(1.42, 1.02, -1.18)
  interior.add(kitchen)

  const pendant = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), warmMaterial)
  pendant.position.set(-0.4, 2.46, 0)
  const pendantWire = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.75, 6), metalMaterial)
  pendantWire.position.set(-0.4, 2.82, 0)
  interior.add(pendant, pendantWire)
  shell.add(interior)

  const roof = new THREE.Group()
  const roofLeft = new THREE.Mesh(new THREE.BoxGeometry(4.25, 0.18, 4.28), metalMaterial)
  roofLeft.rotation.z = -0.48
  roofLeft.position.set(-1.82, 3.56, 0)
  const roofRight = new THREE.Mesh(new THREE.BoxGeometry(4.25, 0.18, 4.28), metalMaterial)
  roofRight.rotation.z = 0.48
  roofRight.position.set(1.82, 3.56, 0)
  roofLeft.castShadow = true
  roofRight.castShadow = true
  roof.add(roofLeft, roofRight)
  house.add(roof)

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.44, 1.4, 0.55), darkStoneMaterial)
  chimney.position.set(2.22, 4.07, -0.62)
  house.add(chimney)

  const pergola = new THREE.Group()
  for (let index = 0; index < 5; index += 1) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.65), metalMaterial)
    beam.position.set(-3.18 + index * 0.8, 2.62, 2.48)
    pergola.add(beam)
  }
  const pergolaFront = new THREE.Mesh(new THREE.BoxGeometry(3.35, 0.09, 0.09), metalMaterial)
  pergolaFront.position.set(-1.58, 2.62, 3.28)
  pergola.add(pergolaFront)
  house.add(pergola)

  house.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true
      object.receiveShadow = true
    }
  })

  const dustGeometry = new THREE.BufferGeometry()
  const dustPositions = new Float32Array(90 * 3)
  for (let index = 0; index < 90; index += 1) {
    dustPositions[index * 3] = (Math.random() - 0.5) * 24
    dustPositions[index * 3 + 1] = Math.random() * 9
    dustPositions[index * 3 + 2] = (Math.random() - 0.5) * 18
  }
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
  const dust = new THREE.Points(
    dustGeometry,
    new THREE.PointsMaterial({ color: 0xd8ff75, size: 0.025, transparent: true, opacity: 0.38, depthWrite: false })
  )
  scene.add(dust)

  const hemisphere = new THREE.HemisphereLight(0xd9e7dd, 0x172019, 2.2)
  scene.add(hemisphere)

  const sun = new THREE.DirectionalLight(0xfff0d6, 4.4)
  sun.position.set(-7, 11, 7)
  sun.castShadow = true
  sun.shadow.mapSize.set(iOSDevice ? 512 : 1024, iOSDevice ? 512 : 1024)
  sun.shadow.camera.left = -12
  sun.shadow.camera.right = 12
  sun.shadow.camera.top = 12
  sun.shadow.camera.bottom = -12
  sun.shadow.bias = -0.0003
  scene.add(sun)

  const interiorLight = new THREE.PointLight(0xffb35f, 23, 12, 2)
  interiorLight.position.set(-0.5, 2.4, 0.9)
  scene.add(interiorLight)

  const rim = new THREE.PointLight(0xd8ff75, 18, 18, 2)
  rim.position.set(7, 4, -6)
  scene.add(rim)

  let mode: 'hero' | 'architecture' | 'hidden' = 'hero'
  let heroProgress = 0
  let architectureProgress = 0
  let currentProgress = 0
  let frame: number | null = null
  let disposed = false
  const pointer = new THREE.Vector2()
  const targetPointer = new THREE.Vector2()
  const clock = new THREE.Clock()

  const resize = (): void => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 720 || reducedMotion || iOSDevice ? 1 : 1.35))
  }

  const onPointerMove = (event: PointerEvent): void => {
    targetPointer.set((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2)
  }

  const render = (): void => {
    if (disposed) return
    const elapsed = clock.getElapsedTime()
    pointer.lerp(targetPointer, 0.045)
    const targetProgress = mode === 'architecture' ? architectureProgress : heroProgress * 0.16
    currentProgress = THREE.MathUtils.lerp(currentProgress, targetProgress, reducedMotion ? 0.18 : 0.055)

    const terrainDrop = smoothstep(0.04, 0.28, currentProgress) * 0.72
    const shellSpread = smoothstep(0.23, 0.6, currentProgress)
    const roofLift = smoothstep(0.14, 0.5, currentProgress) * 2.85
    const facadeShift = smoothstep(0.42, 0.72, currentProgress) * 1.5
    const interiorLift = smoothstep(0.62, 0.92, currentProgress) * 1.05
    terrain.position.y = -terrainDrop
    foundation.position.y = 0.16 + shellSpread * 0.32
    rearWall.position.z = -1.82 - shellSpread * 0.72
    leftWall.position.x = -3.46 - shellSpread * 0.72
    serviceCore.position.x = 2.56 + shellSpread * 0.82
    deck.position.z = 2.52 + smoothstep(0.5, 0.82, currentProgress) * 0.72
    roof.position.y = roofLift
    chimney.position.y = 4.07 + roofLift * 0.86
    glassFacade.position.z = facadeShift
    pergola.position.z = facadeShift * 0.62
    interior.position.y = interiorLift
    interiorLight.position.y = 2.4 + interiorLift

    const idle = reducedMotion ? 0 : Math.sin(elapsed * 0.24) * 0.026
    const targetWorldX = mode === 'architecture' ? -2.85 : 2.6
    world.position.x = THREE.MathUtils.lerp(world.position.x, targetWorldX, 0.045)
    world.rotation.y = -0.48 + currentProgress * 0.62 + pointer.x * 0.16 + idle
    world.rotation.x = pointer.y * 0.055
    dust.rotation.y = elapsed * 0.012

    const mobile = window.innerWidth < 760
    const architectureX = mobile ? 11.8 : 9.3
    const architectureY = mobile ? 8.5 : 6.7
    const architectureZ = mobile ? 14.8 : 10.6
    const targetX = mode === 'architecture' ? architectureX - currentProgress * 2.1 : mobile ? 12.8 : 10.2
    const targetY = mode === 'architecture' ? architectureY - currentProgress * 1.45 : mobile ? 7.6 : 6.4
    const targetZ = mode === 'architecture' ? architectureZ - currentProgress * 1.8 : mobile ? 15.4 : 11.8
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + pointer.x * 0.52, 0.045)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY - pointer.y * 0.32, 0.045)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.045)
    camera.lookAt(pointer.x * 0.22, 1.12 + currentProgress * 0.58 - pointer.y * 0.12, 0)

    renderer.render(scene, camera)
    frame = mode === 'hidden' ? null : requestAnimationFrame(render)
  }

  const start = (): void => {
    if (frame === null && !disposed && !document.hidden) frame = requestAnimationFrame(render)
  }

  const onVisibilityChange = (): void => {
    if (document.hidden && frame !== null) {
      cancelAnimationFrame(frame)
      frame = null
    } else if (mode !== 'hidden') {
      start()
    }
  }

  resize()
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVisibilityChange)
  if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true })
  start()

  return {
    setHeroProgress: (value) => {
      heroProgress = THREE.MathUtils.clamp(value, 0, 1)
    },
    setArchitectureProgress: (value) => {
      architectureProgress = THREE.MathUtils.clamp(value, 0, 1)
    },
    setMode: (value) => {
      mode = value
      canvas.dataset.mode = value
      if (value !== 'hidden') start()
    },
    resize,
    dispose: () => {
      disposed = true
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pointermove', onPointerMove)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
    }
  }
}
