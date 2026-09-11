/**
 * KAKAO CHOCOLATERÍA · BOMBONERÍA FINA DE MONTAÑA · TAPALPA, JALISCO
 * Lógica de Rutas, Flujos Guiados, Wizard de 3 Pasos, Granel Sticky y Pagos
 */

const KAKAO_CONFIG = {
  whatsappNumber: '523411168235',
  mercadopago: {
    publicKey: 'APP_USR-d4c0e53e-df4f-470f-91ea-2b69725db945',
    accessToken: 'APP_USR-6791239021176944-052015-228b2f95e2ebacbf0053f6ae85934566-168629346'
  },
  trays: {
    b250g: {
      id: 'b250g',
      name: 'Bandeja Real 250 g',
      pieces: 30,
      price: 360,
      breakdown: '7 medias esferas · 3 diamantes · 10 mendiants · 5 nidos · chocolate en rama'
    },
    b500g: {
      id: 'b500g',
      name: 'Bandeja Real 500 g',
      pieces: 60,
      price: 660,
      breakdown: '15 medias esferas · 5 diamantes · 21 mendiants · 10 nidos · chocolate en rama'
    },
    b1kg: {
      id: 'b1kg',
      name: 'Bandeja Real 1 kg',
      pieces: 140,
      price: 1290,
      breakdown: '30 medias esferas · 10 diamantes · 42 mendiants · 20 nidos · chocolate en rama'
    }
  },
  products: {
    nutella: {
      id: 'nutella',
      name: 'Media Esfera Nutella',
      weightGrams: 8,
      price: 19.50,
      unit: '8 g / pza',
      photo: 'assets/flavor_nutella.jpg'
    },
    crema_mani: {
      id: 'crema_mani',
      name: 'Media Esfera Crema de maní',
      weightGrams: 8,
      price: 19.50,
      unit: '8 g / pza',
      photo: 'assets/flavor_crema_mani.jpg'
    },
    dulce_leche: {
      id: 'dulce_leche',
      name: 'Media Esfera Dulce de leche',
      weightGrams: 8,
      price: 19.50,
      unit: '8 g / pza',
      photo: 'assets/flavor_dulce_de_leche.jpg'
    },
    diamante: {
      id: 'diamante',
      name: 'Diamante Chocolate Fino',
      weightGrams: 11,
      price: 19.50,
      unit: '11 g / pza',
      photo: 'assets/flavor_diamante_esmeralda.jpg'
    },
    mendiant_nuez: {
      id: 'mendiant_nuez',
      name: 'Mendiant Nuez',
      weightGrams: 8,
      price: 19.50,
      unit: '8 g / pza',
      photo: 'assets/flavor_mendiant_nuez.jpg'
    },
    mendiant_almendra: {
      id: 'mendiant_almendra',
      name: 'Mendiant Almendra',
      weightGrams: 8,
      price: 19.50,
      unit: '8 g / pza',
      photo: 'assets/flavor_frutos_secos.jpg'
    },
    mendiant_avellana: {
      id: 'mendiant_avellana',
      name: 'Mendiant Avellana',
      weightGrams: 8,
      price: 19.50,
      unit: '8 g / pza',
      photo: 'assets/flavor_mendiants_nueces.jpg'
    },
    nido_pza: {
      id: 'nido_pza',
      name: 'Nido Cereal Crujiente',
      weightGrams: 10,
      price: 17.50,
      unit: '10 g / pza',
      photo: 'assets/flavor_nidos_crocantes.jpg'
    },
    rama_semi_50g: {
      id: 'rama_semi_50g',
      name: 'Rama Semi amargo',
      weightGrams: 50,
      price: 60.00,
      unit: 'Porción 50 g',
      photo: 'assets/flavor_rama_semi_amargo.jpg'
    },
    rama_leche_50g: {
      id: 'rama_leche_50g',
      name: 'Rama Con leche',
      weightGrams: 50,
      price: 60.00,
      unit: 'Porción 50 g',
      photo: 'assets/flavor_rama_con_leche.jpg'
    },
    rama_blanco_50g: {
      id: 'rama_blanco_50g',
      name: 'Rama Blanco',
      weightGrams: 50,
      price: 60.00,
      unit: 'Porción 50 g',
      photo: 'assets/flavor_rama_blanco.jpg'
    }
  }
};

const CUSTOM_TRAY_SIZES = {
  chica: { name: 'Charola Chica', maxPieces: 30 },
  mediana: { name: 'Charola Mediana', maxPieces: 60 },
  grande: { name: 'Charola Grande', maxPieces: 140 }
};

// Estado Global del Carrito
let cartState = {
  trays: {
    b250g: 0,
    b500g: 0,
    b1kg: 0
  },
  trayCustomizations: {
    b250g: { esferas: 'Surtido Clásico', mendiants: 'Surtido Mixto (Nuez, Almendra, Avellana)', rama: 'Surtido Clásico' },
    b500g: { esferas: 'Surtido Clásico', mendiants: 'Surtido Mixto (Nuez, Almendra, Avellana)', rama: 'Surtido Clásico' },
    b1kg: { esferas: 'Surtido Clásico', mendiants: 'Surtido Mixto (Nuez, Almendra, Avellana)', rama: 'Surtido Clásico' }
  },
  customTrays: [],
  products: {
    nutella: 0,
    crema_mani: 0,
    dulce_leche: 0,
    diamante: 0,
    mendiant_nuez: 0,
    mendiant_almendra: 0,
    mendiant_avellana: 0,
    nido_pza: 0,
    rama_semi_50g: 0,
    rama_leche_50g: 0,
    rama_blanco_50g: 0
  }
};

// Estado del Wizard de Charola Personalizada
let customBuilderState = {
  size: 'chica',
  step: 1,
  items: {
    nutella: 0,
    crema_mani: 0,
    dulce_leche: 0,
    diamante: 0,
    mendiant_nuez: 0,
    mendiant_almendra: 0,
    mendiant_avellana: 0,
    nido_pza: 0,
    rama_semi_50g: 0,
    rama_leche_50g: 0,
    rama_blanco_50g: 0
  }
};

