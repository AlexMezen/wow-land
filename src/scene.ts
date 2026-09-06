import * as THREE from 'three'

export type InteriorSceneController = {
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

export const createInteriorScene = (
  canvas: HTMLCanvasElement,
  reducedMotion: boolean
): InteriorSceneController => {
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

  const plasterMaterial = new THREE.MeshStandardMaterial({ color: 0xbeb9ab, roughness: 0.84, metalness: 0.02 })
  const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x2e3732, roughness: 0.9 })
  const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x332a24, roughness: 0.76 })
  const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x161d19, roughness: 0.42, metalness: 0.68 })
  const warmMaterial = new THREE.MeshStandardMaterial({ color: 0xffd79a, emissive: 0xffa85f, emissiveIntensity: 1.4, roughness: 0.7 })
  const fabricMaterial = new THREE.MeshStandardMaterial({ color: 0xaaa79d, roughness: 0.96 })
  const accentMaterial = new THREE.MeshStandardMaterial({ color: 0x43584a, roughness: 0.62 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x9eb6ab,
    roughness: 0.12,
    metalness: 0.04,
    transmission: 0.54,
    thickness: 0.3,
    transparent: true,
    opacity: 0.64
  })

  const plinth = new THREE.Group()
  const base = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.42, 5.6), darkMaterial)
  base.position.y = -0.21
  base.receiveShadow = true
  plinth.add(base)

  const plinthTop = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.1, 5.3), new THREE.MeshStandardMaterial({ color: 0x39443c, roughness: 1 }))
  plinthTop.position.y = 0.05
  plinthTop.receiveShadow = true
  plinth.add(plinthTop)

  for (let index = 0; index < 5; index += 1) {
    const guide = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.02, 0.03), metalMaterial)
    guide.position.set(0, 0.11, -2.0 + index * 1.0)
    plinth.add(guide)
  }
  world.add(plinth)

  const apartment = new THREE.Group()
  apartment.position.set(-0.35, 0.1, -0.18)
  world.add(apartment)

  const floorSlab = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.22, 4.2), woodMaterial)
  floorSlab.position.y = 0.11
  floorSlab.castShadow = true
  floorSlab.receiveShadow = true
  addEdges(floorSlab)
  apartment.add(floorSlab)

  for (let index = 0; index < 10; index += 1) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.012, 4.0), metalMaterial)
    plank.position.set(-3.3 + index * 0.74, 0.115, 0)
    floorSlab.add(plank)
  }

  const shell = new THREE.Group()
  apartment.add(shell)

  const rearWall = new THREE.Mesh(new THREE.BoxGeometry(7.15, 2.62, 0.22), plasterMaterial)
  rearWall.position.set(0, 1.75, -1.82)
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.62, 3.55), plasterMaterial)
  leftWall.position.set(-3.46, 1.75, 0)
  const utilityCore = new THREE.Mesh(new THREE.BoxGeometry(1.58, 2.62, 3.38), woodMaterial)
  utilityCore.position.set(2.56, 1.75, -0.02)
  shell.add(rearWall, leftWall, utilityCore)

  const windowUnit = new THREE.Group()
  const sill = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 1.9), plasterMaterial)
  sill.position.set(0, -0.75, 0)
  const header = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.52, 1.9), plasterMaterial)
  header.position.set(0, 0.64, 0)
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.66, 1.72), glassMaterial)
  glass.position.set(0.165, 0.11, 0)
  glass.castShadow = true
  windowUnit.add(sill, header, glass)
  for (let index = 0; index < 3; index += 1) {
    const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.78, 0.07), metalMaterial)
    mullion.position.set(0.165, 0.11, -0.82 + index * 0.82)
    windowUnit.add(mullion)
  }
  leftWall.add(windowUnit)

  const interior = new THREE.Group()
  const floorGlow = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.05, 2.7), warmMaterial)
  floorGlow.material = warmMaterial.clone()
  ;(floorGlow.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.42
  floorGlow.position.set(-0.38, 0.56, -0.05)
  interior.add(floorGlow)

  const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.38, 0.72), fabricMaterial)
  sofaBase.position.set(-1.52, 0.82, -0.72)
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.72, 0.2), fabricMaterial)
  sofaBack.position.set(-1.52, 1.15, -1.02)
  const table = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.12, 32), woodMaterial)
  table.position.set(-0.65, 0.8, 0.42)
  interior.add(sofaBase, sofaBack, table)

  const kitchen = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.88, 0.64), darkMaterial)
  kitchen.position.set(1.42, 1.02, -1.18)
  const kitchenTop = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.06, 0.68), accentMaterial)
  kitchenTop.position.set(1.42, 1.48, -1.18)
  interior.add(kitchen, kitchenTop)

  const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.9, 1.4), woodMaterial)
  wardrobe.position.set(-2.9, 1.53, 1.0)
  interior.add(wardrobe)

  const pendant = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), warmMaterial)
  pendant.position.set(-0.4, 2.46, 0)
  const pendantWire = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.75, 6), metalMaterial)
  pendantWire.position.set(-0.4, 2.82, 0)
  interior.add(pendant, pendantWire)
  shell.add(interior)

  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.18, 4.2), plasterMaterial)
  ceiling.position.set(0, 3.28, 0)
  ceiling.castShadow = true
  ceiling.receiveShadow = true
  addEdges(ceiling)
  apartment.add(ceiling)

  apartment.traverse((object) => {
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
    new THREE.PointsMaterial({ color: 0xd9bc6e, size: 0.025, transparent: true, opacity: 0.38, depthWrite: false })
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

  const rim = new THREE.PointLight(0xd9bc6e, 18, 18, 2)
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

    const plinthDrop = smoothstep(0.04, 0.28, currentProgress) * 0.72
    const shellSpread = smoothstep(0.23, 0.6, currentProgress)
    const ceilingLift = smoothstep(0.14, 0.5, currentProgress) * 2.85
    const windowShift = smoothstep(0.42, 0.72, currentProgress) * 1.5
    const interiorLift = smoothstep(0.62, 0.92, currentProgress) * 1.05
    plinth.position.y = -plinthDrop
    floorSlab.position.y = 0.11 + shellSpread * 0.32
    rearWall.position.z = -1.82 - shellSpread * 0.72
    leftWall.position.x = -3.46 - shellSpread * 0.72
    utilityCore.position.x = 2.56 + shellSpread * 0.82
    windowUnit.position.x = -windowShift
    ceiling.position.y = 3.28 + ceilingLift
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
