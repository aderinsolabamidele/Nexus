import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";

const CAT_COLORS = {
  ALL: "#22d3ee",
  SEARCH: "#3b82f6",
  MUSIC: "#ec4899",
  MARKETS: "#10b981",
  CRYPTO: "#f59e0b",
  VIRAL: "#ef4444",
  GAMING: "#8b5cf6",
  SOCIAL: "#06b6d4",
  NEWS: "#fbbf24",
  ONLINE: "#14b8a6",
};

const CAT_LABELS = {
  SEARCH: "Search",
  MUSIC: "Music",
  MARKETS: "Markets",
  CRYPTO: "Crypto",
  VIRAL: "Viral",
  GAMING: "Gaming",
  SOCIAL: "Social",
  NEWS: "News",
  ONLINE: "Online",
  ALL: "Activity",
};

function latLngToVec3(lat, lng, radius = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function makeGlowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.85)");
  g.addColorStop(0.55, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function makeRingTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(64, 64, 52, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(64, 64, 40, 0, Math.PI * 2);
  ctx.stroke();
  return new THREE.CanvasTexture(c);
}

// category glyph textures (white on transparent; tinted by sprite material color)
function makeIconTexture(category) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const draw = {
    SEARCH: () => {
      ctx.beginPath();
      ctx.arc(26, 26, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(37, 37);
      ctx.lineTo(52, 52);
      ctx.stroke();
    },
    MUSIC: () => {
      ctx.beginPath();
      ctx.ellipse(24, 44, 9, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(32, 44);
      ctx.lineTo(32, 18);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(32, 18);
      ctx.quadraticCurveTo(46, 22, 42, 34);
      ctx.stroke();
    },
    MARKETS_UP: () => {
      ctx.beginPath();
      ctx.moveTo(32, 12);
      ctx.lineTo(52, 46);
      ctx.lineTo(12, 46);
      ctx.closePath();
      ctx.fill();
    },
    MARKETS_DOWN: () => {
      ctx.beginPath();
      ctx.moveTo(32, 52);
      ctx.lineTo(12, 18);
      ctx.lineTo(52, 18);
      ctx.closePath();
      ctx.fill();
    },
    CRYPTO: () => {
      ctx.beginPath();
      ctx.moveTo(32, 10);
      ctx.lineTo(54, 32);
      ctx.lineTo(32, 54);
      ctx.lineTo(10, 32);
      ctx.closePath();
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(32, 20);
      ctx.lineTo(32, 44);
      ctx.moveTo(20, 32);
      ctx.lineTo(44, 32);
      ctx.stroke();
    },
    VIRAL: () => {
      ctx.lineWidth = 4;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(32 + Math.cos(a) * 12, 32 + Math.sin(a) * 12);
        ctx.lineTo(32 + Math.cos(a) * 24, 32 + Math.sin(a) * 24);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(32, 32, 6, 0, Math.PI * 2);
      ctx.fill();
    },
    GAMING: () => {
      ctx.beginPath();
      ctx.roundRect(10, 20, 44, 28, 10);
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(24, 34, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(40, 34, 3, 0, Math.PI * 2);
      ctx.fill();
    },
    SOCIAL: () => {
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(18, 20);
      ctx.lineTo(46, 32);
      ctx.moveTo(46, 32);
      ctx.lineTo(22, 46);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(18, 20, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(46, 32, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(22, 46, 6, 0, Math.PI * 2);
      ctx.fill();
    },
    NEWS: () => {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(32, 44, 8, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(32, 44, 16, -Math.PI * 0.8, -Math.PI * 0.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(32, 44, 24, -Math.PI * 0.85, -Math.PI * 0.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(32, 44, 3, 0, Math.PI * 2);
      ctx.fill();
    },
    ALL: () => {
      ctx.beginPath();
      ctx.arc(32, 32, 8, 0, Math.PI * 2);
      ctx.fill();
    },
  };
  (draw[category] || draw.ALL)();
  return new THREE.CanvasTexture(c);
}

function makeLabelTexture(text) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const ctx = c.getContext("2d");
  ctx.font = "600 22px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(34,211,238,0.9)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#fff";
  ctx.fillText(text, 128, 32);
  return new THREE.CanvasTexture(c);
}

function heatColor(v) {
  const t = Math.max(0, Math.min(1, v / 100));
  const c = new THREE.Color();
  if (t < 0.4) c.lerpColors(new THREE.Color(0x1e3a8a), new THREE.Color(0x22d3ee), t / 0.4);
  else if (t < 0.7) c.lerpColors(new THREE.Color(0x22d3ee), new THREE.Color(0xfbbf24), (t - 0.4) / 0.3);
  else c.lerpColors(new THREE.Color(0xfbbf24), new THREE.Color(0xef4444), (t - 0.7) / 0.3);
  return c;
}

// Build an equirectangular earth texture from Natural Earth country polygons.
// Land = subtle blue/gray, borders = thin blue outline, ocean = near-black.
async function buildEarthTexture() {
  const url =
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  // ocean base
  const ocean = ctx.createLinearGradient(0, 0, 0, h);
  ocean.addColorStop(0, "#05080d");
  ocean.addColorStop(0.5, "#04060a");
  ocean.addColorStop(1, "#05080d");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, w, h);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("geo fetch failed");
    const geo = await res.json();
    const features = geo.features || [];
    ctx.fillStyle = "#0b1a28"; // land
    ctx.strokeStyle = "#1c4a6b"; // borders
    ctx.lineWidth = 1.1;
    features.forEach((f) => {
      const geom = f.geometry;
      if (!geom) return;
      let polys = [];
      if (geom.type === "Polygon") polys = [geom.coordinates];
      else if (geom.type === "MultiPolygon") polys = geom.coordinates;
      polys.forEach((rings) => {
        rings.forEach((ring, ri) => {
          ctx.beginPath();
          ring.forEach((c, i) => {
            const [lng, lat] = c;
            const x = ((lng + 180) / 360) * w;
            const y = ((90 - lat) / 180) * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.closePath();
          if (ri === 0) ctx.fill();
          ctx.stroke();
        });
      });
    });
  } catch (e) {
    // fallback: no continents, keep dark ocean + grid
    console.warn("NEXUS: earth texture unavailable", e);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const NexusGlobe = forwardRef(function NexusGlobe(
  {
    markers = [],
    arcs = [],
    activeCategory = "ALL",
    onSelectMarker,
    connectionLineRef,
    connectionAnchor = { xPct: 0.24, yPct: 0.72 },
  },
  ref
) {
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);
  const stateRef = useRef({});

  const dataRef = useRef({ markers, arcs, activeCategory, onSelectMarker, connectionLineRef, connectionAnchor });
  dataRef.current = { markers, arcs, activeCategory, onSelectMarker, connectionLineRef, connectionAnchor };

  useImperativeHandle(ref, () => ({
    focus(lat, lng, zoom = 2.6, lock = true) {
      const s = stateRef.current;
      if (!s.ready) return;
      const p = latLngToVec3(lat, lng, 1);
      const py = p.y,
        pz = p.z,
        px = p.x;
      const zPrime = Math.sqrt(py * py + pz * pz);
      let pitch = Math.atan2(py, zPrime > 0.0001 ? pz : 0.0001);
      let yaw = Math.atan2(-px, zPrime);
      pitch = Math.max(-1.1, Math.min(1.1, pitch));
      s.targetYaw = yaw;
      s.targetPitch = pitch;
      s.targetZoom = Math.max(s.minZoom, Math.min(s.maxZoom, zoom));
      s.focusing = true;
      s.locked = lock;
      s.idleTimer = 0;
    },
    highlight(lat, lng) {
      const s = stateRef.current;
      if (!s.ready) return;
      this.focus(lat, lng, 3.0, false);
      s.highlight = { lat, lng, start: performance.now(), active: true };
    },
    reset() {
      const s = stateRef.current;
      s.targetYaw = 0;
      s.targetPitch = 0;
      s.targetZoom = s.defaultZoom;
      s.focusing = false;
      s.locked = false;
      s.highlight = null;
    },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const defaultZoom = 4.2;
    const minZoom = 2.2;
    const maxZoom = 7;
    camera.position.set(0, 0, defaultZoom);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);
    root.rotation.order = "YXZ";

    // ---- globe sphere ----
    const globeGeo = new THREE.SphereGeometry(1, 96, 96);
    const globeMat = new THREE.MeshBasicMaterial({ color: 0x05080d });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    root.add(globe);

    // load earth texture (continents + borders)
    buildEarthTexture().then((tex) => {
      globeMat.map = tex;
      globeMat.color = new THREE.Color(0xffffff);
      globeMat.needsUpdate = true;
    });

    // faint wireframe overlay for tech feel
    const wireGeo = new THREE.SphereGeometry(1.001, 48, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0c2740,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    root.add(new THREE.Mesh(wireGeo, wireMat));

    // lat / lng graticule (subtle)
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x123247,
      transparent: true,
      opacity: 0.14,
    });
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let lng = 0; lng <= 360; lng += 6) pts.push(latLngToVec3(lat, lng - 180, 1.003));
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    for (let lng = 0; lng < 360; lng += 15) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 6) pts.push(latLngToVec3(lat, lng - 180, 1.003));
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // ---- atmosphere (thin glow) ----
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.18, 0.78, 0.92, 1.0) * intensity;
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmoMesh = new THREE.Mesh(new THREE.SphereGeometry(1.16, 48, 48), atmoMat);
    root.add(atmoMesh);

    // ---- markers ----
    const glowTex = makeGlowTexture();
    const ringTex = makeRingTexture();
    const iconTextures = {
      SEARCH: makeIconTexture("SEARCH"),
      MUSIC: makeIconTexture("MUSIC"),
      MARKETS_UP: makeIconTexture("MARKETS_UP"),
      MARKETS_DOWN: makeIconTexture("MARKETS_DOWN"),
      CRYPTO: makeIconTexture("CRYPTO"),
      VIRAL: makeIconTexture("VIRAL"),
      GAMING: makeIconTexture("GAMING"),
      SOCIAL: makeIconTexture("SOCIAL"),
      NEWS: makeIconTexture("NEWS"),
      ALL: makeIconTexture("ALL"),
    };
    const markerGroup = new THREE.Group();
    root.add(markerGroup);
    const markerSprites = [];
    const markerObjects = [];

    function buildMarkers() {
      while (markerGroup.children.length) {
        const g = markerGroup.children.pop();
        g.traverse((o) => {
          o.material?.dispose?.();
        });
      }
      markerSprites.length = 0;
      markerObjects.length = 0;
      const { markers } = dataRef.current;
      markers.forEach((mk) => {
        const color = new THREE.Color(CAT_COLORS[mk.category] || CAT_COLORS.ALL);
        const group = new THREE.Group();
        group.position.copy(latLngToVec3(mk.lat, mk.lng, 1.02));
        const base = 0.06 + (mk.intensity / 100) * 0.06;
        const isHeat = mk.category === "ONLINE";

        // glow (interactive + raycast target)
        const glowMat = new THREE.SpriteMaterial({
          map: glowTex,
          color: isHeat ? heatColor(mk.intensity) : color,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
          opacity: isHeat ? 0.5 : 1,
        });
        const glow = new THREE.Sprite(glowMat);
        const gScale = isHeat ? base * 2.4 : base;
        glow.scale.set(gScale, gScale, gScale);
        glow.userData = { marker: mk, baseScale: gScale, phase: Math.random() * Math.PI * 2, isHeat };
        group.add(glow);
        markerSprites.push(glow);

        // category glyph (skip heat blobs)
        if (!isHeat) {
          const iconTex =
            mk.category === "MARKETS"
              ? mk.change % 2 === 0
                ? iconTextures.MARKETS_UP
                : iconTextures.MARKETS_DOWN
              : iconTextures[mk.category] || iconTextures.ALL;
          const iconMat = new THREE.SpriteMaterial({
            map: iconTex,
            color,
            transparent: true,
            depthWrite: false,
            opacity: 0.95,
          });
          const icon = new THREE.Sprite(iconMat);
          const iScale = base * 1.5;
          icon.scale.set(iScale, iScale, iScale);
          group.add(icon);
          group.userData.icon = icon;
        }

        // viral expanding pulse ring
        if (mk.category === "VIRAL") {
          const rMat = new THREE.SpriteMaterial({
            map: ringTex,
            color,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            opacity: 0,
          });
          const ring = new THREE.Sprite(rMat);
          ring.scale.set(base, base, base);
          ring.userData = { t: Math.random(), active: false };
          group.add(ring);
          group.userData.ring = ring;
          group.userData.ringBase = base;
        }

        // search spike label
        if (mk.category === "SEARCH") {
          const labelTex = makeLabelTexture(`SEARCH SPIKE +${mk.change}%`);
          const lMat = new THREE.SpriteMaterial({ map: labelTex, transparent: true, depthWrite: false, opacity: 0 });
          const label = new THREE.Sprite(lMat);
          label.scale.set(base * 4.2, base * 1.05, 1);
          label.position.y = base * 2.0;
          group.add(label);
          group.userData.label = label;
        }

        group.userData.marker = mk;
        group.userData.baseScale = base;
        group.userData.glow = glow;
        markerGroup.add(group);
        markerObjects.push(group);
      });
      applyCategory();
    }

    function applyCategory() {
      const { activeCategory } = dataRef.current;
      markerObjects.forEach((g) => {
        const mk = g.userData.marker;
        const match = activeCategory === "ALL" || mk.category === activeCategory;
        const glow = g.userData.glow;
        glow.userData.targetOpacity = match ? (glow.userData.isHeat ? 0.55 : 1) : 0.1;
        glow.userData.targetScale = match ? glow.userData.baseScale : glow.userData.baseScale * 0.5;
        if (g.userData.icon) g.userData.icon.userData.targetOpacity = match ? 0.95 : 0.08;
        if (g.userData.label) g.userData.label.userData.targetOpacity = match ? 0.9 : 0;
        if (g.userData.ring) g.userData.ring.userData.active = match;
      });
      if (stateRef.current) stateRef.current.transitionStart = performance.now();
    }

    // ---- arcs ----
    const arcGroup = new THREE.Group();
    root.add(arcGroup);
    const arcPackets = [];

    function buildArcs() {
      while (arcGroup.children.length) {
        const c = arcGroup.children.pop();
        c.material?.dispose();
        c.geometry?.dispose?.();
      }
      arcPackets.length = 0;
      const { arcs } = dataRef.current;
      arcs.forEach((arc) => {
        const start = latLngToVec3(arc.from.lat, arc.from.lng, 1.015);
        const end = latLngToVec3(arc.to.lat, arc.to.lng, 1.015);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dist = start.distanceTo(end);
        mid.normalize().multiplyScalar(1.015 + dist * 0.45);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const pts = curve.getPoints(64);
        const mat = new THREE.LineBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.28,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
        const pmat = new THREE.SpriteMaterial({
          map: glowTex,
          color: 0x7df9ff,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false,
        });
        const packet = new THREE.Sprite(pmat);
        packet.scale.set(0.045, 0.045, 0.045);
        packet.userData = { curve, t: Math.random(), speed: 0.004 + Math.random() * 0.006 };
        arcGroup.add(packet);
        arcPackets.push(packet);
      });
    }

    buildMarkers();
    buildArcs();

    // ---- highlight ring ----
    const ringMat = new THREE.SpriteMaterial({
      map: ringTex,
      color: 0x22d3ee,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      opacity: 0,
    });
    const highlightRing = new THREE.Sprite(ringMat);
    highlightRing.scale.set(0.2, 0.2, 0.2);
    root.add(highlightRing);

    // ---- interaction state ----
    const s = {
      ready: true,
      targetYaw: 0,
      targetPitch: 0,
      targetZoom: defaultZoom,
      defaultZoom,
      minZoom,
      maxZoom,
      focusing: false,
      locked: false,
      idleTimer: 0,
      dragging: false,
      lastX: 0,
      lastY: 0,
      downX: 0,
      downY: 0,
      moved: false,
      highlight: null,
      hovered: null,
    };
    stateRef.current = s;
    stateRef.current.buildMarkers = buildMarkers;
    stateRef.current.buildArcs = buildArcs;
    stateRef.current.applyCategory = applyCategory;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function setTooltip(marker, x, y) {
      const el = tooltipRef.current;
      if (!el) return;
      if (!marker) {
        el.style.opacity = "0";
        return;
      }
      const cat = CAT_LABELS[marker.category] || "Activity";
      el.innerHTML =
        `<div style="font-size:11px;letter-spacing:0.12em;color:#fff;font-weight:600">${marker.city.toUpperCase()}</div>` +
        `<div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:2px">${cat} Activity</div>` +
        `<div style="font-size:11px;color:#34d399;margin-top:3px;display:flex;align-items:center;gap:3px">↑ ${marker.change}%</div>`;
      el.style.transform = `translate(${x + 14}px, ${y - 44}px)`;
      el.style.opacity = "1";
    }

    function onPointerDown(e) {
      s.dragging = true;
      s.moved = false;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.downX = e.clientX;
      s.downY = e.clientY;
      s.focusing = false;
    }
    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      if (s.dragging) {
        const dx = e.clientX - s.lastX;
        const dy = e.clientY - s.lastY;
        if (Math.abs(e.clientX - s.downX) > 4 || Math.abs(e.clientY - s.downY) > 4) s.moved = true;
        s.targetYaw -= dx * 0.005;
        s.targetPitch -= dy * 0.005;
        s.targetPitch = Math.max(-1.1, Math.min(1.1, s.targetPitch));
        s.lastX = e.clientX;
        s.lastY = e.clientY;
        s.locked = false;
        s.idleTimer = 0;
        return;
      }
      // hover detection
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(markerSprites, false);
      if (hits.length) {
        const sp = hits[0].object;
        s.hovered = sp;
        renderer.domElement.style.cursor = "pointer";
      } else {
        s.hovered = null;
        renderer.domElement.style.cursor = "grab";
        setTooltip(null);
      }
    }
    function onPointerUp(e) {
      s.dragging = false;
      if (!s.moved) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(markerSprites, false);
        if (hits.length && dataRef.current.onSelectMarker) {
          dataRef.current.onSelectMarker(hits[0].object.userData.marker);
        }
      }
    }
    function onWheel(e) {
      e.preventDefault();
      s.targetZoom = Math.max(minZoom, Math.min(maxZoom, s.targetZoom + e.deltaY * 0.002));
    }

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    // ---- resize ----
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    function projectToScreen(worldVec) {
      const v = worldVec.clone().project(camera);
      const w = renderer.domElement.clientWidth;
      const h = renderer.domElement.clientHeight;
      return { x: (v.x * 0.5 + 0.5) * w, y: (-v.y * 0.5 + 0.5) * h, visible: v.z < 1 };
    }

    // ---- animation loop ----
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      s.idleTimer += 1;
      if (!s.dragging && !s.focusing && !s.locked && s.idleTimer > 120) {
        s.targetYaw += 0.0014;
      }
      if (s.focusing) {
        const dy = s.targetYaw - root.rotation.y;
        const dx = s.targetPitch - root.rotation.x;
        root.rotation.y += dy * 0.06;
        root.rotation.x += dx * 0.06;
        if (Math.abs(dy) < 0.002 && Math.abs(dx) < 0.002) s.focusing = false;
      } else {
        root.rotation.y += (s.targetYaw - root.rotation.y) * 0.08;
        root.rotation.x += (s.targetPitch - root.rotation.x) * 0.08;
      }
      camera.position.z += (s.targetZoom - camera.position.z) * 0.06;

      // pulse markers + category-specific animations
      const t = performance.now() * 0.001;
      markerObjects.forEach((g) => {
        const glow = g.userData.glow;
        const pulse = 1 + Math.sin(t * 2 + glow.userData.phase) * 0.18;
        const targetOp = glow.userData.targetOpacity ?? 1;
        const targetSc = (glow.userData.targetScale ?? glow.userData.baseScale) * (glow.userData.isHeat ? 1 : pulse);
        glow.material.opacity += (targetOp - glow.material.opacity) * 0.1;
        const gn = glow.scale.x + (targetSc - glow.scale.x) * 0.1;
        glow.scale.set(gn, gn, gn);
        if (g.userData.icon) {
          const io = g.userData.icon.userData.targetOpacity ?? 0.95;
          g.userData.icon.material.opacity += (io - g.userData.icon.material.opacity) * 0.1;
          const is = g.userData.baseScale * 1.5 * pulse;
          g.userData.icon.scale.set(is, is, is);
        }
        if (g.userData.label) {
          const lo = g.userData.label.userData.targetOpacity ?? 0;
          g.userData.label.material.opacity += (lo - g.userData.label.material.opacity) * 0.1;
        }
        if (g.userData.ring) {
          const r = g.userData.ring;
          if (r.userData.active) {
            r.userData.t += 0.018;
            if (r.userData.t > 1) r.userData.t = 0;
            const sc = g.userData.ringBase * (1 + r.userData.t * 3.2);
            r.scale.set(sc, sc, sc);
            r.material.opacity = (1 - r.userData.t) * 0.6;
          } else {
            r.material.opacity += (0 - r.material.opacity) * 0.1;
          }
        }
      });

      // arc packets
      arcPackets.forEach((p) => {
        p.userData.t += p.userData.speed;
        if (p.userData.t > 1) p.userData.t = 0;
        p.position.copy(p.userData.curve.getPoint(p.userData.t));
        p.material.opacity = Math.sin(p.userData.t * Math.PI);
      });

      root.updateWorldMatrix(true, false);

      // hover tooltip
      if (s.hovered && markerSprites.includes(s.hovered)) {
        const wp = new THREE.Vector3();
        s.hovered.getWorldPosition(wp);
        const sp = projectToScreen(wp);
        setTooltip(s.hovered.userData.marker, sp.x, sp.y);
      }

      // highlight ring + connection line
      if (s.highlight && s.highlight.active) {
        const elapsed = performance.now() - s.highlight.start;
        if (elapsed > 2600) {
          s.highlight.active = false;
          s.targetZoom = s.defaultZoom;
          ringMat.opacity = 0;
          const line = dataRef.current.connectionLineRef?.current;
          if (line) line.style.opacity = "0";
        } else {
          const hp = latLngToVec3(s.highlight.lat, s.highlight.lng, 1.03);
          const world = hp.clone().applyMatrix4(root.matrixWorld);
          highlightRing.position.copy(hp);
          const pulse = 0.18 + Math.sin(elapsed * 0.012) * 0.05;
          highlightRing.scale.set(pulse, pulse, pulse);
          const fade = Math.min(1, elapsed / 250) * (1 - elapsed / 2600);
          ringMat.opacity = fade;
          // connection line
          const line = dataRef.current.connectionLineRef?.current;
          if (line) {
            const sp = projectToScreen(world);
            const w = renderer.domElement.clientWidth;
            const h = renderer.domElement.clientHeight;
            const ax = (dataRef.current.connectionAnchor.xPct || 0.24) * w;
            const ay = (dataRef.current.connectionAnchor.yPct || 0.72) * h;
            line.setAttribute("x1", ax);
            line.setAttribute("y1", ay);
            line.setAttribute("x2", sp.x);
            line.setAttribute("y2", sp.y);
            line.style.opacity = String(Math.min(0.6, fade));
          }
        }
      }

      // category transition flash (subtle atmosphere pulse)
      if (s.transitionStart) {
        const e = performance.now() - s.transitionStart;
        if (e < 600) atmoMesh.scale.setScalar(1 + 0.05 * (1 - e / 600));
        else {
          atmoMesh.scale.setScalar(1);
          s.transitionStart = 0;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      atmoMat.dispose();
      glowTex.dispose();
      ringTex.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stateRef.current.buildMarkers?.();
  }, [markers]);

  useEffect(() => {
    stateRef.current.buildArcs?.();
  }, [arcs]);

  useEffect(() => {
    stateRef.current.applyCategory?.();
  }, [activeCategory]);

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100%" }}>
      <div
        ref={tooltipRef}
        style={{ opacity: 0 }}
        className="pointer-events-none fixed z-[60] px-3 py-2 rounded-lg border border-white/15 bg-[#070b12]/90 backdrop-blur-xl shadow-xl transition-opacity duration-150"
      />
    </div>
  );
});

export default NexusGlobe;