// Control de Skeletons de Carga de Imagen
function handleImageLoaded(imgElement) {
  if (imgElement && imgElement.parentElement) {
    imgElement.parentElement.classList.add('loaded');
  }
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  setupDatePickerMin();
  renderBulkProducts();
  renderWizardItems();
  updateAllCartDisplays();
  checkUrlPaymentStatus();
});

function goToExperience(event) {
  if (event) event.preventDefault();
  navigateToView('entry');
  const appMain = document.getElementById('appMain');
  if (appMain) {
    appMain.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==========================================================================
// ROUTER DE VISTAS (Navegación Dinámica)
// ==========================================================================

const VIEW_MAP = {
  'entry': 'viewEntry',
  'ready-trays': 'viewReadyTrays',
  'custom-wizard': 'viewCustomWizard',
  'bulk': 'viewBulk',
  'checkout': 'viewCheckout'
};

function navigateToView(viewKey) {
  const targetId = VIEW_MAP[viewKey] || 'viewEntry';

  document.querySelectorAll('.app-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(targetId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Si navega al checkout, actualizar el resumen
  if (viewKey === 'checkout') {
    renderCheckoutSummary();
  }

  // Scroll suave al inicio del contenedor principal
  const appMain = document.getElementById('appMain');
  if (appMain) {
    const navHeight = document.getElementById('appTopNav')?.offsetHeight || 60;
    const targetPos = appMain.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
    window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' });
  }
}

// ==========================================================================
// FLUJO 1: BANDEJAS YA ARMADAS
// ==========================================================================

function setTrayQtyDirect(trayId, val) {
  const parsed = Math.max(0, parseInt(val, 10) || 0);
  cartState.trays[trayId] = parsed;

  const inputEl = document.getElementById(`qty_${trayId}`);
  if (inputEl && document.activeElement !== inputEl) {
    inputEl.value = parsed;
  }

  const btnAdd = document.getElementById(`btnAdd_${trayId}`);
  if (btnAdd) {
    if (parsed > 0) {
      btnAdd.classList.add('in-cart');
      btnAdd.innerHTML = `<span>${parsed} en pedido</span>`;
    } else {
      btnAdd.classList.remove('in-cart');
      btnAdd.innerHTML = `<span>Agregar al pedido</span>`;
    }
  }

  updateAllCartDisplays();
}

function adjustTrayQty(trayId, delta) {
  const current = cartState.trays[trayId] || 0;
  const updated = Math.max(0, current + delta);
  const inputEl = document.getElementById(`qty_${trayId}`);
  if (inputEl) inputEl.value = updated;
  setTrayQtyDirect(trayId, updated);
}

function updateTrayCustomization(trayId) {
  const esferasSelect = document.getElementById(`flavor_esferas_${trayId}`);
  const mendiantsSelect = document.getElementById(`flavor_mendiants_${trayId}`);
  const ramaSelect = document.getElementById(`flavor_rama_${trayId}`);

  if (esferasSelect) cartState.trayCustomizations[trayId].esferas = esferasSelect.value;
  if (mendiantsSelect) cartState.trayCustomizations[trayId].mendiants = mendiantsSelect.value;
  if (ramaSelect) cartState.trayCustomizations[trayId].rama = ramaSelect.value;

  if (cartState.trays[trayId] === 0) {
    adjustTrayQty(trayId, 1);
  } else {
    updateAllCartDisplays();
  }
}

// ==========================================================================
// FLUJO 2: WIZARD "ARMA TU PROPIA BANDEJA"
// ==========================================================================

function setWizardStep(stepNum) {
  customBuilderState.step = stepNum;

  // Actualizar nodos e indicadores de progreso
  for (let i = 1; i <= 3; i++) {
    const node = document.getElementById(`wizardNode${i}`);
    const line = document.getElementById(`wizardLine${i}`);
    const panel = document.getElementById(`wizardStep${i}`);

    if (node) {
      node.classList.remove('active', 'completed');
      if (i === stepNum) node.classList.add('active');
      else if (i < stepNum) node.classList.add('completed');
    }

    if (line) {
      if (i < stepNum) line.classList.add('completed');
      else line.classList.remove('completed');
    }

    if (panel) {
      if (i === stepNum) panel.classList.add('active');
      else panel.classList.remove('active');
    }
  }

  if (stepNum === 2) {
    updateWizardCapacityMeter();
  } else if (stepNum === 3) {
    renderWizardSummaryStep();
  }
}

function selectCustomSize(sizeKey) {
  customBuilderState.size = sizeKey;

  document.querySelectorAll('.wizard-size-card').forEach(card => {
    card.classList.remove('selected');
  });

  const selectedCard = document.getElementById(`wSize_${sizeKey}`);
  if (selectedCard) selectedCard.classList.add('selected');

  updateWizardCapacityMeter();
}

function renderWizardItems() {
  const container = document.getElementById('wizardItemsGrid');
  if (!container) return;

  let html = '';
  Object.keys(KAKAO_CONFIG.products).forEach(prodKey => {
    const prod = KAKAO_CONFIG.products[prodKey];
    const qty = customBuilderState.items[prodKey] || 0;

    html += `
      <div class="product-card-vertical">
        <div class="product-card-photo-box skeleton-box">
          <img src="${prod.photo}" alt="${prod.name}" loading="lazy" onload="handleImageLoaded(this)">
        </div>
        <div class="product-card-details">
          <h4 class="product-card-title">${prod.name}</h4>
          <span class="product-card-unit">${prod.unit}</span>
          <div class="product-card-price">$${prod.price.toFixed(2)} MXN</div>
        </div>
        <div class="product-card-stepper-wrap">
          <div class="stepper-box">
            <button type="button" class="btn-stepper" onclick="adjustCustomItem('${prodKey}', -1)" aria-label="Restar">−</button>
            <input type="number" min="0" max="99" class="stepper-val-input" id="wItemQty_${prodKey}" value="${qty}" onchange="setCustomItemQtyDirect('${prodKey}', this.value)" oninput="setCustomItemQtyDirect('${prodKey}', this.value)" aria-label="Cantidad">
            <button type="button" class="btn-stepper" onclick="adjustCustomItem('${prodKey}', 1)" aria-label="Sumar">+</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function setCustomItemQtyDirect(prodKey, val) {
  const maxLimit = CUSTOM_TRAY_SIZES[customBuilderState.size].maxPieces;
  let parsed = Math.max(0, parseInt(val, 10) || 0);

  const otherItemsTotal = Object.keys(customBuilderState.items)
    .filter(k => k !== prodKey)
    .reduce((sum, k) => sum + (customBuilderState.items[k] || 0), 0);

  if (otherItemsTotal + parsed > maxLimit) {
    parsed = Math.max(0, maxLimit - otherItemsTotal);
    alert(`Se ajustó a ${parsed} para no exceder el límite de ${maxLimit} piezas.`);
  }

  customBuilderState.items[prodKey] = parsed;
  const inputEl = document.getElementById(`wItemQty_${prodKey}`);
  if (inputEl && document.activeElement !== inputEl) {
    inputEl.value = parsed;
  }

  updateWizardCapacityMeter();
}

function adjustCustomItem(prodKey, delta) {
  const currentItemQty = customBuilderState.items[prodKey] || 0;
  const updated = Math.max(0, currentItemQty + delta);
  const inputEl = document.getElementById(`wItemQty_${prodKey}`);
  if (inputEl) inputEl.value = updated;
  setCustomItemQtyDirect(prodKey, updated);
}

function getCustomTrayTotalPieces() {
  return Object.values(customBuilderState.items).reduce((sum, qty) => sum + qty, 0);
}

function calculateCustomTrayPrice() {
  let total = 0;
  Object.keys(customBuilderState.items).forEach(prodKey => {
    const qty = customBuilderState.items[prodKey] || 0;
    const prod = KAKAO_CONFIG.products[prodKey];
    if (qty > 0 && prod) {
      total += (qty * prod.price);
    }
  });
  return total;
}

function updateWizardCapacityMeter() {
  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  const total = getCustomTrayTotalPieces();
  const max = sizeInfo.maxPieces;
  const pct = Math.min(100, Math.round((total / max) * 100));
  const calcPrice = calculateCustomTrayPrice();

  const nameEl = document.getElementById('wizardCurrentSizeName');
  const priceEl = document.getElementById('wizardCapacityPrice');
  const badgeEl = document.getElementById('wizardCapacityBadge');
  const fillEl = document.getElementById('wizardProgressFill');

  if (nameEl) nameEl.textContent = sizeInfo.name;
  if (priceEl) priceEl.textContent = `$${calcPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
  if (badgeEl) badgeEl.textContent = `${total} / ${max} piezas`;
  if (fillEl) fillEl.style.width = `${pct}%`;
}

function renderWizardSummaryStep() {
  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  const total = getCustomTrayTotalPieces();
  const calcPrice = calculateCustomTrayPrice();

  const titleEl = document.getElementById('summaryCustomSizeName');
  const priceEl = document.getElementById('summaryCustomPrice');
  const listEl = document.getElementById('summaryCustomPiecesList');
  const countEl = document.getElementById('summaryCustomTotalCount');

  if (titleEl) titleEl.textContent = sizeInfo.name;
  if (priceEl) priceEl.textContent = `$${calcPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
  if (countEl) countEl.textContent = `${total} piezas`;

  if (listEl) {
    let piecesHtml = '';
    let hasItems = false;
    Object.keys(customBuilderState.items).forEach(prodKey => {
      const qty = customBuilderState.items[prodKey];
      if (qty > 0) {
        hasItems = true;
        const prod = KAKAO_CONFIG.products[prodKey];
        const subtotal = qty * prod.price;
        piecesHtml += `
          <div class="summary-piece-row">
            <span>• ${prod.name} x${qty}</span>
            <strong>$${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</strong>
          </div>
        `;
      }
    });

    if (!hasItems) {
      piecesHtml = '<p style="color: var(--text-dim); font-size: 0.85rem;">No has seleccionado piezas aún. Regresa al paso 2 para elegir tus sabores.</p>';
    }

    listEl.innerHTML = piecesHtml;
  }
}

function addCustomTrayToOrder() {
  const totalPieces = getCustomTrayTotalPieces();
  if (totalPieces === 0) {
    alert('Por favor agrega al menos 1 pieza a tu charola antes de confirmar.');
    setWizardStep(2);
    return;
  }

  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  const calcPrice = calculateCustomTrayPrice();
  const customTray = {
    id: `custom_${Date.now()}`,
    sizeKey: customBuilderState.size,
    sizeName: sizeInfo.name,
    price: calcPrice,
    totalPieces: totalPieces,
    items: { ...customBuilderState.items }
  };

  cartState.customTrays.push(customTray);

  // Reiniciar estado del builder
  Object.keys(customBuilderState.items).forEach(k => customBuilderState.items[k] = 0);
  renderWizardItems();
  setWizardStep(1);

  updateAllCartDisplays();
  navigateToView('checkout');
}

// ==========================================================================
// FLUJO 3: CHOCOLATE A GRANEL (Mínimo 250 g Sticky)
// ==========================================================================

function renderBulkProducts() {
  const container = document.getElementById('bulkProductsGrid');
  if (!container) return;

  let html = '';
  Object.keys(KAKAO_CONFIG.products).forEach(prodKey => {
    const prod = KAKAO_CONFIG.products[prodKey];
    const qty = cartState.products[prodKey] || 0;

    html += `
      <div class="product-card-vertical">
        <div class="product-card-photo-box skeleton-box">
          <img src="${prod.photo}" alt="${prod.name}" loading="lazy" onload="handleImageLoaded(this)">
        </div>
        <div class="product-card-details">
          <h4 class="product-card-title">${prod.name}</h4>
          <span class="product-card-unit">${prod.unit}</span>
          <div class="product-card-price">$${prod.price.toFixed(2)} MXN</div>
        </div>
        <div class="product-card-stepper-wrap">
          <div class="stepper-box">
            <button type="button" class="btn-stepper" onclick="adjustBulkQty('${prodKey}', -1)" aria-label="Restar">−</button>
            <input type="number" min="0" max="999" class="stepper-val-input" id="bulkQty_${prodKey}" value="${qty}" onchange="setBulkQtyDirect('${prodKey}', this.value)" oninput="setBulkQtyDirect('${prodKey}', this.value)" aria-label="Cantidad">
            <button type="button" class="btn-stepper" onclick="adjustBulkQty('${prodKey}', 1)" aria-label="Sumar">+</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function setBulkQtyDirect(prodKey, val) {
  const parsed = Math.max(0, parseInt(val, 10) || 0);
  cartState.products[prodKey] = parsed;

  const inputEl = document.getElementById(`bulkQty_${prodKey}`);
  if (inputEl && document.activeElement !== inputEl) {
    inputEl.value = parsed;
  }

  updateAllCartDisplays();
}

function adjustBulkQty(prodKey, delta) {
  const current = cartState.products[prodKey] || 0;
  const updated = Math.max(0, current + delta);
  const inputEl = document.getElementById(`bulkQty_${prodKey}`);
  if (inputEl) inputEl.value = updated;
  setBulkQtyDirect(prodKey, updated);
}

function calculateBulkGrams() {
  let totalGrams = 0;
  Object.keys(cartState.products).forEach(prodKey => {
    const qty = cartState.products[prodKey] || 0;
    const prod = KAKAO_CONFIG.products[prodKey];
    if (qty > 0 && prod) {
      totalGrams += (qty * prod.weightGrams);
    }
  });
  return totalGrams;
}

function calculateBulkPrice() {
  let total = 0;
  Object.keys(cartState.products).forEach(prodKey => {
    const qty = cartState.products[prodKey] || 0;
    const prod = KAKAO_CONFIG.products[prodKey];
    if (qty > 0 && prod) {
      total += (qty * prod.price);
    }
  });
  return total;
}

function updateBulkStickyMeter() {
  const totalGrams = calculateBulkGrams();
  const totalPrice = calculateBulkPrice();
  const minGrams = 250;
  const pct = Math.min(100, Math.round((totalGrams / minGrams) * 100));

  const meterContainer = document.getElementById('bulkStickyMeter');
  const currentEl = document.getElementById('bulkGramsCurrent');
  const hintEl = document.getElementById('bulkGramsHint');
  const fillEl = document.getElementById('bulkProgressFill');
  const priceEl = document.getElementById('bulkPriceCurrent');

  if (currentEl) currentEl.textContent = `${totalGrams} g / ${minGrams} g mínimo`;
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (priceEl) priceEl.textContent = `$${totalPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

  if (totalGrams >= minGrams) {
    if (meterContainer) meterContainer.classList.add('ready');
    if (hintEl) hintEl.textContent = `Mínimo cumplido (${totalGrams} g acumulados)`;
  } else {
    if (meterContainer) meterContainer.classList.remove('ready');
    const missing = minGrams - totalGrams;
    if (hintEl) hintEl.textContent = `Faltan ${missing} g para cumplir el mínimo de 250 g`;
  }
}

// ==========================================================================
// CÁLCULO TOTAL Y SINCRONIZACIÓN DE INTERFAZ
// ==========================================================================

function calculateCartTotals() {
  let totalPrice = 0;
  let totalItemsCount = 0;

  // 1. Bandejas armadas
  Object.keys(cartState.trays).forEach(trayId => {
    const qty = cartState.trays[trayId] || 0;
    if (qty > 0) {
      const price = KAKAO_CONFIG.trays[trayId].price;
      totalPrice += (qty * price);
      totalItemsCount += qty;
    }
  });

  // 2. Charolas personalizadas
  cartState.customTrays.forEach(tray => {
    totalPrice += tray.price;
    totalItemsCount += 1;
  });

  // 3. Granel (calcula precio unitario exacto por cada pieza)
  Object.keys(cartState.products).forEach(prodKey => {
    const qty = cartState.products[prodKey] || 0;
    if (qty > 0) {
      const prod = KAKAO_CONFIG.products[prodKey];
      totalPrice += (qty * prod.price);
      totalItemsCount += qty;
    }
  });

  return { totalPrice, totalItemsCount };
}

function removeItemFromCart(type, key) {
  if (type === 'tray') {
    setTrayQtyDirect(key, 0);
  } else if (type === 'custom') {
    const index = parseInt(key, 10);
    if (!isNaN(index) && index >= 0 && index < cartState.customTrays.length) {
      cartState.customTrays.splice(index, 1);
    }
    updateAllCartDisplays();
  } else if (type === 'bulk') {
    setBulkQtyDirect(key, 0);
  }
  renderCheckoutSummary();
}

function updateAllCartDisplays() {
  const { totalPrice, totalItemsCount } = calculateCartTotals();
  const formattedTotal = `$${totalPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;

  // Top sticky nav cart pill (se oculta si el carrito está en $0)
  const navCartPill = document.querySelector('.nav-cart-pill');
  const navTotal = document.getElementById('navCartTotal');
  if (navTotal) navTotal.textContent = formattedTotal;
  if (navCartPill) {
    if (totalItemsCount > 0) {
      navCartPill.style.display = 'inline-flex';
    } else {
      navCartPill.style.display = 'none';
    }
  }

  // Persistent bottom dock (solo se muestra cuando hay productos agregados)
  const dock = document.getElementById('persistentCartDock');
  const dockCount = document.getElementById('dockItemsCount');
  const dockTotal = document.getElementById('dockTotalPrice');
  
  if (dockCount) {
    dockCount.textContent = totalItemsCount === 1 ? '1 producto' : `${totalItemsCount} productos`;
  }
  if (dockTotal) dockTotal.textContent = formattedTotal;

  if (dock) {
    if (totalItemsCount > 0) {
      dock.classList.add('active');
      document.body.classList.add('has-cart');
    } else {
      dock.classList.remove('active');
      document.body.classList.remove('has-cart');
    }
  }

  // Sticky granel meter
  updateBulkStickyMeter();
}

// ==========================================================================
// FLUJO 5: CHECKOUT Y RESUMEN
// ==========================================================================

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsList');
  const finalTotalEl = document.getElementById('checkoutFinalTotal');
  if (!container) return;

  const { totalPrice } = calculateCartTotals();
  let html = '';
  let hasAny = false;

  // 1. Bandejas Armadas
  Object.keys(cartState.trays).forEach(trayId => {
    const qty = cartState.trays[trayId] || 0;
    if (qty > 0) {
      hasAny = true;
      const tray = KAKAO_CONFIG.trays[trayId];
      const custom = cartState.trayCustomizations[trayId];
      const subtotal = qty * tray.price;

      html += `
        <div class="checkout-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
          <div class="checkout-item-name" style="flex: 1;">
            <strong>${tray.name} x${qty}</strong>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">
              Esferas: ${custom.esferas} · Mendiants: ${custom.mendiants || 'Surtido'} · Rama: ${custom.rama}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="checkout-item-price" style="font-weight: 700; color: var(--gold-light);">$${subtotal.toLocaleString('es-MX')} MXN</div>
            <button type="button" class="btn-remove-item" onclick="removeItemFromCart('tray', '${trayId}')" title="Eliminar del pedido" style="background: rgba(255,59,48,0.15); border: 1px solid rgba(255,59,48,0.3); color: #ff6961; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">✕</button>
          </div>
        </div>
      `;
    }
  });

  // 2. Charolas Personalizadas
  cartState.customTrays.forEach((tray, index) => {
    hasAny = true;
    html += `
      <div class="checkout-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <div class="checkout-item-name" style="flex: 1;">
          <strong>${tray.sizeName} (Personalizada)</strong>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">${tray.totalPieces} piezas seleccionadas</div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="checkout-item-price" style="font-weight: 700; color: var(--gold-light);">$${tray.price.toLocaleString('es-MX')} MXN</div>
          <button type="button" class="btn-remove-item" onclick="removeItemFromCart('custom', ${index})" title="Eliminar del pedido" style="background: rgba(255,59,48,0.15); border: 1px solid rgba(255,59,48,0.3); color: #ff6961; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">✕</button>
        </div>
      </div>
    `;
  });

  // 3. Granel
  const bulkGrams = calculateBulkGrams();
  if (bulkGrams > 0) {
    hasAny = true;
    Object.keys(cartState.products).forEach(prodKey => {
      const qty = cartState.products[prodKey] || 0;
      if (qty > 0) {
        const prod = KAKAO_CONFIG.products[prodKey];
        const subtotal = qty * prod.price;
        html += `
          <div class="checkout-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="checkout-item-name" style="flex: 1;">
              <span>• ${prod.name} x${qty} (${qty * prod.weightGrams} g)</span>
              <div style="font-size: 0.75rem; color: var(--text-dim);">$${prod.price.toFixed(2)} c/u</div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="checkout-item-price" style="font-weight: 700; color: var(--gold-light);">$${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN</div>
              <button type="button" class="btn-remove-item" onclick="removeItemFromCart('bulk', '${prodKey}')" title="Eliminar del pedido" style="background: rgba(255,59,48,0.15); border: 1px solid rgba(255,59,48,0.3); color: #ff6961; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600;">✕</button>
            </div>
          </div>
        `;
      }
    });

    if (bulkGrams < 250) {
      html += `
        <div style="background: rgba(235, 87, 87, 0.18); border: 1px solid #eb5757; padding: 8px 12px; border-radius: 6px; font-size: 0.8rem; color: #ff9999; margin-top: 8px;">
          Aviso: El pedido a granel tiene ${bulkGrams} g (mínimo requerido: 250 g).
        </div>
      `;
    }
  }

  if (!hasAny) {
    html = '<p style="color: var(--text-dim); font-size: 0.88rem; text-align: center; padding: 20px 0;">Tu pedido está vacío. Elige una bandeja o chocolates a granel para continuar.</p>';
  }

  container.innerHTML = html;
  if (finalTotalEl) finalTotalEl.textContent = `$${totalPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}

function setupDatePickerMin() {
  const dateInput = document.getElementById('orderDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
}

// ==========================================================================
// PASARELA DE COBRO CON MERCADO PAGO Y WHATSAPP
// ==========================================================================

function validateOrderFields() {
  const clientName = document.getElementById('clientName')?.value.trim();
  const clientPhone = document.getElementById('clientPhone')?.value.trim();
  const orderDate = document.getElementById('orderDate')?.value;
  const { totalPrice } = calculateCartTotals();
  const bulkGrams = calculateBulkGrams();

  if (totalPrice <= 0) {
    alert('Agrega al menos una bandeja o productos a granel antes de finalizar tu pedido.');
    return null;
  }

  if (bulkGrams > 0 && bulkGrams < 250) {
    alert(`El pedido a granel no cumple con los 250 g mínimos requeridos (llevas ${bulkGrams} g). Por favor completa los gramos faltantes.`);
    navigateToView('bulk');
    return null;
  }

  if (!clientName) {
    alert('Por favor ingresa tu nombre completo para la entrega.');
    document.getElementById('clientName')?.focus();
    return null;
  }

  if (!clientPhone) {
    alert('Por favor ingresa tu número de teléfono / WhatsApp para contactarte.');
    document.getElementById('clientPhone')?.focus();
    return null;
  }

  if (!orderDate) {
    alert('Por favor selecciona la fecha de recolección en Tapalpa.');
    return null;
  }

  return {
    clientName,
    clientPhone,
    clientEmail: document.getElementById('clientEmail')?.value.trim(),
    orderDate,
    orderTime: document.getElementById('orderTime')?.value || '12:00 - 15:00',
    orderNotes: document.getElementById('orderNotes')?.value.trim(),
    totalPrice
  };
}

async function processMercadoPagoPayment() {
  const orderData = validateOrderFields();
  if (!orderData) return;

  const btnPay = document.getElementById('btnPayMercadoPago');
  if (btnPay) {
    btnPay.disabled = true;
    btnPay.innerHTML = '<span>Generando orden segura...</span>';
  }

  const folio = `KAK-${Date.now().toString().slice(-4)}`;
  const items = [];

  // Bandejas armadas
  Object.keys(cartState.trays).forEach(trayId => {
    const qty = cartState.trays[trayId] || 0;
    if (qty > 0) {
      const tray = KAKAO_CONFIG.trays[trayId];
      const custom = cartState.trayCustomizations[trayId];
      items.push({
        title: `${tray.name} (Esferas: ${custom.esferas} · Mendiants: ${custom.mendiants || 'Surtido'} · Rama: ${custom.rama})`,
        unit_price: tray.price,
        quantity: qty
      });
    }
  });

  // Charolas personalizadas
  cartState.customTrays.forEach((tray, index) => {
    items.push({
      title: `${tray.sizeName} Personalizada (#${index + 1})`,
      unit_price: tray.price,
      quantity: 1
    });
  });

  // Granel
  Object.keys(cartState.products).forEach(prodKey => {
    const qty = cartState.products[prodKey] || 0;
    if (qty > 0) {
      const prod = KAKAO_CONFIG.products[prodKey];
      items.push({
        title: prod.name,
        unit_price: prod.price,
        quantity: qty
      });
    }
  });

  const payload = {
    folio: folio,
    totalAmount: orderData.totalPrice,
    items: items,
    payer: {
      name: orderData.clientName,
      email: orderData.clientEmail || 'contacto@kakaochocolateria.com',
      phone: orderData.clientPhone
    }
  };

  try {
    const response = await fetch('/.netlify/functions/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.init_point) {
      // Guardar en CRM local inicialmente como PENDIENTE DE PAGO
      saveOrderToLocalCrm({
        folio: folio,
        clientName: orderData.clientName,
        clientPhone: orderData.clientPhone,
        pickupDate: `${orderData.orderDate} (${orderData.orderTime})`,
        total: orderData.totalPrice,
        method: 'MERCADO_PAGO',
        status: 'PENDIENTE_PAGO',
        date: new Date().toISOString()
      });

      // Despachar alerta Push
      try {
        fetch('https://ntfy.sh/kakao_pedidos_tapalpa', {
          method: 'POST',
          body: `Nuevo intento de pago MP #${folio}: $${orderData.totalPrice.toLocaleString('es-MX')} MXN de ${orderData.clientName}`,
          headers: { 'Title': `💳 Pedido MP #${folio}`, 'Priority': 'default', 'Tags': 'credit_card' }
        }).catch(() => {});
      } catch (e) {}

      window.location.href = result.init_point;
    } else {
      throw new Error('No se pudo generar el enlace de pago de Mercado Pago.');
    }
  } catch (error) {
    console.error('Error Mercado Pago:', error);
    alert('Hubo un inconveniente al conectar con Mercado Pago. Te redirigiremos a WhatsApp para confirmar tu orden directamente.');
    sendWhatsAppOrder();
  } finally {
    if (btnPay) {
      btnPay.disabled = false;
      btnPay.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
        <span>PAGAR AHORA CON MERCADO PAGO</span>
      `;
    }
  }
}

function sendWhatsAppOrder() {
  const orderData = validateOrderFields();
  if (!orderData) return;

  const folio = `KAK-${Date.now().toString().slice(-4)}`;
  let itemsText = '';

  Object.keys(cartState.trays).forEach(trayId => {
    const qty = cartState.trays[trayId] || 0;
    if (qty > 0) {
      const tray = KAKAO_CONFIG.trays[trayId];
      const custom = cartState.trayCustomizations[trayId];
      itemsText += `• *${tray.name}* x${qty} ($${qty * tray.price} MXN)\n  - Esferas: ${custom.esferas}\n  - Mendiants: ${custom.mendiants || 'Surtido'}\n  - Rama: ${custom.rama}\n`;
    }
  });

  cartState.customTrays.forEach(tray => {
    itemsText += `• *${tray.sizeName} Personalizada* ($${tray.price} MXN) - ${tray.totalPieces} piezas\n`;
  });

  Object.keys(cartState.products).forEach(prodKey => {
    const qty = cartState.products[prodKey] || 0;
    if (qty > 0) {
      const prod = KAKAO_CONFIG.products[prodKey];
      itemsText += `• *${prod.name}* x${qty} ($${(qty * prod.price).toFixed(2)} MXN)\n`;
    }
  });

  const message = `*PEDIDO KAKAO CHOCOLATERIA*\n` +
    `*Folio:* #${folio}\n` +
    `*Estado:* ⏳ PENDIENTE DE PAGO (Transferencia / Efectivo)\n\n` +
    `*Cliente:* ${orderData.clientName}\n` +
    `*Telefono:* ${orderData.clientPhone}\n` +
    `*Fecha de Entrega:* ${orderData.orderDate} (${orderData.orderTime})\n` +
    `*Punto de Pick Up:* Centro de Tapalpa, Jalisco\n` +
    (orderData.orderNotes ? `*Nota Especial:* ${orderData.orderNotes}\n` : '') +
    `\n*Articulos Seleccionados:*\n${itemsText}\n` +
    `*TOTAL A PAGAR:* $${orderData.totalPrice.toLocaleString('es-MX')} MXN\n\n` +
    `Hola KAKAO, envio los detalles de mi pedido para coordinar pago por transferencia/efectivo y confirmar la preparación.`;

  saveOrderToLocalCrm({
    folio: folio,
    clientName: orderData.clientName,
    clientPhone: orderData.clientPhone,
    pickupDate: `${orderData.orderDate} (${orderData.orderTime})`,
    total: orderData.totalPrice,
    method: 'WHATSAPP_TRANSFERENCIA',
    status: 'PENDIENTE_PAGO',
    itemsSummary: itemsText,
    date: new Date().toISOString()
  });

  // Despachar alerta Push instantánea
  try {
    fetch('https://ntfy.sh/kakao_pedidos_tapalpa', {
      method: 'POST',
      body: `Nuevo Pedido #${folio} por WhatsApp ($${orderData.totalPrice.toLocaleString('es-MX')} MXN) de ${orderData.clientName} (Tel: ${orderData.clientPhone})`,
      headers: {
        'Title': `🍫 Nuevo Pedido WhatsApp #${folio}`,
        'Priority': 'urgent',
        'Tags': 'chocolate,bell,warning'
      }
    }).catch(() => {});
  } catch (e) {}

  const waUrl = `https://wa.me/${KAKAO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// ==========================================================================
// MODAL PAGO EXITOSO RETORNO
// ==========================================================================

function checkUrlPaymentStatus() {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('status');
  const externalRef = urlParams.get('external_reference');
  const paymentId = urlParams.get('payment_id');
  
  if (status === 'approved') {
    const orders = getStoredCrmOrders();
    const order = (externalRef ? orders.find(o => o.folio === externalRef) : null) || orders[0];
    if (order) {
      order.status = 'PAGADO_CONFIRMADO';
      order.paidAt = new Date().toISOString();
      if (paymentId) order.paymentId = paymentId;
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(orders));
      const folioEl = document.getElementById('successFolio');
      if (folioEl) folioEl.textContent = `#${order.folio || externalRef || 'KAK-OK'}`;
    }
    const successModal = document.getElementById('paymentSuccessModal');
    if (successModal) successModal.style.display = 'flex';
  } else if (status === 'rejected' || status === 'cancelled') {
    if (externalRef) {
      const orders = getStoredCrmOrders();
      const order = orders.find(o => o.folio === externalRef);
      if (order && order.status === 'PENDIENTE_PAGO') {
        order.status = 'CANCELADO';
        localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(orders));
      }
    }
  }
}

function closeSuccessModal() {
  const successModal = document.getElementById('paymentSuccessModal');
  if (successModal) successModal.style.display = 'none';
  window.history.replaceState({}, document.title, window.location.pathname);
  navigateToView('entry');
}

// ==========================================================================
// PANEL ADMINISTRATIVO CRM (Protegido por PIN)
// ==========================================================================

const CRM_PINS = ['1234', 'kakao2026'];
const CRM_STORAGE_KEY = 'kakao_crm_orders_v2';

function openCrmModal() {
  const modal = document.getElementById('crmModal');
  if (modal) {
    modal.style.display = 'flex';
    document.getElementById('crmAuthView').style.display = 'block';
    document.getElementById('crmDashboardView').style.display = 'none';
    const pinInput = document.getElementById('crmPinInput');
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
}

function closeCrmModal() {
  const modal = document.getElementById('crmModal');
  if (modal) modal.style.display = 'none';
}

function checkCrmAuth() {
  const pinInput = document.getElementById('crmPinInput');
  const enteredPin = pinInput?.value.trim();

  if (CRM_PINS.includes(enteredPin)) {
    document.getElementById('crmAuthView').style.display = 'none';
    document.getElementById('crmDashboardView').style.display = 'block';
    renderCrmDashboard();
  } else {
    alert('PIN de seguridad incorrecto.');
    if (pinInput) pinInput.value = '';
  }
}

function getStoredCrmOrders() {
  try {
    return JSON.parse(localStorage.getItem(CRM_STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveOrderToLocalCrm(order) {
  const orders = getStoredCrmOrders();
  orders.unshift(order);
  localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(orders));
}

function renderCrmDashboard() {
  const orders = getStoredCrmOrders();
  
  let totalRevenue = 0;
  let awaitingPaymentCount = 0;
  let inProductionCount = 0;
  let completedCount = 0;

  orders.forEach(o => {
    // Solo sumar ingresos de pedidos donde el dinero ya fue confirmado
    if (['PAGADO_CONFIRMADO', 'EN_PRODUCCION', 'LISTO_PICKUP', 'ENTREGADO'].includes(o.status)) {
      totalRevenue += Number(o.total || 0);
    }

    if (o.status === 'PENDIENTE_PAGO') {
      awaitingPaymentCount++;
    } else if (['PAGADO_CONFIRMADO', 'EN_PRODUCCION', 'LISTO_PICKUP'].includes(o.status)) {
      inProductionCount++;
    } else if (o.status === 'ENTREGADO') {
      completedCount++;
    }
  });

  const kpiTotalEl = document.getElementById('kpiTotalOrders');
  if (kpiTotalEl) kpiTotalEl.textContent = orders.length;

  const kpiRevEl = document.getElementById('kpiTotalRevenue');
  if (kpiRevEl) kpiRevEl.textContent = `$${totalRevenue.toLocaleString('es-MX')} MXN`;

  const kpiAwaitEl = document.getElementById('kpiAwaitingPayment');
  if (kpiAwaitEl) kpiAwaitEl.textContent = awaitingPaymentCount;

  const kpiPendEl = document.getElementById('kpiPendingOrders');
  if (kpiPendEl) kpiPendEl.textContent = inProductionCount;

  const kpiCompEl = document.getElementById('kpiCompletedOrders');
  if (kpiCompEl) kpiCompEl.textContent = completedCount;

  filterCrmOrders();
}

function filterCrmOrders() {
  const orders = getStoredCrmOrders();
  const search = document.getElementById('crmSearchInput')?.value.toLowerCase() || '';
  const filter = document.getElementById('crmStatusFilter')?.value || 'ALL';
  const container = document.getElementById('crmOrdersList');
  if (!container) return;

  const filtered = orders.filter(o => {
    const matchSearch = (o.folio || '').toLowerCase().includes(search) ||
                        (o.clientName || '').toLowerCase().includes(search) ||
                        (o.clientPhone || '').toLowerCase().includes(search);
    const matchStatus = filter === 'ALL' || o.status === filter;
    return matchSearch && matchStatus;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p style="color: var(--text-dim); text-align: center; padding: 20px;">No se encontraron pedidos registrados.</p>';
    return;
  }

  let html = '';
  filtered.forEach((o) => {
    const isPending = o.status === 'PENDIENTE_PAGO';
    const isPaid = o.status === 'PAGADO_CONFIRMADO';
    const isReady = o.status === 'LISTO_PICKUP';
    const isDone = o.status === 'ENTREGADO';
    const isCancel = o.status === 'CANCELADO';
    const isProd = o.status === 'EN_PRODUCCION';

    let badgeHtml = '';
    if (isPending) {
      badgeHtml = `<span style="background: rgba(255, 149, 0, 0.18); border: 1px solid #ff9500; color: #ff9f0a; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 0.74rem;">⏳ PENDIENTE DE PAGO · NO PREPARAR HASTA CONFIRMAR DINERO</span>`;
    } else if (isPaid) {
      badgeHtml = `<span style="background: rgba(37, 211, 102, 0.18); border: 1px solid #25d366; color: #25d366; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 0.74rem;">✓ DINERO EN CUENTA (MERCADO PAGO) · LISTO PARA ELABORAR</span>`;
    } else if (isProd) {
      badgeHtml = `<span style="background: rgba(175, 82, 222, 0.18); border: 1px solid #af52de; color: #d084ff; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 0.74rem;">🟣 EN PREPARACIÓN / TALLER</span>`;
    } else if (isReady) {
      badgeHtml = `<span style="background: rgba(0, 122, 255, 0.18); border: 1px solid #007aff; color: #5ac8fa; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 0.74rem;">📦 LISTO PARA ENTREGA PICK UP</span>`;
    } else if (isDone) {
      badgeHtml = `<span style="background: rgba(76, 217, 100, 0.18); border: 1px solid #4cd964; color: #4cd964; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 0.74rem;">✅ ENTREGADO</span>`;
    } else if (isCancel) {
      badgeHtml = `<span style="background: rgba(255, 59, 48, 0.18); border: 1px solid #ff3b30; color: #ff453a; padding: 4px 8px; border-radius: 4px; font-weight: 800; font-size: 0.74rem;">❌ CANCELADO</span>`;
    }

    const methodLabel = o.method === 'WHATSAPP_TRANSFERENCIA' 
      ? '<span style="color: #25d366; font-weight: 700;">📱 WhatsApp / Transferencia</span>' 
      : '<span style="color: #009ee3; font-weight: 700;">💳 Mercado Pago</span>';

    html += `
      <div class="crm-order-card" style="background: ${isPending ? '#1f1007' : '#160b06'}; border: 1px solid ${isPending ? 'rgba(255, 149, 0, 0.4)' : 'var(--gold-border)'}; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="color: var(--gold-light); font-size: 1.05rem;">${o.folio || '#KAK-ORDEN'}</strong>
          <span style="font-size: 0.95rem; font-weight: 800; color: ${isPending ? '#ff9f0a' : '#4cd964'};">$${Number(o.total || 0).toLocaleString('es-MX')} MXN</span>
        </div>
        <div style="margin-bottom: 8px;">
          ${badgeHtml}
        </div>
        <div style="font-size: 0.88rem; color: #ffffff; margin-bottom: 4px;">
          <strong>Cliente:</strong> ${o.clientName} · <strong>Tel:</strong> <a href="tel:${o.clientPhone}" style="color: var(--gold-warm);">${o.clientPhone}</a>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-dim); margin-bottom: 4px;">
          <strong>Canal:</strong> ${methodLabel} · <strong>Pick Up:</strong> ${o.pickupDate}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px;">
          <strong>Registro:</strong> ${new Date(o.date).toLocaleString('es-MX')}
        </div>
        <div style="display: flex; gap: 8px; align-items: center; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08);">
          <span style="font-size: 0.78rem; color: var(--text-dim);">Cambiar estado:</span>
          <select style="background: #241107; color: #ffffff; border: 1px solid var(--gold-border); padding: 6px 10px; border-radius: 6px; font-size: 0.82rem; font-weight: 600;" onchange="updateOrderStatus('${o.folio}', this.value)">
            <option value="PENDIENTE_PAGO" ${o.status === 'PENDIENTE_PAGO' ? 'selected' : ''}>⏳ Pendiente de Pago (Esperando dinero)</option>
            <option value="PAGADO_CONFIRMADO" ${o.status === 'PAGADO_CONFIRMADO' ? 'selected' : ''}>🟢 Pago Confirmado / En Cuenta</option>
            <option value="EN_PRODUCCION" ${o.status === 'EN_PRODUCCION' ? 'selected' : ''}>🟣 En Producción / Taller</option>
            <option value="LISTO_PICKUP" ${o.status === 'LISTO_PICKUP' ? 'selected' : ''}>📦 Listo para Entrega Pick Up</option>
            <option value="ENTREGADO" ${o.status === 'ENTREGADO' ? 'selected' : ''}>✅ Entregado</option>
            <option value="CANCELADO" ${o.status === 'CANCELADO' ? 'selected' : ''}>❌ Cancelado / No Pagado</option>
          </select>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function updateOrderStatus(folio, newStatus) {
  const orders = getStoredCrmOrders();
  const order = orders.find(o => o.folio === folio);
  if (order) {
    order.status = newStatus;
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(orders));
    renderCrmDashboard();
  }
}

function exportCrmOrdersCSV() {
  const orders = getStoredCrmOrders();
  if (orders.length === 0) {
    alert('No hay pedidos para exportar.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,Folio,Cliente,Telefono,FechaEntrega,Total,Estado,Canal,FechaRegistro\n';
  orders.forEach(o => {
    csvContent += `"${o.folio}","${o.clientName}","${o.clientPhone}","${o.pickupDate}","${o.total}","${o.status}","${o.method || 'WEB'}","${o.date}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `pedidos_kakao_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function clearCrmOrdersHistory() {
  if (confirm('¿Estás seguro de que deseas limpiar todo el historial de pedidos del CRM local?')) {
    localStorage.removeItem(CRM_STORAGE_KEY);
    renderCrmDashboard();
  }
}
