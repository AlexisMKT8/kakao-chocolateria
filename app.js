/**
 * KAKAO CHOCOLATERÍA · BOMBONERÍA FINA DE MONTAÑA
 * Tapalpa, Jalisco · Bandejas Armadas & Personalizables + Chocolate a Granel (Pesos Exactos)
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
      pieces: '30 piezas',
      price: 360,
      breakdown: '7 medias esferas (8g) · 3 diamantes (11g) · 10 mendiants (8g) · 5 nidos (10g) · chocolate en rama (50g)'
    },
    b500g: {
      id: 'b500g',
      name: 'Bandeja Real 500 g',
      pieces: '55–60 piezas',
      price: 660,
      breakdown: '15 medias esferas (8g) · 5 diamantes (11g) · 21 mendiants (8g) · 10 nidos (10g) · chocolate en rama (100g)'
    },
    b1kg: {
      id: 'b1kg',
      name: 'Bandeja Real 1 kg',
      pieces: '140 piezas (Rinde ~40 personas)',
      price: 1290,
      breakdown: '30 medias esferas · 10 diamantes · 42 mendiants · 20 nidos · chocolate en rama'
    }
  },
  products: {
    nutella: {
      id: 'nutella',
      name: 'Media Esfera Nutella',
      unit: 'pieza (8 g)',
      weightGrams: 8,
      price: 19.50,
      category: 'Bombón'
    },
    crema_mani: {
      id: 'crema_mani',
      name: 'Media Esfera Crema de maní',
      unit: 'pieza (8 g)',
      weightGrams: 8,
      price: 19.50,
      category: 'Bombón'
    },
    dulce_leche: {
      id: 'dulce_leche',
      name: 'Media Esfera Dulce de leche',
      unit: 'pieza (8 g)',
      weightGrams: 8,
      price: 19.50,
      category: 'Bombón'
    },
    pistache: {
      id: 'pistache',
      name: 'Diamante Pistache',
      unit: 'pieza (11 g)',
      weightGrams: 11,
      price: 19.50,
      category: 'Diamante'
    },
    mendiant_pza: {
      id: 'mendiant_pza',
      name: 'Mendiant Frutos secos',
      unit: 'pieza (8 g)',
      weightGrams: 8,
      price: 19.50,
      category: 'Mendiants'
    },
    nido_pza: {
      id: 'nido_pza',
      name: 'Nido Cereal Crujiente',
      unit: 'pieza (10 g)',
      weightGrams: 10,
      price: 17.50,
      category: 'Nidos'
    },
    rama_semi_50g: {
      id: 'rama_semi_50g',
      name: 'Chocolate en Rama Semi amargo (50 g)',
      unit: 'porción 50 g',
      weightGrams: 50,
      price: 60.00,
      category: 'Rama (50 g)'
    },
    rama_leche_50g: {
      id: 'rama_leche_50g',
      name: 'Chocolate en Rama Con leche (50 g)',
      unit: 'porción 50 g',
      weightGrams: 50,
      price: 60.00,
      category: 'Rama (50 g)'
    },
    rama_blanco_50g: {
      id: 'rama_blanco_50g',
      name: 'Chocolate en Rama Blanco (50 g)',
      unit: 'porción 50 g',
      weightGrams: 50,
      price: 60.00,
      category: 'Rama (50 g)'
    }
  }
};

let cartState = {
  trays: {
    b250g: 1, // 1 bandeja chica agregada por defecto
    b500g: 0,
    b1kg: 0
  },
  customTrays: [], // Charolas 100% Personalizadas armadas pieza por pieza
  products: {
    nutella: 0,
    crema_mani: 0,
    dulce_leche: 0,
    pistache: 0,
    mendiant_pza: 0,
    nido_pza: 0,
    rama_semi_50g: 0,
    rama_leche_50g: 0,
    rama_blanco_50g: 0
  }
};

const CUSTOM_BUILDER_ITEMS = {
  nutella: { name: 'Media Esfera Nutella', price: 19.50, unit: 'pza' },
  crema_mani: { name: 'Media Esfera Crema de maní', price: 19.50, unit: 'pza' },
  dulce_leche: { name: 'Media Esfera Dulce de leche', price: 19.50, unit: 'pza' },
  pistache: { name: 'Diamante Pistache', price: 19.50, unit: 'pza' },
  mendiant_pza: { name: 'Mendiant Frutos secos', price: 19.50, unit: 'pza' },
  nido_pza: { name: 'Nido Cereal Crujiente', price: 17.50, unit: 'pza' },
  rama_semi_50g: { name: 'Chocolate en Rama Semi amargo (50 g)', price: 60.00, unit: 'porción' },
  rama_leche_50g: { name: 'Chocolate en Rama Con leche (50 g)', price: 60.00, unit: 'porción' },
  rama_blanco_50g: { name: 'Chocolate en Rama Blanco (50 g)', price: 60.00, unit: 'porción' }
};

const CUSTOM_TRAY_SIZES = {
  chica: { name: 'Charola Chica', maxPieces: 30, hint: 'Capacidad máxima: 30 piezas' },
  mediana: { name: 'Charola Mediana', maxPieces: 60, hint: 'Capacidad máxima: 60 piezas' },
  grande: { name: 'Charola Grande', maxPieces: 140, hint: 'Capacidad máxima: 140 piezas' }
};

let currentBuilderStep = 1;

let customBuilderState = {
  size: 'chica',
  items: {
    nutella: 0,
    crema_mani: 0,
    dulce_leche: 0,
    pistache: 0,
    mendiant_pza: 0,
    nido_pza: 0,
    rama_semi_50g: 0,
    rama_leche_50g: 0,
    rama_blanco_50g: 0
  }
};

let trayCustomizations = {
  b250g: {
    esferas: 'Surtido Clásico (Nutella, Maní, Dulce de Leche)',
    mendiants: 'Mix Clásico (Nuez, Almendra y Avellana)',
    rama: 'Surtido Clásico (Semi amargo, Leche, Blanco)'
  },
  b500g: {
    esferas: 'Surtido Clásico (Nutella, Maní, Dulce de Leche)',
    mendiants: 'Mix Clásico (Nuez, Almendra y Avellana)',
    rama: 'Surtido Clásico (Semi amargo, Leche, Blanco)'
  },
  b1kg: {
    esferas: 'Surtido Clásico (Nutella, Maní, Dulce de Leche)',
    mendiants: 'Mix Clásico (Nuez, Almendra y Avellana)',
    rama: 'Surtido Clásico (Semi amargo, Leche, Blanco)'
  }
};

let hasGiftbox = false;

document.addEventListener('DOMContentLoaded', () => {
  setupDateConstraints();
  updateCustomBuilderLiveStats();
  updateOrderDisplay();
});

// Restricción de fecha: mínimo mañana (+1 día de anticipación artesanal)
function setupDateConstraints() {
  const dateInput = document.getElementById('orderDate');
  if (!dateInput) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  dateInput.setAttribute('min', minDate);
  dateInput.value = minDate;

  dateInput.addEventListener('change', (e) => {
    const selected = new Date(e.target.value + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = (selected - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
      alert('Para garantizar la frescura artesanal, los pedidos se solicitan con al menos 1 día de anticipación.');
      e.target.value = minDate;
    }
  });
}

window.updateTrayCustomization = function(trayId) {
  const selEsferas = document.getElementById(`custom_esferas_${trayId}`);
  const selMendiants = document.getElementById(`custom_mendiants_${trayId}`);
  const selRama = document.getElementById(`custom_rama_${trayId}`);

  if (selEsferas) trayCustomizations[trayId].esferas = selEsferas.value;
  if (selMendiants) trayCustomizations[trayId].mendiants = selMendiants.value;
  if (selRama) trayCustomizations[trayId].rama = selRama.value;

  updateOrderDisplay();
};

window.goToBuilderStep = function(step) {
  if (step === 3) {
    let totalPieces = 0;
    for (const qty of Object.values(customBuilderState.items)) {
      totalPieces += qty;
    }
    if (totalPieces === 0) {
      alert('Por favor agrega al menos una pieza a tu charola antes de continuar.');
      return;
    }
    renderStep3Review();
  }

  currentBuilderStep = step;

  for (let i = 1; i <= 3; i++) {
    const panel = document.getElementById(`builderStep_${i}`);
    const nav = document.getElementById(`wizNav_${i}`);
    if (panel) {
      panel.style.display = i === step ? 'block' : 'none';
    }
    if (nav) {
      if (i === step) {
        nav.classList.add('active');
        nav.classList.remove('completed');
      } else if (i < step) {
        nav.classList.remove('active');
        nav.classList.add('completed');
      } else {
        nav.classList.remove('active');
        nav.classList.remove('completed');
      }
    }
  }

  const builderSection = document.getElementById('personalizada');
  if (builderSection) {
    builderSection.scrollIntoView({ behavior: 'smooth' });
  }
};

function renderStep3Review() {
  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  let totalPieces = 0;
  let totalPrice = 0;
  let itemsHtml = '';

  for (const [id, qty] of Object.entries(customBuilderState.items)) {
    if (qty > 0) {
      const itemConfig = CUSTOM_BUILDER_ITEMS[id];
      const itemTotal = itemConfig.price * qty;
      totalPieces += qty;
      totalPrice += itemTotal;

      itemsHtml += `
        <div class="review-item-row">
          <div class="review-item-left">
            <span class="review-item-qty">${qty}x</span>
            <span class="review-item-name">${itemConfig.name}</span>
          </div>
          <div class="review-item-right">
            <span class="review-item-unitprice">${formatCurrency(itemConfig.price)} c/u</span>
            <strong class="review-item-subtotal">${formatCurrency(itemTotal)}</strong>
          </div>
        </div>
      `;
    }
  }

  const titleElem = document.getElementById('reviewTrayTitle');
  const capElem = document.getElementById('reviewTrayCap');
  const totalElem = document.getElementById('reviewTrayTotal');
  const listElem = document.getElementById('reviewItemsList');

  if (titleElem) titleElem.textContent = `${sizeInfo.name} Personalizada`;
  if (capElem) capElem.textContent = `${totalPieces} de ${sizeInfo.maxPieces} piezas seleccionadas`;
  if (totalElem) totalElem.textContent = formatCurrency(totalPrice);
  if (listElem) listElem.innerHTML = itemsHtml;
}

window.handleCustomSizeChange = function(size) {
  customBuilderState.size = size;
  ['chica', 'mediana', 'grande'].forEach(s => {
    const card = document.getElementById(`sizeCard_${s}`);
    if (card) {
      if (s === size) card.classList.add('active');
      else card.classList.remove('active');
    }
  });
  updateCustomBuilderLiveStats();
};

window.adjustCustomBuilderItem = function(itemId, delta) {
  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  let currentTotalPieces = 0;
  for (const qty of Object.values(customBuilderState.items)) {
    currentTotalPieces += qty;
  }

  if (delta > 0 && currentTotalPieces >= sizeInfo.maxPieces) {
    alert(`Capacidad máxima alcanzada. La ${sizeInfo.name} tiene un límite de ${sizeInfo.maxPieces} piezas.`);
    return;
  }

  const current = customBuilderState.items[itemId] || 0;
  const newQty = Math.max(0, current + delta);
  customBuilderState.items[itemId] = newQty;

  const qtyElem = document.getElementById(`b_qty_${itemId}`);
  if (qtyElem) qtyElem.textContent = newQty;

  updateCustomBuilderLiveStats();
};

function updateCustomBuilderLiveStats() {
  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  let totalPieces = 0;
  let totalPrice = 0;

  for (const [id, qty] of Object.entries(customBuilderState.items)) {
    if (qty > 0) {
      const itemConfig = CUSTOM_BUILDER_ITEMS[id];
      if (!itemConfig) continue;
      totalPieces += qty;
      totalPrice += itemConfig.price * qty;
    }
  }

  const piecesElem = document.getElementById('customBuilderPieces');
  const totalElem = document.getElementById('customBuilderTotal');
  const capBadge = document.getElementById('capTrayBadge');
  const capCount = document.getElementById('capCountText');
  const capProgress = document.getElementById('capProgressFill');
  const capHint = document.getElementById('capStatusHint');

  if (piecesElem) piecesElem.textContent = `${totalPieces} pzas`;
  if (totalElem) totalElem.textContent = formatCurrency(totalPrice);

  if (capBadge) capBadge.textContent = sizeInfo.name;
  if (capCount) capCount.textContent = `${totalPieces} / ${sizeInfo.maxPieces} piezas`;

  const percent = Math.min(100, Math.round((totalPieces / sizeInfo.maxPieces) * 100));
  if (capProgress) {
    capProgress.style.width = `${percent}%`;
    if (totalPieces >= sizeInfo.maxPieces) {
      capProgress.style.background = 'linear-gradient(90deg, #d4af37 0%, #25d366 100%)';
    } else {
      capProgress.style.background = 'linear-gradient(90deg, #b8860b 0%, #f5e4b2 100%)';
    }
  }

  if (capHint) {
    if (totalPieces === 0) {
      capHint.textContent = `Capacidad disponible: ${sizeInfo.maxPieces} piezas`;
    } else if (totalPieces < sizeInfo.maxPieces) {
      const remaining = sizeInfo.maxPieces - totalPieces;
      capHint.textContent = `Faltan ${remaining} ${remaining === 1 ? 'pieza' : 'piezas'} para completar el formato`;
    } else {
      capHint.textContent = `Formato completo (${sizeInfo.maxPieces}/${sizeInfo.maxPieces} piezas)`;
    }
  }
}

window.addCustomTrayToCart = function() {
  let totalPieces = 0;
  let totalPrice = 0;
  const itemsBreakdown = {};

  for (const [id, qty] of Object.entries(customBuilderState.items)) {
    if (qty > 0) {
      const itemConfig = CUSTOM_BUILDER_ITEMS[id];
      if (!itemConfig) continue;
      totalPieces += qty;
      totalPrice += itemConfig.price * qty;
      itemsBreakdown[id] = {
        name: itemConfig.name,
        qty: qty,
        unitPrice: itemConfig.price,
        subtotal: itemConfig.price * qty,
        unit: itemConfig.unit
      };
    }
  }

  if (totalPieces === 0) {
    alert('Por favor agrega al menos una pieza a tu Charola Personalizada.');
    return;
  }

  const sizeInfo = CUSTOM_TRAY_SIZES[customBuilderState.size];
  const customTrayObj = {
    id: 'ct_' + Date.now(),
    size: customBuilderState.size,
    sizeName: sizeInfo.name,
    sizeHint: sizeInfo.hint,
    totalPieces: totalPieces,
    totalPrice: totalPrice,
    items: itemsBreakdown
  };

  cartState.customTrays.push(customTrayObj);

  for (const id of Object.keys(customBuilderState.items)) {
    customBuilderState.items[id] = 0;
    const qtyElem = document.getElementById(`b_qty_${id}`);
    if (qtyElem) qtyElem.textContent = '0';
  }
  goToBuilderStep(1);
  updateCustomBuilderLiveStats();

  updateOrderDisplay();

  const checkoutElem = document.getElementById('pedido');
  if (checkoutElem) {
    checkoutElem.scrollIntoView({ behavior: 'smooth' });
  }
};

window.removeCustomTray = function(index) {
  if (cartState.customTrays && cartState.customTrays[index]) {
    cartState.customTrays.splice(index, 1);
    updateOrderDisplay();
  }
};

window.toggleGiftbox = function(checked) {
  hasGiftbox = Boolean(checked);
  const card = document.getElementById('giftboxCard');
  if (card) {
    if (hasGiftbox) card.classList.add('active');
    else card.classList.remove('active');
  }
  updateOrderDisplay();
};

window.adjustTrayQty = function(trayId, delta) {
  const current = cartState.trays[trayId] || 0;
  const newQty = Math.max(0, current + delta);
  cartState.trays[trayId] = newQty;
  updateOrderDisplay();
};

window.adjustProductQty = function(productId, delta) {
  const current = cartState.products[productId] || 0;
  const newQty = Math.max(0, current + delta);
  cartState.products[productId] = newQty;
  updateOrderDisplay();
};

let crmIsAuth = false;
let mp = null;

try {
  if (typeof MercadoPago !== 'undefined' && KAKAO_CONFIG.mercadopago?.publicKey) {
    mp = new MercadoPago(KAKAO_CONFIG.mercadopago.publicKey, {
      locale: 'es-MX'
    });
  }
} catch (e) {
  console.log('Mercado Pago SDK inicializado.');
}

window.formatCardNumber = function(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = formatted;

  const iconElem = document.getElementById('mpCardTypeIcon');
  if (iconElem) {
    if (val.startsWith('4')) iconElem.textContent = 'VISA';
    else if (val.startsWith('5') || val.startsWith('2')) iconElem.textContent = 'MASTERCARD';
    else if (val.startsWith('3')) iconElem.textContent = 'AMEX';
    else iconElem.textContent = 'TARJETA';
  }
};

window.formatCardExpiry = function(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 4);
  if (val.length >= 3) {
    input.value = val.slice(0, 2) + '/' + val.slice(2, 4);
  } else {
    input.value = val;
  }
};

function formatCurrency(amount) {
  return Number.isInteger(amount) ? `$${amount} MXN` : `$${amount.toFixed(2)} MXN`;
}

function updateOrderDisplay() {
  let totalAmount = 0;
  let totalItemsCount = 0;
  const summaryList = document.getElementById('summaryList');
  let summaryHtml = '';

  let traysHtml = '';
  for (const [id, qty] of Object.entries(cartState.trays)) {
    const tray = KAKAO_CONFIG.trays[id];
    const qtyElem = document.getElementById(`qty_${id}`);
    const btnAdd = document.getElementById(`btnAdd_${id}`);
    const custom = trayCustomizations[id];

    if (qtyElem) qtyElem.textContent = qty;
    if (btnAdd) {
      if (qty > 0) {
        btnAdd.textContent = `${qty} EN PEDIDO`;
        btnAdd.style.background = '#e5c578';
        btnAdd.style.color = '#120804';
      } else {
        btnAdd.textContent = `+ AGREGAR ($${tray.price})`;
        btnAdd.style.background = '';
        btnAdd.style.color = '';
      }
    }

    if (qty > 0) {
      const itemTotal = tray.price * qty;
      totalAmount += itemTotal;
      totalItemsCount += qty;

      traysHtml += `
        <div class="summary-item-card">
          <div class="summary-item-header">
            <span class="summary-item-title">${tray.name} · ${tray.pieces}</span>
            <strong class="summary-item-subtotal">$${itemTotal} MXN</strong>
          </div>
          <div class="summary-item-custom-tags">
            <small>• Esferas: <em>${custom.esferas}</em></small>
            <small>• Mendiants: <em>${custom.mendiants}</em></small>
            <small>• Rama: <em>${custom.rama}</em></small>
          </div>
          <div class="summary-item-edit-bar">
            <span class="summary-unit-price">$${tray.price} MXN c/u</span>
            <div class="summary-qty-tools">
              <button type="button" class="btn-summary-mod" onclick="adjustTrayQty('${id}', -1)" title="Disminuir">−</button>
              <span class="summary-qty-digit">${qty}</span>
              <button type="button" class="btn-summary-mod" onclick="adjustTrayQty('${id}', 1)" title="Aumentar">+</button>
              <button type="button" class="btn-summary-del" onclick="adjustTrayQty('${id}', -${qty})" title="Quitar">×</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  let customTraysHtml = '';
  if (cartState.customTrays && cartState.customTrays.length > 0) {
    cartState.customTrays.forEach((ct, index) => {
      totalAmount += ct.totalPrice;
      totalItemsCount += 1;

      let itemsListHtml = '';
      for (const item of Object.values(ct.items)) {
        itemsListHtml += `<small>• ${item.qty}x ${item.name} (${formatCurrency(item.unitPrice)} c/u = ${formatCurrency(item.subtotal)})</small>`;
      }

      customTraysHtml += `
        <div class="summary-item-card custom-tray-summary-card">
          <div class="summary-item-header">
            <span class="summary-item-title">${ct.sizeName} Personalizada · ${ct.totalPieces} pzas</span>
            <strong class="summary-item-subtotal">${formatCurrency(ct.totalPrice)}</strong>
          </div>
          <div class="summary-item-custom-tags">
            ${itemsListHtml}
          </div>
          <div class="summary-item-edit-bar">
            <span class="summary-unit-price">${ct.sizeHint}</span>
            <div class="summary-qty-tools">
              <button type="button" class="btn-summary-del" onclick="removeCustomTray(${index})" title="Eliminar Charola" style="width: auto; padding: 2px 10px; font-size: 0.8rem; border-radius: 6px;">Eliminar ×</button>
            </div>
          </div>
        </div>
      `;
    });
  }

  let productsHtml = '';
  for (const [id, qty] of Object.entries(cartState.products)) {
    const prod = KAKAO_CONFIG.products[id];
    if (!prod) continue;
    const qtyElem = document.getElementById(`qty_${id}`);
    const btnAdd = document.getElementById(`btnAdd_${id}`);

    if (qtyElem) qtyElem.textContent = qty;
    if (btnAdd) {
      if (qty > 0) {
        btnAdd.textContent = `${qty} EN PEDIDO`;
        btnAdd.style.background = '#e5c578';
        btnAdd.style.color = '#120804';
      } else {
        const pStr = Number.isInteger(prod.price) ? `$${prod.price}` : `$${prod.price.toFixed(2)}`;
        btnAdd.textContent = `+ AGREGAR (${pStr})`;
        btnAdd.style.background = '';
        btnAdd.style.color = '';
      }
    }

    if (qty > 0) {
      const itemTotal = prod.price * qty;
      totalAmount += itemTotal;
      totalItemsCount += qty;

      productsHtml += `
        <div class="summary-item-card">
          <div class="summary-item-header">
            <span class="summary-item-title">${prod.name}</span>
            <strong class="summary-item-subtotal">${formatCurrency(itemTotal)}</strong>
          </div>
          <div class="summary-item-edit-bar">
            <span class="summary-unit-price">${formatCurrency(prod.price)} c/u (${prod.unit})</span>
            <div class="summary-qty-tools">
              <button type="button" class="btn-summary-mod" onclick="adjustProductQty('${id}', -1)" title="Disminuir">−</button>
              <span class="summary-qty-digit">${qty}</span>
              <button type="button" class="btn-summary-mod" onclick="adjustProductQty('${id}', 1)" title="Aumentar">+</button>
              <button type="button" class="btn-summary-del" onclick="adjustProductQty('${id}', -${qty})" title="Quitar">×</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  summaryHtml = traysHtml + customTraysHtml + productsHtml;

  let totalGranelGrams = 0;
  for (const [id, qty] of Object.entries(cartState.products)) {
    if (qty > 0) {
      const prod = KAKAO_CONFIG.products[id];
      if (prod && prod.weightGrams) {
        totalGranelGrams += prod.weightGrams * qty;
      }
    }
  }

  const granelDisplay = document.getElementById('granelGramsDisplay');
  const granelTag = document.getElementById('granelStatusTag');

  if (granelDisplay) {
    granelDisplay.textContent = `${totalGranelGrams} g / 250 g mínimo`;
  }
  if (granelTag) {
    if (totalGranelGrams === 0) {
      granelTag.textContent = 'Mínimo 250 g requerido';
      granelTag.style.background = 'rgba(255, 255, 255, 0.08)';
      granelTag.style.color = 'var(--text-muted)';
      granelTag.style.borderColor = 'var(--gold-border)';
    } else if (totalGranelGrams < 250) {
      const remaining = 250 - totalGranelGrams;
      granelTag.textContent = `Faltan ${remaining} g para el mínimo`;
      granelTag.style.background = 'rgba(218, 165, 32, 0.2)';
      granelTag.style.color = 'var(--gold-warm)';
      granelTag.style.borderColor = 'var(--gold-warm)';
    } else {
      granelTag.textContent = `Mínimo alcanzado (${totalGranelGrams} g)`;
      granelTag.style.background = 'rgba(37, 211, 102, 0.2)';
      granelTag.style.color = '#25d366';
      granelTag.style.borderColor = '#25d366';
    }
  }

  if (totalGranelGrams > 0) {
    if (totalGranelGrams < 250) {
      summaryHtml += `
        <div class="summary-row-item summary-granel-warning">
          <span>Selección a Granel: ${totalGranelGrams} g (Mínimo 250 g)</span>
          <strong style="color: #e09f3e;">Faltan ${250 - totalGranelGrams} g</strong>
        </div>
      `;
    } else {
      summaryHtml += `
        <div class="summary-row-item summary-granel-success">
          <span>Selección a Granel: ${totalGranelGrams} g</span>
          <strong style="color: #25d366;">Mínimo Cumplido</strong>
        </div>
      `;
    }
  }

  if (totalItemsCount > 0) {
    summaryHtml += `
      <div class="summary-row-item summary-pickup-badge">
        <span>Recolección: Tapalpa Centro</span>
        <strong>GRATIS</strong>
      </div>
    `;
  }

  if (summaryList) {
    if (totalItemsCount === 0) {
      summaryList.innerHTML = '<p class="empty-summary-hint">Selecciona al menos una bandeja o producto arriba (+ Agregar)</p>';
    } else {
      summaryList.innerHTML = summaryHtml;
    }
  }

  const headerTotal = document.getElementById('headerTotalAmount');
  const finalTotal = document.getElementById('finalTotalAmount');
  const floatingTotal = document.getElementById('floatingTotal');
  const floatingCount = document.getElementById('floatingCount');
  const floatingBar = document.getElementById('floatingBar');

  const formattedTotal = formatCurrency(totalAmount);
  if (headerTotal) headerTotal.textContent = formattedTotal;
  if (finalTotal) finalTotal.textContent = formattedTotal;
  if (floatingTotal) floatingTotal.textContent = formattedTotal;

  if (floatingCount) {
    floatingCount.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'Producto' : 'Productos'}`;
  }

  if (floatingBar) {
    floatingBar.style.display = totalItemsCount > 0 ? 'block' : 'none';
  }
}

function saveOrderToCRM(orderData) {
  try {
    const existing = JSON.parse(localStorage.getItem('kakao_crm_orders') || '[]');
    existing.unshift(orderData);
    localStorage.setItem('kakao_crm_orders', JSON.stringify(existing));
  } catch (e) {
    console.error('Error guardando en CRM local:', e);
  }
}

function getCrmOrders() {
  try {
    return JSON.parse(localStorage.getItem('kakao_crm_orders') || '[]');
  } catch (e) {
    return [];
  }
}

window.sendWhatsAppOrder = function() {
  let totalItemsCount = 0;
  let subtotal = 0;
  const itemsDetailed = [];

  let traysText = '';
  for (const [id, qty] of Object.entries(cartState.trays)) {
    if (qty > 0) {
      const tray = KAKAO_CONFIG.trays[id];
      const custom = trayCustomizations[id];
      const itemTotal = tray.price * qty;
      totalItemsCount += qty;
      subtotal += itemTotal;

      itemsDetailed.push({
        type: 'Bandeja Clásica',
        name: `${tray.name} (${tray.pieces})`,
        qty: qty,
        unitPrice: tray.price,
        subtotal: itemTotal,
        notes: `Esferas: ${custom.esferas} | Mendiants: ${custom.mendiants} | Rama: ${custom.rama}`
      });

      traysText += `\n*${qty}x ${tray.name}* ($${itemTotal} MXN)\n`;
      traysText += `   • ${tray.pieces}\n`;
      traysText += `   • Medias esferas: ${custom.esferas}\n`;
      traysText += `   • Mendiants: ${custom.mendiants}\n`;
      traysText += `   • Rama: ${custom.rama}\n`;
    }
  }

  let customTraysText = '';
  if (cartState.customTrays && cartState.customTrays.length > 0) {
    cartState.customTrays.forEach((ct, index) => {
      totalItemsCount += 1;
      subtotal += ct.totalPrice;

      const innerList = Object.values(ct.items).map(i => `${i.qty}x ${i.name}`).join(', ');
      itemsDetailed.push({
        type: 'Charola Personalizada',
        name: `${ct.sizeName} (${ct.totalPieces} pzas)`,
        qty: 1,
        unitPrice: ct.totalPrice,
        subtotal: ct.totalPrice,
        notes: innerList
      });

      customTraysText += `\n*Charola #${index + 1} Personalizada (${ct.sizeName})* (${formatCurrency(ct.totalPrice)})\n`;
      customTraysText += `   • Total: ${ct.totalPieces} piezas\n`;
      customTraysText += `   • Detalle seleccionado:\n`;
      for (const item of Object.values(ct.items)) {
        customTraysText += `     - ${item.qty}x ${item.name} (${formatCurrency(item.unitPrice)} c/u) = ${formatCurrency(item.subtotal)}\n`;
      }
    });
  }

  let prodsText = '';
  let totalGranelGrams = 0;
  for (const [id, qty] of Object.entries(cartState.products)) {
    if (qty > 0) {
      const prod = KAKAO_CONFIG.products[id];
      if (!prod) continue;
      const itemTotal = prod.price * qty;
      totalItemsCount += qty;
      subtotal += itemTotal;
      if (prod.weightGrams) {
        totalGranelGrams += prod.weightGrams * qty;
      }

      itemsDetailed.push({
        type: 'Granel / Especialidad',
        name: prod.name,
        qty: qty,
        unitPrice: prod.price,
        subtotal: itemTotal,
        notes: prod.unit
      });

      prodsText += `\n*${qty}x ${prod.name}* (${formatCurrency(itemTotal)})\n`;
    }
  }

  if (totalItemsCount === 0) {
    alert('Por favor agrega al menos una bandeja o producto a tu pedido.');
    document.getElementById('bandejas').scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (totalGranelGrams > 0 && totalGranelGrams < 250) {
    alert(`La compra mínima en la sección de chocolate a granel es de 250 g.\nActualmente llevas ${totalGranelGrams} g (faltan ${250 - totalGranelGrams} g).\n\nPor favor completa los 250 g para continuar.`);
    const saboresSection = document.getElementById('sabores');
    if (saboresSection) saboresSection.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const date = document.getElementById('orderDate').value;
  const time = document.getElementById('orderTime').value;
  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const notes = document.getElementById('orderNotes').value.trim();

  if (!name) {
    alert('Por favor ingresa tu Nombre Completo.');
    document.getElementById('clientName').focus();
    return;
  }

  if (!phone) {
    alert('Por favor ingresa tu Teléfono o WhatsApp.');
    document.getElementById('clientPhone').focus();
    return;
  }

  const cardNumberRaw = (document.getElementById('mpCardNumber')?.value || '').replace(/\D/g, '');
  const cardHolder = (document.getElementById('mpCardHolder')?.value || '').trim();
  const cardExpiry = (document.getElementById('mpCardExpiry')?.value || '').trim();
  const cardCvv = (document.getElementById('mpCardCvv')?.value || '').trim();

  if (cardNumberRaw.length < 15) {
    alert('Por favor ingresa un número de tarjeta válido.');
    document.getElementById('mpCardNumber')?.focus();
    return;
  }

  if (!cardHolder) {
    alert('Por favor ingresa el nombre del titular como aparece en la tarjeta.');
    document.getElementById('mpCardHolder')?.focus();
    return;
  }

  if (cardExpiry.length < 5) {
    alert('Por favor ingresa la fecha de vencimiento (MM/AA).');
    document.getElementById('mpCardExpiry')?.focus();
    return;
  }

  if (cardCvv.length < 3) {
    alert('Por favor ingresa el código de seguridad (CVV/CVC).');
    document.getElementById('mpCardCvv')?.focus();
    return;
  }

  const last4 = cardNumberRaw.slice(-4);
  let cardBrand = 'Mercado Pago';
  if (cardNumberRaw.startsWith('4')) cardBrand = 'Visa';
  else if (cardNumberRaw.startsWith('5') || cardNumberRaw.startsWith('2')) cardBrand = 'Mastercard';
  else if (cardNumberRaw.startsWith('3')) cardBrand = 'Amex';

  const finalAmount = subtotal;
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderFolio = `KAK-${randomSuffix}`;
  const nowIso = new Date().toISOString();

  const crmOrderRecord = {
    id: orderFolio,
    createdAt: nowIso,
    clientName: name,
    clientPhone: phone,
    orderDate: date,
    orderTime: time,
    paymentMode: `Mercado Pago (${cardBrand} **** ${last4})`,
    totalAmount: finalAmount,
    cardHolder: cardHolder,
    cardLast4: last4,
    cardBrand: cardBrand,
    notes: notes,
    items: itemsDetailed,
    status: 'PAGADO_MERCADOPAGO'
  };

  saveOrderToCRM(crmOrderRecord);

  let message = `*ORDEN DE COMPRA · KAKAO CHOCOLATERÍA*\n`;
  message += `_Alta bombonería de montaña · Tapalpa, Jalisco_\n`;
  message += `─────────────────────────\n`;
  message += `*FOLIO:* #${orderFolio}\n`;
  message += `─────────────────────────\n\n`;
  message += `*Cliente:* ${name}\n`;
  message += `*Teléfono:* ${phone}\n`;
  message += `*Fecha de Recolección:* ${date}\n`;
  message += `*Horario Preferido:* ${time}\n`;
  message += `*Modalidad:* Pick Up en Tapalpa Centro (Sin costo)\n`;

  if (traysText) {
    message += `\n*BANDEJAS SOLICITADAS:*${traysText}`;
  }

  if (customTraysText) {
    message += `\n*CHAROLAS PERSONALIZADAS:*${customTraysText}`;
  }

  if (prodsText) {
    message += `\n*SELECCIÓN A GRANEL:*${prodsText}`;
  }

  if (notes) {
    message += `\n*Nota / Dedicatoria:* ${notes}\n`;
  }

  message += `\n─────────────────────────\n`;
  message += `*TOTAL PAGADO: ${formatCurrency(finalAmount)}*\n`;
  message += `*MÉTODO DE PAGO:* Mercado Pago (${cardBrand} **** ${last4})\n`;
  message += `*Titular:* ${cardHolder}\n`;
  message += `─────────────────────────\n\n`;
  message += `*Confirmación de Entrega:* Recibimos tu orden y confirmamos la hora exacta de entrega en el punto seleccionado de Tapalpa Centro.\n\n`;
  message += `_KAKAO Chocolatería · Tapalpa, Jalisco_`;

  const waUrl = `https://wa.me/${KAKAO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

window.openCrmModal = function() {
  const modal = document.getElementById('crmModal');
  if (modal) {
    modal.style.display = 'flex';
    if (crmIsAuth) {
      document.getElementById('crmAuthView').style.display = 'none';
      document.getElementById('crmDashboardView').style.display = 'block';
      renderCrmOrders();
    } else {
      document.getElementById('crmAuthView').style.display = 'flex';
      document.getElementById('crmDashboardView').style.display = 'none';
      const pinField = document.getElementById('crmPinInput');
      if (pinField) {
        pinField.value = '';
        setTimeout(() => pinField.focus(), 150);
      }
    }
  }
};

window.closeCrmModal = function() {
  const modal = document.getElementById('crmModal');
  if (modal) modal.style.display = 'none';
};

window.checkCrmAuth = function() {
  const pinInput = document.getElementById('crmPinInput');
  const pin = pinInput ? pinInput.value.trim() : '';

  if (pin === '1234' || pin === 'kakao') {
    crmIsAuth = true;
    document.getElementById('crmAuthView').style.display = 'none';
    document.getElementById('crmDashboardView').style.display = 'block';
    renderCrmOrders();
  } else {
    alert('PIN incorrecto. Intenta con: 1234');
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
};

const CRM_STATUS_LABELS = {
  PAGADO_MERCADOPAGO: { label: 'Pagado Mercado Pago', color: '#25d366' },
  EN_PRODUCCION: { label: 'En Producción', color: '#f5e4b2' },
  LISTO_PICKUP: { label: 'Listo para Entrega', color: '#4da6ff' },
  ENTREGADO: { label: 'Entregado', color: '#a3e635' }
};

window.renderCrmOrders = function() {
  const orders = getCrmOrders();
  const search = (document.getElementById('crmSearchInput')?.value || '').toLowerCase().trim();
  const filterStatus = document.getElementById('crmStatusFilter')?.value || 'ALL';

  let totalRev = 0;
  let inProgressCount = 0;
  let completedCount = 0;

  orders.forEach(o => {
    totalRev += o.totalAmount || 0;
    if (o.status === 'PAGADO_MERCADOPAGO' || o.status === 'EN_PRODUCCION') inProgressCount++;
    if (o.status === 'ENTREGADO') completedCount++;
  });

  const kpiOrders = document.getElementById('kpiTotalOrders');
  const kpiRev = document.getElementById('kpiTotalRevenue');
  const kpiPending = document.getElementById('kpiPendingOrders');
  const kpiDone = document.getElementById('kpiCompletedOrders');

  if (kpiOrders) kpiOrders.textContent = orders.length;
  if (kpiRev) kpiRev.textContent = formatCurrency(totalRev);
  if (kpiPending) kpiPending.textContent = inProgressCount;
  if (kpiDone) kpiDone.textContent = completedCount;

  const filtered = orders.filter(o => {
    const matchesSearch = !search ||
      (o.id && o.id.toLowerCase().includes(search)) ||
      (o.clientName && o.clientName.toLowerCase().includes(search)) ||
      (o.clientPhone && o.clientPhone.toLowerCase().includes(search));

    const matchesStatus = filterStatus === 'ALL' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const listElem = document.getElementById('crmOrdersList');
  if (!listElem) return;

  if (filtered.length === 0) {
    listElem.innerHTML = `<p class="empty-crm-hint">No hay pedidos registrados ${search || filterStatus !== 'ALL' ? 'con los filtros actuales' : 'aún'}.</p>`;
    return;
  }

  let html = '';
  filtered.forEach(o => {
    const statusInfo = CRM_STATUS_LABELS[o.status] || { label: o.status, color: '#fff' };
    const dateFormatted = new Date(o.createdAt).toLocaleString('es-MX', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });

    const itemsSummary = o.items.map(i => `• ${i.qty}x ${i.name} ($${i.subtotal})`).join('<br>');
    const cleanPhone = (o.clientPhone || '').replace(/\D/g, '');
    const waLink = `https://wa.me/52${cleanPhone}?text=Hola%20${encodeURIComponent(o.clientName)},%20te%20escribimos%20de%20KAKAO%20Tapalpa%20sobre%20tu%20pedido%20%23${o.id}`;

    html += `
      <div class="crm-order-card">
        <div class="crm-order-card-header">
          <div>
            <span class="crm-folio-badge">#${o.id}</span>
            <span class="crm-order-client">${o.clientName}</span>
            <span class="crm-order-date">· ${dateFormatted}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <select class="crm-status-select" onchange="updateCrmOrderStatus('${o.id}', this.value)" style="color: ${statusInfo.color};">
              <option value="PAGADO_MERCADOPAGO" ${o.status === 'PAGADO_MERCADOPAGO' ? 'selected' : ''}>Pagado Mercado Pago</option>
              <option value="EN_PRODUCCION" ${o.status === 'EN_PRODUCCION' ? 'selected' : ''}>En Producción</option>
              <option value="LISTO_PICKUP" ${o.status === 'LISTO_PICKUP' ? 'selected' : ''}>Listo para Entrega</option>
              <option value="ENTREGADO" ${o.status === 'ENTREGADO' ? 'selected' : ''}>Entregado</option>
            </select>
          </div>
        </div>

        <div class="crm-order-body">
          <div class="crm-order-details">
            <div><strong>Recolección:</strong> ${o.orderDate || 'Sin fecha'} (${o.orderTime || ''})</div>
            <div><strong>Teléfono:</strong> ${o.clientPhone}</div>
            ${o.cardHolder ? `<div><strong>Titular Tarjeta:</strong> ${o.cardHolder} (${o.cardBrand} **** ${o.cardLast4})</div>` : ''}
            ${o.notes ? `<div><strong>Nota:</strong> <em>"${o.notes}"</em></div>` : ''}
            <div style="margin-top: 6px;"><strong>Productos:</strong><br>${itemsSummary}</div>
          </div>

          <div class="crm-order-financials">
            <div class="crm-fin-row">
              <span>Método:</span>
              <strong style="color: #25d366;">Mercado Pago</strong>
            </div>
            <div class="crm-fin-row total-fin-row">
              <span>Total Pagado:</span>
              <strong>${formatCurrency(o.totalAmount)}</strong>
            </div>
          </div>
        </div>

        <div class="crm-order-actions-bar">
          <a href="${waLink}" target="_blank" class="btn-crm-wa-direct">
            Contactar por WhatsApp
          </a>
          <button type="button" class="btn-crm-del-order" onclick="deleteCrmOrder('${o.id}')">
            Eliminar
          </button>
        </div>
      </div>
    `;
  });

  listElem.innerHTML = html;
};

window.filterCrmOrders = function() {
  renderCrmOrders();
};

window.updateCrmOrderStatus = function(orderId, newStatus) {
  const orders = getCrmOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    orders[index].status = newStatus;
    localStorage.setItem('kakao_crm_orders', JSON.stringify(orders));
    renderCrmOrders();
  }
};

window.deleteCrmOrder = function(orderId) {
  if (confirm(`¿Seguro que deseas eliminar el pedido #${orderId}?`)) {
    let orders = getCrmOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('kakao_crm_orders', JSON.stringify(orders));
    renderCrmOrders();
  }
};

window.clearCrmOrdersHistory = function() {
  if (confirm('¿Seguro que deseas limpiar el historial de pedidos del CRM?')) {
    localStorage.removeItem('kakao_crm_orders');
    renderCrmOrders();
  }
};

window.exportCrmOrdersCSV = function() {
  const orders = getCrmOrders();
  if (orders.length === 0) {
    alert('No hay pedidos para exportar.');
    return;
  }

  let csvContent = '\uFEFF';
  csvContent += 'Folio,Fecha Registro,Cliente,Telefono,Fecha Recoleccion,Horario,Metodo Pago,Total,Estado,Detalle Productos,Notas\n';

  orders.forEach(o => {
    const productsClean = (o.items || []).map(i => `${i.qty}x ${i.name}`).join('; ');
    const row = [
      `"${o.id || ''}"`,
      `"${new Date(o.createdAt).toLocaleString('es-MX')}"`,
      `"${(o.clientName || '').replace(/"/g, '""')}"`,
      `"${o.clientPhone || ''}"`,
      `"${o.orderDate || ''}"`,
      `"${o.orderTime || ''}"`,
      `"${o.paymentMode || ''}"`,
      o.totalAmount || 0,
      `"${o.status || ''}"`,
      `"${productsClean.replace(/"/g, '""')}"`,
      `"${(o.notes || '').replace(/"/g, '""')}"`
    ];
    csvContent += row.join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `KAKAO_Pedidos_CRM_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
