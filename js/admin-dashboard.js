    // ===== C-LEVEL EXECUTIVE DASHBOARD CONTROLS & LOGIC ENGINE =====
    window.currentCurrency = 'JPY';
    window.currentPeriod = '2026-09';
    window.currentSegment = 'ALL';

    // 52 HỢP ĐỒNG KHÁCH HÀNG MẪU CHUẨN (CHUẨN B2B & B2C ĐA DẠNG NGÀNH NGHỀ)
    window.DUMMY_CONTRACTS_DATA = JSON.parse(JSON.stringify(window.DEFAULT_DUMMY_CONTRACTS));

    // Master 12-Month Metadata
    var MONTH_METADATA = [
      { id: 'T1', period: '2026-01', name: 'Tháng 01/2026', note: 'Khởi đầu năm mới: Hợp đồng năm + nạp quý + định kỳ', isForecast: false, isLive: false },
      { id: 'T2', period: '2026-02', name: 'Tháng 02/2026', note: 'Tháng không: 100% nạp định kỳ tháng', isForecast: false, isLive: false },
      { id: 'T3', period: '2026-03', name: 'Tháng 03/2026', note: 'Chốt Q1: Hợp đồng năm cơ khí + nạp quý', isForecast: false, isLive: false },
      { id: 'T4', period: '2026-04', name: 'Tháng 04/2026', note: 'Đầu Q2: Khách quý T1 nạp tiếp sau 3 tháng', isForecast: false, isLive: false },
      { id: 'T5', period: '2026-05', name: 'Tháng 05/2026', note: 'Tháng không: Khách tháng nạp định kỳ', isForecast: false, isLive: false },
      { id: 'T6', period: '2026-06', name: 'Tháng 06/2026', note: 'Chốt bán niên H1: Hợp đồng năm + khách quý T3 nạp tiếp', isForecast: false, isLive: false },
      { id: 'T7', period: '2026-07', name: 'Tháng 07/2026', note: 'Đầu Q3: Khách quý T4 nạp tiếp sau 3 tháng', isForecast: false, isLive: false },
      { id: 'T8', period: '2026-08', name: 'Tháng 08/2026', note: 'Tháng không: Khách tháng nạp định kỳ (Đã chốt)', isForecast: false, isLive: false },
      { id: 'T9', period: '2026-09', name: 'Tháng 09/2026', note: 'KỲ HIỆN TẠI (LIVE) - Đã thu 100% KPI (¥158,900)', isForecast: false, isLive: true },
      { id: 'T10*', period: '2026-10', name: 'Tháng 10/2026', note: 'Dự báo đầu Q4: 10 khách quý tái nạp + 5 HĐ mới ký (¥246.3k)', isForecast: true, isLive: false },
      { id: 'T11*', period: '2026-11', name: 'Tháng 11/2026', note: 'Dự báo ngân sách 2027: Ký sớm hợp đồng năm Enterprise', isForecast: true, isLive: false },
      { id: 'T12', period: '2026-12', name: 'Tháng 12/2026', note: 'Dự báo chốt năm: Tái ký hợp đồng năm lớn cả 2 phân khúc', isForecast: true, isLive: false }
    ];

    window.REVENUE_DATA_2026 = [];

    window.recalculateRevenueData2026 = function () {
      window.REVENUE_DATA_2026 = MONTH_METADATA.map(function (m) {
        var entB2b = 0, entB2c = 0;
        var proB2b = 0, proB2c = 0;
        var basB2b = 0, basB2c = 0;

        window.DUMMY_CONTRACTS_DATA.forEach(function (c) {
          if (c.paymentMonths && c.paymentMonths.indexOf(m.period) !== -1) {
            if (c.planCategory === 'ent') {
              if (c.customerType === 'B2B') entB2b += c.billingAmount;
              else entB2c += c.billingAmount;
            } else if (c.planCategory === 'pro') {
              if (c.customerType === 'B2B') proB2b += c.billingAmount;
              else proB2c += c.billingAmount;
            } else {
              if (c.customerType === 'B2B') basB2b += c.billingAmount;
              else basB2c += c.billingAmount;
            }
          }
        });

        return {
          id: m.id,
          period: m.period,
          name: m.name,
          ent: { b2b: entB2b, b2c: entB2c },
          pro: { b2b: proB2b, b2c: proB2c },
          basic: { b2b: basB2b, b2c: basB2c },
          note: m.note,
          isForecast: m.isForecast,
          isLive: m.isLive
        };
      });
    };

    window.recalculateRevenueData2026();

    function getMonthTierVal(d, tier, seg) {
      var data = d[tier];
      if (!data) return 0;
      if (typeof data === 'number') return data;
      if (seg === 'B2B') return data.b2b || 0;
      if (seg === 'B2C') return data.b2c || 0;
      return (data.b2b || 0) + (data.b2c || 0);
    }

    // ===== HÀM TÍNH TOÁN DÒNG TIỀN VÀ MRR ĐỘNG TỪ BẢNG DUMMY CONTRACTS =====
    window.getDynamicPeriodMetrics = function (periodStr, segment) {
      var seg = segment || window.currentSegment || 'ALL';
      var allContracts = window.DUMMY_CONTRACTS_DATA;
      var isDayMode = (periodStr === '2026-09-24');
      var effectiveMonth = isDayMode ? '2026-09' : periodStr;

      var filteredContracts = allContracts.filter(function (c) {
        if (seg === 'ALL') return true;
        return c.customerType === seg;
      });

      var activeContracts = [];
      var payingContracts = [];
      var totalMrr = 0;
      var totalCashIn = 0;
      var totalSeats = 0;

      var tierCash = { ent: 0, pro: 0, basic: 0 };
      var segCash = { b2b: 0, b2c: 0 };
      var segMrr = { b2b: 0, b2c: 0 };
      var segCustomers = { b2b: 0, b2c: 0 };
      var tierMrr = { ent: 0, pro: 0, basic: 0 };
      var cycleMrr = { annual: 0, quarterly: 0, monthly: 0 };
      var cycleCount = { annual: 0, quarterly: 0, monthly: 0 };

      // Platform-wide active metrics for context
      allContracts.forEach(function (c) {
        var isActive = isDayMode ? (c.startDate <= '2026-09-24') : (c.startDate <= effectiveMonth + '-31');
        if (isActive) {
          if (c.customerType === 'B2B') {
            segMrr.b2b += c.mrrContribution;
            segCustomers.b2b++;
          } else {
            segMrr.b2c += c.mrrContribution;
            segCustomers.b2c++;
          }
        }

        // Cash condition
        var isPaying = false;
        if (isDayMode) {
          // Giao dịch nạp đúng ngày 24/09
          isPaying = (c.paymentMonths && c.paymentMonths.indexOf('2026-09') !== -1 && c.billingDay === 24);
        } else {
          isPaying = (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
        }

        if (isPaying) {
          if (c.customerType === 'B2B') segCash.b2b += c.billingAmount;
          else segCash.b2c += c.billingAmount;
        }
      });

      // Filtered metrics for current segment view
      filteredContracts.forEach(function (c) {
        var isActive = isDayMode ? (c.startDate <= '2026-09-24') : (c.startDate <= effectiveMonth + '-31');
        if (isActive) {
          activeContracts.push(c);
          totalMrr += c.mrrContribution;
          totalSeats += c.seats;
          tierMrr[c.planCategory] = (tierMrr[c.planCategory] || 0) + c.mrrContribution;
          if (c.cycleMonths === 12) { cycleMrr.annual += c.mrrContribution; cycleCount.annual++; }
          else if (c.cycleMonths === 3) { cycleMrr.quarterly += c.mrrContribution; cycleCount.quarterly++; }
          else { cycleMrr.monthly += c.mrrContribution; cycleCount.monthly++; }
        }

        var isPaying = false;
        if (isDayMode) {
          isPaying = (c.paymentMonths && c.paymentMonths.indexOf('2026-09') !== -1 && c.billingDay === 24);
        } else {
          isPaying = (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
        }

        if (isPaying) {
          payingContracts.push(c);
          totalCashIn += c.billingAmount;
          tierCash[c.planCategory] = (tierCash[c.planCategory] || 0) + c.billingAmount;
        }
      });

      // Phân tách chi tiết giữa ĐÃ THU (Collected) và CHƯA THU (Pending)
      var collectedCash = 0;
      var collectedCount = 0;
      var pendingCash = 0;
      var pendingCount = 0;
      var prepaidCount = 0;
      var colSegCash = { b2b: 0, b2c: 0 };
      var penSegCash = { b2b: 0, b2c: 0 };

      filteredContracts.forEach(function (c) {
        var isPaying = false;
        if (isDayMode) {
          isPaying = (c.paymentMonths && c.paymentMonths.indexOf('2026-09') !== -1 && c.billingDay === 24);
        } else {
          isPaying = (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
        }

        if (isPaying) {
          var isCol = window.isContractCollected(c, effectiveMonth, periodStr);
          if (isCol) {
            collectedCash += c.billingAmount;
            collectedCount++;
            if (c.customerType === 'B2B') colSegCash.b2b += c.billingAmount;
            else colSegCash.b2c += c.billingAmount;
          } else {
            pendingCash += c.billingAmount;
            pendingCount++;
            if (c.customerType === 'B2B') penSegCash.b2b += c.billingAmount;
            else penSegCash.b2c += c.billingAmount;
          }
        } else {
          var isActive = isDayMode ? (c.startDate <= '2026-09-24') : (c.startDate <= effectiveMonth + '-31');
          if (isActive) prepaidCount++;
        }
      });

      var b2bTotal = allContracts.filter(function (c) { return c.customerType === 'B2B'; }).length;
      var b2cTotal = allContracts.filter(function (c) { return c.customerType === 'B2C'; }).length;
      var totalManaged = (seg === 'B2B') ? b2bTotal : (seg === 'B2C' ? b2cTotal : allContracts.length);
      var segManaged = { b2b: b2bTotal, b2c: b2cTotal };
      var segSeats = { b2b: 0, b2c: 0 };
      var totalCapacity = (seg === 'B2B') ? 480 : (seg === 'B2C' ? 40 : 520);

      allContracts.forEach(function (c) {
        var isActive = isDayMode ? (c.startDate <= '2026-09-24') : (c.startDate <= effectiveMonth + '-31');
        if (isActive) {
          if (c.customerType === 'B2B') segSeats.b2b += c.seats;
          else segSeats.b2c += c.seats;
        }
      });

      return {
        period: periodStr,
        segment: seg,
        activeContracts: activeContracts,
        payingContracts: payingContracts,
        activeCount: activeContracts.length,
        payingCount: payingContracts.length,
        totalCustomers: activeContracts.length,
        totalManaged: totalManaged,
        segManaged: segManaged,
        totalSeats: totalSeats,
        totalCapacity: totalCapacity,
        segSeats: segSeats,
        totalMrr: totalMrr,
        totalCashIn: totalCashIn,
        tierCash: tierCash,
        segCash: segCash,
        segMrr: segMrr,
        segCustomers: segCustomers,
        tierMrr: tierMrr,
        cycleMrr: cycleMrr,
        cycleCount: cycleCount,
        isDayMode: isDayMode,
        collectedCash: collectedCash,
        collectedCount: collectedCount,
        pendingCash: pendingCash,
        pendingCount: pendingCount,
        prepaidCount: prepaidCount,
        colSegCash: colSegCash,
        penSegCash: penSegCash,
        totalExpectedCash: collectedCash + pendingCash
      };
    };

    window.selectedMonthIdx = 8; // Default T9 (0-indexed: 8)
    window.activeTiers = { ent: true, pro: true, basic: true };

    window.toggleCurr = function (c) { window.toggleCurrency(c); };
    window.changePeriod = function (p) { window.changeDashboardPeriod(p); };

    window.filterSegment = function (seg) {
      window.currentSegment = seg;
      var bAll = document.getElementById('btn-seg-all');
      var bB2b = document.getElementById('btn-seg-b2b');
      var bB2c = document.getElementById('btn-seg-b2c');
      if (bAll) bAll.classList.toggle('active', seg === 'ALL');
      if (bB2b) bB2b.classList.toggle('active', seg === 'B2B');
      if (bB2c) bB2c.classList.toggle('active', seg === 'B2C');

      applyDashboardMetrics();
      renderInteractiveRevenueChart();
    };

    window.toggleTierVisibility = function (tier) {
      window.activeTiers[tier] = !window.activeTiers[tier];
      var btn = document.getElementById('legend-btn-' + tier);
      if (btn) btn.classList.toggle('inactive', !window.activeTiers[tier]);
      renderInteractiveRevenueChart();
    };

    window.highlightTier = function (tier) {
      document.querySelectorAll('.chart-bar').forEach(function (el) {
        if (el.classList.contains('bar-' + tier)) {
          el.style.filter = 'drop-shadow(0 0 6px rgba(8, 148, 144, 0.7)) brightness(1.2)';
          el.style.opacity = '1';
        } else {
          el.style.opacity = '0.22';
        }
      });
    };

    window.unhighlightTier = function () {
      document.querySelectorAll('.chart-bar').forEach(function (el) {
        el.style.filter = '';
        el.style.opacity = '';
      });
    };

    window.renderInteractiveRevenueChart = function () {
      var layer = document.getElementById('chart-bars-layer');
      if (!layer) return;

      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      var seg = window.currentSegment || 'ALL';

      var xCoords = [60, 108, 156, 204, 252, 300, 348, 396, 444, 504, 552, 600];
      var barWidth = 32;
      var baseline = 160;

      var html = '';

      window.REVENUE_DATA_2026.forEach(function (d, idx) {
        var x = xCoords[idx];
        var isSel = (window.selectedMonthIdx === idx);

        var entVal = window.activeTiers.ent ? getMonthTierVal(d, 'ent', seg) : 0;
        var proVal = window.activeTiers.pro ? getMonthTierVal(d, 'pro', seg) : 0;
        var basicVal = window.activeTiers.basic ? getMonthTierVal(d, 'basic', seg) : 0;
        var totalVal = entVal + proVal + basicVal;

        var entH = Math.round(entVal * 0.0001);
        var proH = Math.round(proVal * 0.0001);
        var basicH = Math.round(basicVal * 0.0001);
        var totalH = entH + proH + basicH;

        var curY = baseline;
        var entY = curY - entH; if (entH > 0) curY = entY;
        var proY = curY - proH; if (proH > 0) curY = proY;
        var basicY = curY - basicH; if (basicH > 0) curY = basicY;
        var topY = baseline - totalH;

        var displayTotal = '';
        if (totalVal > 0) {
          if (isUsd) {
            displayTotal = '$' + (totalVal * rate / 1000).toFixed(1) + 'k';
          } else {
            displayTotal = '¥' + Math.round(totalVal / 1000) + 'k';
          }
        }

        var colClass = 'chart-col-group' + (isSel ? ' selected' : '');
        var clipId = 'col-clip-' + idx;

        html += '<g class="' + colClass + '" data-idx="' + idx + '" onclick="selectRevenueMonth(' + idx + ')" onmouseenter="showChartTooltip(event, ' + idx + ')" onmousemove="moveChartTooltip(event)" onmouseleave="hideChartTooltip()">';

        var r = (totalH < 8) ? (totalH / 2) : 4;
        var clipPathD = 'M ' + x + ' ' + baseline + ' '
          + 'L ' + x + ' ' + (topY + r) + ' '
          + 'Q ' + x + ' ' + topY + ' ' + (x + r) + ' ' + topY + ' '
          + 'L ' + (x + barWidth - r) + ' ' + topY + ' '
          + 'Q ' + (x + barWidth) + ' ' + topY + ' ' + (x + barWidth) + ' ' + (topY + r) + ' '
          + 'L ' + (x + barWidth) + ' ' + baseline + ' Z';

        html += '<clipPath id="' + clipId + '">';
        html += '<path d="' + clipPathD + '"/>';
        html += '</clipPath>';

        html += '<rect class="col-hover-bg" x="' + (x - 5) + '" y="16" width="' + (barWidth + 10) + '" height="150" rx="6"/>';

        var groupOpacity = d.isForecast ? ' opacity="0.85"' : '';
        html += '<g clip-path="url(#' + clipId + ')"' + groupOpacity + '>';

        if (entH > 0) {
          html += '<rect class="chart-bar bar-ent bar-b2b" x="' + x + '" y="' + entY + '" width="' + barWidth + '" height="' + entH + '" fill="url(#stkEnt)"/>';
        }

        if (proH > 0) {
          html += '<rect class="chart-bar bar-pro bar-b2b" x="' + x + '" y="' + proY + '" width="' + barWidth + '" height="' + proH + '" fill="url(#stkPro)"/>';
        }

        if (basicH > 0) {
          html += '<rect class="chart-bar bar-basic bar-b2c" x="' + x + '" y="' + basicY + '" width="' + barWidth + '" height="' + basicH + '" fill="url(#stkBasic)"/>';
        }

        html += '</g>';

        var strokeColor = isSel ? '#089490' : (d.isLive ? '#089490' : (d.isForecast ? '#009BCC' : '#cbd5e1'));
        var strokeW = isSel ? '2' : (d.isLive ? '1.5' : '1');
        var strokeDash = d.isForecast ? ' stroke-dasharray="3 2"' : '';
        html += '<rect x="' + x + '" y="' + topY + '" width="' + barWidth + '" height="' + totalH + '" rx="4" fill="none" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"' + strokeDash + ' pointer-events="none"/>';

        if (totalVal > 0) {
          var labelY = topY - 5;
          var labelFill = isSel ? '#089490' : '#475569';
          var labelWeight = isSel ? '800' : '700';
          html += '<text class="chart-top-label" x="' + (x + barWidth / 2) + '" y="' + labelY + '" font-size="9" font-weight="' + labelWeight + '" fill="' + labelFill + '" text-anchor="middle">' + displayTotal + '</text>';
        }

        var xLabelFill = isSel ? '#089490' : (d.isLive ? '#089490' : '#64748b');
        var xLabelWeight = (isSel || d.isLive) ? '800' : '600';
        html += '<text class="chart-x-label" x="' + (x + barWidth / 2) + '" y="' + 174 + '" font-size="10" font-weight="' + xLabelWeight + '" fill="' + xLabelFill + '" text-anchor="middle">' + d.id + '</text>';

        if (d.isLive) {
          html += '<circle cx="' + (x + barWidth / 2) + '" cy="183" r="2.5" fill="#089490"/>';
        }

        html += '</g>';
      });

      layer.innerHTML = html;
    };

    window.showChartTooltip = function (e, idx) {
      var d = window.REVENUE_DATA_2026[idx];
      if (!d) return;

      var tooltip = document.getElementById('chart-floating-tooltip');
      if (!tooltip) return;

      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      var seg = window.currentSegment || 'ALL';

      function fmt(val) {
        if (val === 0) return '0đ';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var entVal = getMonthTierVal(d, 'ent', seg);
      var proVal = getMonthTierVal(d, 'pro', seg);
      var basicVal = getMonthTierVal(d, 'basic', seg);
      var total = entVal + proVal + basicVal;

      var statusPill = d.isLive
        ? '<span style="background:#089490;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;margin-left:6px">LIVE</span>'
        : (d.isForecast ? '<span style="background:#009BCC;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;margin-left:6px">Dự báo</span>' : '');

      var segText = (seg === 'B2B') ? ' <span style="font-size:11px;color:#94a3b8">(Doanh nghiệp)</span>' : (seg === 'B2C' ? ' <span style="font-size:11px;color:#94a3b8">(Cá nhân)</span>' : '');

      var tipHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px">'
        + '<strong style="font-size:12.5px;color:#f8fafc">' + d.name + segText + statusPill + '</strong>'
        + '</div>';

      tipHTML += '<div style="font-size:11.5px;color:#cbd5e1;line-height:1.6">'
        + '<div style="display:flex;justify-content:space-between;gap:12px"><span style="color:#0abab5">■ Gói 1 Năm (Annual):</span><strong>' + fmt(entVal) + '</strong></div>'
        + '<div style="display:flex;justify-content:space-between;gap:12px"><span style="color:#38bdf8">■ Gói 3 Tháng (Quý):</span><strong>' + fmt(proVal) + '</strong></div>'
        + '<div style="display:flex;justify-content:space-between;gap:12px"><span style="color:#fbbf24">■ Gói 1 Tháng (Định kỳ):</span><strong>' + fmt(basicVal) + '</strong></div>'
        + '<div style="display:flex;justify-content:space-between;gap:12px;margin-top:4px;padding-top:4px;border-top:1px solid rgba(255,255,255,0.12);color:#fff;font-weight:700"><span>Thực thu dòng tiền:</span><strong style="color:#34d399;font-size:13px">' + fmt(total) + '</strong></div>'
        + '</div>';

      if (d.note) {
        tipHTML += '<div style="font-size:10px;color:#94a3b8;margin-top:6px;padding-top:4px;border-top:1px dashed rgba(255,255,255,0.1);line-height:1.35">ℹ ' + d.note + '</div>';
      }

      tipHTML += '<div style="font-size:9.5px;color:#38bdf8;margin-top:4px;text-align:right">👉 Click để chọn xem kỳ này</div>';

      tooltip.innerHTML = tipHTML;
      tooltip.style.display = 'block';
      moveChartTooltip(e);
    };

    window.moveChartTooltip = function (e) {
      var tooltip = document.getElementById('chart-floating-tooltip');
      var container = document.getElementById('revenue-chart-container');
      if (!tooltip || !container) return;

      var rect = container.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      if (x < 110) x = 110;
      if (x > rect.width - 110) x = rect.width - 110;

      if (y < 120) {
        tooltip.style.transform = 'translate(-50%, 0%)';
        tooltip.style.marginTop = '14px';
      } else {
        tooltip.style.transform = 'translate(-50%, -100%)';
        tooltip.style.marginTop = '-12px';
      }

      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    };

    window.hideChartTooltip = function () {
      var tooltip = document.getElementById('chart-floating-tooltip');
      if (tooltip) tooltip.style.display = 'none';
    };

    window.selectRevenueMonth = function (idx) {
      window.selectedMonthIdx = idx;
      var d = window.REVENUE_DATA_2026[idx];
      if (!d) return;

      window.currentPeriod = d.period;
      var periodSelect = document.getElementById('vb-period-select');
      if (periodSelect) periodSelect.value = d.period;

      applyDashboardMetrics();
      renderInteractiveRevenueChart();
    };

    window.quickJumpPeriod = function (periodStr) {
      window.currentPeriod = periodStr;
      var sel = document.getElementById('vb-period-select');
      if (sel) sel.value = (periodStr === '2026-09-24') ? '2026-09' : periodStr;

      var foundIdx = -1;
      for (var i = 0; i < window.REVENUE_DATA_2026.length; i++) {
        if (window.REVENUE_DATA_2026[i].period === (periodStr === '2026-09-24' ? '2026-09' : periodStr)) {
          foundIdx = i;
          break;
        }
      }
      if (foundIdx !== -1) {
        window.selectedMonthIdx = foundIdx;
      }

      applyDashboardMetrics();
      renderInteractiveRevenueChart();
    };

    function applyDashboardMetrics() {
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      var seg = window.currentSegment || 'ALL';
      var period = window.currentPeriod || '2026-09';

      var metrics = window.getDynamicPeriodMetrics(period, seg);

      function fmt(val) {
        if (!val) return '0đ';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var topTitle = document.getElementById('topbar-title');
      var topDesc = document.getElementById('topbar-desc');

      var cCustTitle = document.getElementById('lbl-cust-title');
      var cCust = document.getElementById('val-cust');
      var subCust = document.getElementById('sub-cust');
      var custB2b = document.getElementById('lbl-cust-b2b');
      var custB2c = document.getElementById('lbl-cust-b2c');

      var cMrrTitle = document.getElementById('lbl-mrr-title');
      var cMrr = document.getElementById('val-mrr');
      var arrEl = document.getElementById('lbl-arr-val');
      var mrrB2b = document.getElementById('lbl-mrr-b2b');
      var mrrB2c = document.getElementById('lbl-mrr-b2c');

      var cCashTitle = document.getElementById('lbl-cash-title');
      var cCash = document.getElementById('val-cash-in');
      var subCash = document.getElementById('sub-cash');
      var cashB2b = document.getElementById('lbl-cash-b2b');
      var cashB2c = document.getElementById('lbl-cash-b2c');

      var cDefTitle = document.getElementById('lbl-def-title');
      var cDefVal = document.getElementById('val-deferred');
      var subDef = document.getElementById('sub-def');
      var defB2b = document.getElementById('lbl-def-b2b');
      var defB2c = document.getElementById('lbl-def-b2c');

      var p1Title = document.getElementById('panel1-title');
      var p1Desc = document.getElementById('panel1-desc');
      var p2Title = document.getElementById('panel2-title');
      var p2Desc = document.getElementById('panel2-desc');

      var isDayMode = (period === '2026-09-24');
      var periodMonthNum = isDayMode ? 9 : parseInt(period.split('-')[1], 10);
      var monthText = isDayMode ? 'Ngày 24/09/2026' : ('Tháng ' + (periodMonthNum < 10 ? '0' : '') + periodMonthNum);

      if (seg === 'B2B') {
        if (topTitle) topTitle.textContent = 'Bàn Điều Hành Doanh Nghiệp (B2B)';
        if (topDesc) topDesc.textContent = 'Khối Doanh nghiệp (B2B) • ' + metrics.totalManaged + ' Hợp đồng (' + metrics.activeCount + ' Active) • ' + monthText;
        if (cCustTitle) cCustTitle.textContent = 'HỢP ĐỒNG DOANH NGHIỆP';
        if (subCust) subCust.textContent = metrics.activeCount + ' HĐ đang active';
        if (cMrrTitle) cMrrTitle.textContent = 'DOANH THU MRR (B2B)';
        if (cCashTitle) cCashTitle.textContent = isDayMode ? 'THỰC THU NGÀY 24/09 (B2B)' : ('THỰC THU ' + monthText.toUpperCase() + ' (B2B)');
        if (cDefTitle) cDefTitle.textContent = 'GHẾ DOANH NGHIỆP (B2B)';
      } else if (seg === 'B2C') {
        if (topTitle) topTitle.textContent = 'Bàn Điều Hành Khối Cá Nhân (B2C)';
        if (topDesc) topDesc.textContent = 'Khối Cá nhân (B2C) • ' + metrics.totalManaged + ' Hợp đồng (' + metrics.activeCount + ' Active) • ' + monthText;
        if (cCustTitle) cCustTitle.textContent = 'HỢP ĐỒNG CÁ NHÂN';
        if (subCust) subCust.textContent = metrics.activeCount + ' HĐ đang active';
        if (cMrrTitle) cMrrTitle.textContent = 'DOANH THU MRR (B2C)';
        if (cCashTitle) cCashTitle.textContent = isDayMode ? 'THỰC THU NGÀY 24/09 (B2C)' : ('THỰC THU ' + monthText.toUpperCase() + ' (B2C)');
        if (cDefTitle) cDefTitle.textContent = 'GHẾ CÁ NHÂN (B2C)';
      } else {
        if (topTitle) topTitle.textContent = 'Bàn Điều Hành Toàn Nền Tảng';
        if (topDesc) topDesc.textContent = 'Hệ sinh thái Doanh nghiệp & Cá nhân • ' + metrics.totalManaged + ' Hợp đồng (' + metrics.activeCount + ' Active) • ' + monthText;
        if (cCustTitle) cCustTitle.textContent = 'TỔNG HỢP ĐỒNG KHÁCH HÀNG';
        if (subCust) subCust.textContent = metrics.activeCount + ' HĐ đang active';
        if (cMrrTitle) cMrrTitle.textContent = 'DOANH THU MRR';
        if (cCashTitle) cCashTitle.textContent = isDayMode ? 'THỰC THU NGÀY 24/09/2026' : ('THỰC THU ' + monthText.toUpperCase());
        if (cDefTitle) cDefTitle.textContent = 'GHẾ ĐANG SỬ DỤNG (SEATS)';
      }

      // Card 1: Khách hàng
      if (cCust) cCust.textContent = metrics.totalManaged;
      if (custB2b) custB2b.textContent = '🏢 ' + metrics.segManaged.b2b + ' DN (' + metrics.segCustomers.b2b + ' Active)';
      if (custB2c) custB2c.textContent = '👤 ' + metrics.segManaged.b2c + ' Cá nhân (' + metrics.segCustomers.b2c + ' Active)';

      // Card 2: MRR
      if (cMrr) cMrr.textContent = fmt(metrics.totalMrr);
      var arrVal = metrics.totalMrr * 12;
      if (arrEl) arrEl.textContent = '/tháng (ARR: ' + (isUsd ? ('$' + (arrVal * rate / 1000).toFixed(1) + 'k') : ('¥' + (arrVal / 1000000).toFixed(2) + 'M')) + ')';
      var b2bPct = Math.round((metrics.segMrr.b2b / metrics.totalMrr) * 100) || 85;
      var b2cPct = Math.round((metrics.segMrr.b2c / metrics.totalMrr) * 100) || 15;
      if (mrrB2b) mrrB2b.textContent = '🏢 DN: ' + fmt(metrics.segMrr.b2b) + ' (' + b2bPct + '%)';
      if (mrrB2c) mrrB2c.textContent = '👤 Cá nhân: ' + fmt(metrics.segMrr.b2c) + ' (' + b2cPct + '%)';

      // Card 3: Tiền mặt ĐÃ THU (Thực thu đã vào két)
      var colAmt = metrics.collectedCash;
      var penAmt = metrics.pendingCash;
      var colCnt = metrics.collectedCount;
      var penCnt = metrics.pendingCount;
      var totalExp = colAmt + penAmt;
      var colPct = totalExp > 0 ? Math.round((colAmt / totalExp) * 100) : 100;
      var penPct = totalExp > 0 ? (100 - colPct) : 0;

      if (cCash) cCash.textContent = fmt(colAmt);
      if (subCash) {
        subCash.innerHTML = "<strong>" + colCnt + " HĐ đã vào két</strong> (" + colPct + "% dự thu) ➔";
      }
      if (cashB2b) cashB2b.textContent = "🏢 DN: " + fmt(metrics.colSegCash ? metrics.colSegCash.b2b : colAmt);
      if (cashB2c) cashB2c.textContent = "👤 Cá nhân: " + fmt(metrics.colSegCash ? metrics.colSegCash.b2c : 0);

      // Card 4: Tiền mặt CHƯA THU (Chờ nạp / Đối soát)
      var cPending = document.getElementById("val-cash-pending");
      var subPending = document.getElementById("sub-cash-pending");
      var penB2b = document.getElementById("lbl-pending-b2b");
      var penB2c = document.getElementById("lbl-pending-b2c");

      if (cPending) cPending.textContent = fmt(penAmt);
      if (subPending) {
        if (penCnt === 0) {
          subPending.innerHTML = '<span style="color:#16a34a;font-weight:700">✓ Đã thu hoàn tất 100% KPI</span>';
        } else {
          subPending.innerHTML = "<strong>" + penCnt + " HĐ chờ thu</strong> (" + penPct + "%) • Bấm lọc ➔";
        }
      }
      if (penB2b) penB2b.textContent = "🏢 DN: " + fmt(metrics.penSegCash ? metrics.penSegCash.b2b : penAmt);
      if (penB2c) penB2c.textContent = "👤 Cá nhân: " + fmt(metrics.penSegCash ? metrics.penSegCash.b2c : 0);
      // Card 4: Ghế bản quyền
      if (cDefVal) cDefVal.textContent = metrics.totalSeats + ' / ' + metrics.totalCapacity;
      var seatUsagePct = ((metrics.totalSeats / metrics.totalCapacity) * 100).toFixed(1);
      var vacantSeats = metrics.totalCapacity - metrics.totalSeats;
      if (subDef) {
        if (period === '2026-10') {
          subDef.innerHTML = '<span style="color:#d97706;font-weight:700">⚠️ Chạm trần ' + seatUsagePct + '% (Chỉ còn ' + vacantSeats + ' ghế!)</span>';
        } else {
          subDef.textContent = 'Tỷ lệ ' + seatUsagePct + '% (Còn trống ' + vacantSeats + ' ghế)';
        }
      }
      if (defB2b) defB2b.textContent = '🏢 DN: ' + metrics.segSeats.b2b + ' / 480 ghế';
      if (defB2c) defB2c.textContent = '👤 Cá nhân: ' + metrics.segSeats.b2c + ' / 40 ghế';

      // Update Topbar Timeline Active States
      var btnToday = document.getElementById('tl-btn-today');
      var btnT8 = document.getElementById('tl-btn-2026-08');
      var btnT9 = document.getElementById('tl-btn-2026-09');
      var btnT10 = document.getElementById('tl-btn-2026-10');

      var actStyle = 'height:28px;padding:0 12px;font-size:12px;border-radius:6px;font-weight:700;background:#ffffff;color:#089490;box-shadow:0 1px 3px rgba(15,23,42,0.08);border:none;cursor:pointer;font-family:inherit';
      var inactStyle = 'height:28px;padding:0 12px;font-size:12px;border-radius:6px;font-weight:600;background:transparent;color:#64748b;border:none;cursor:pointer;font-family:inherit';

      if (btnToday) { btnToday.style.cssText = isDayMode ? actStyle : inactStyle; btnToday.classList.toggle('active', isDayMode); }
      if (btnT8) { btnT8.style.cssText = (period === '2026-08') ? actStyle : inactStyle; btnT8.classList.toggle('active', period === '2026-08'); }
      if (btnT9) { btnT9.style.cssText = (period === '2026-09') ? actStyle : inactStyle; btnT9.classList.toggle('active', period === '2026-09'); }
      if (btnT10) { btnT10.style.cssText = (period === '2026-10') ? actStyle : inactStyle; btnT10.classList.toggle('active', period === '2026-10'); }

      // Update 3-Timeline Matrix Cards Highlight
      var colToday = document.getElementById('tm-col-today');
      var colT9 = document.getElementById('tm-col-t9');
      var colT10 = document.getElementById('tm-col-t10');

      var activeColBorder = 'border:2px solid #089490;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.15s;background:#f0fdfa;position:relative;box-shadow:0 4px 12px rgba(8,148,144,0.1)';
      var inactiveColBorder = 'border:2px solid #e2e8f0;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.15s;background:#ffffff;position:relative';

      if (colToday) colToday.style.cssText = isDayMode ? activeColBorder : inactiveColBorder;
      if (colT9) colT9.style.cssText = (period === '2026-09') ? activeColBorder : inactiveColBorder;
      if (colT10) colT10.style.cssText = (period === '2026-10') ? activeColBorder : inactiveColBorder;

      // Update Executive Insight Banner
      var eibBanner = document.getElementById('executive-insight-banner');
      var eibIcon = document.getElementById('eib-icon');
      var eibTitle = document.getElementById('eib-title');
      var eibDesc = document.getElementById('eib-desc');
      var eibBtn = document.getElementById('eib-action-btn');

      if (eibBanner && eibTitle && eibDesc) {
        if (isDayMode) {
          eibBanner.style.background = '#f0f9ff';
          eibBanner.style.borderColor = '#bae6fd';
          if (eibIcon) { eibIcon.textContent = '⏱️'; eibIcon.style.background = '#e0f2fe'; eibIcon.style.color = '#0284c7'; }
          eibTitle.innerHTML = 'Tình Hình Hôm Nay (24/09/2026) — Dữ Liệu Ngày Thực Tế';
          eibDesc.innerHTML = 'Hôm nay phát sinh <strong>4 giao dịch thanh toán</strong> với tổng số tiền nạp: <strong>¥46,900</strong> (Hải Phòng Marine ¥27k, Senior Arch. Tuấn ¥9.9k, Laser Vĩnh Lộc ¥8k, CAD Hưng ¥2k). Lũy kế đến hôm nay đạt <strong>¥158,900</strong> (100% KPI tháng 9).';
          if (eibBtn) {
            eibBtn.textContent = '📋 Xem 4 HĐ Hôm Nay ➔';
            eibBtn.style.background = '#0284c7';
            eibBtn.onclick = function () { navigate('admin-dummy-data', null); setDummyTimelineFilter('2026-09-24'); };
          }
        } else if (period === '2026-09') {
          eibBanner.style.background = '#f0fdfa';
          eibBanner.style.borderColor = '#99f6e4';
          if (eibIcon) { eibIcon.textContent = '💡'; eibIcon.style.background = '#ccfbf1'; eibIcon.style.color = '#0f766e'; }
          eibTitle.innerHTML = 'Tình Trạng Tháng 09/2026 (LIVE - Hiện Tại)';
          eibDesc.innerHTML = 'Thực thu cả tháng đạt <strong>¥158,900</strong> (+84.8% so với T08) từ 12 hợp đồng nạp tiền. Doanh thu MRR: <strong>¥468,000 / tháng</strong>. Tỷ lệ lấp đầy ghế: <strong>85.0%</strong> (442/520 ghế). Toàn bộ hệ thống ổn định.';
          if (eibBtn) {
            eibBtn.textContent = '📅 Bảng Kê Thu Tiền T09 ➔';
            eibBtn.style.background = '#089490';
            eibBtn.onclick = function () { openDailyCashModal('2026-09'); };
          }
        } else if (period === '2026-10') {
          eibBanner.style.background = '#faf5ff';
          eibBanner.style.borderColor = '#e9d5ff';
          if (eibIcon) { eibIcon.textContent = '🎯'; eibIcon.style.background = '#f3e8ff'; eibIcon.style.color = '#7e22ce'; }
          eibTitle.innerHTML = 'Kế Hoạch & Dự Báo Tháng 10/2026 (Đầu Quý 4)';
          eibDesc.innerHTML = 'Dự kiến thu tiền mặt nhảy vọt lên <strong>¥246,300 (+55.0% so với T9)</strong> từ 19 hợp đồng đến kỳ (10 khách gói Quý tái nạp + 5 hợp đồng mới bắt đầu hiệu lực + khách hàng gói tháng). <span style="color:#d97706;font-weight:700">⚠️ Cảnh báo: Ghế chạm trần 95.8% (498/520 ghế, chỉ còn 22 ghế trống)!</span>';
          if (eibBtn) {
            eibBtn.textContent = '📋 Xem 19 HĐ Tháng 10 ➔';
            eibBtn.style.background = '#7e22ce';
            eibBtn.onclick = function () { navigate('admin-dummy-data', null); setDummyTimelineFilter('2026-10'); };
          }
        } else {
          eibBanner.style.background = '#f8fafc';
          eibBanner.style.borderColor = '#cbd5e1';
          if (eibIcon) { eibIcon.textContent = '📊'; eibIcon.style.background = '#e2e8f0'; eibIcon.style.color = '#334155'; }
          eibTitle.innerHTML = 'Số Liệu Kỳ ' + monthText + '/2026';
          eibDesc.innerHTML = 'Doanh thu MRR: <strong>' + fmt(metrics.totalMrr) + '</strong> • Dòng tiền nạp: <strong>' + fmt(metrics.totalCashIn) + '</strong> (' + metrics.payingCount + ' HĐ) • Ghế: <strong>' + metrics.totalSeats + '/' + metrics.totalCapacity + '</strong>.';
          if (eibBtn) {
            eibBtn.textContent = '📋 Bảng Kê Kỳ Này ➔';
            eibBtn.style.background = '#089490';
            eibBtn.onclick = function () { openDailyCashModal(period); };
          }
        }
      }

      // Donut Chart
      var dCenter = document.getElementById('donut-center-val');
      var dSub = document.getElementById('donut-sub-lbl');
      if (dCenter) dCenter.textContent = fmt(metrics.totalMrr);
      if (dSub) dSub.textContent = 'Doanh thu ' + (isDayMode ? 'Hôm nay' : monthText.replace('Tháng ', 'T'));

      var totalTierMrr = (metrics.tierMrr.ent || 0) + (metrics.tierMrr.pro || 0) + (metrics.tierMrr.basic || 0);
      if (totalTierMrr > 0) {
        var entEl = document.getElementById('lbl-ent-val');
        var proEl = document.getElementById('lbl-pro-val');
        var basEl = document.getElementById('lbl-basic-val');
        if (entEl) entEl.textContent = fmt(metrics.tierMrr.ent || 0);
        if (proEl) proEl.textContent = fmt(metrics.tierMrr.pro || 0);
        if (basEl) basEl.textContent = fmt(metrics.tierMrr.basic || 0);
      }

      // Cập nhật bảng dòng tiền chi tiết theo ngày
      if (typeof window.renderDailyCashflowDashboard === 'function') {
        window.renderDailyCashflowDashboard(period, seg);
      }

      // Cập nhật khối giám sát công nợ và vòng đời hợp đồng
      if (typeof window.renderDashboardOperations === 'function') {
        window.renderDashboardOperations(period, seg);
      }
    }

    // ===== GIÁM SÁT CÔNG NỢ & VÒNG ĐỜI HỢP ĐỒNG (OPERATIONAL INTELLIGENCE) =====
    window.currentOpsContractTab = 'NEW';
    window.switchOpsContractTab = function (tab) {
      window.currentOpsContractTab = tab;
      var pNew = document.getElementById('ops-tab-new-panel');
      var pRenew = document.getElementById('ops-tab-renew-panel');
      var bNew = document.getElementById('btn-ops-tab-new');
      var bRenew = document.getElementById('btn-ops-tab-renew');
      if (tab === 'NEW') {
        if (pNew) pNew.style.display = 'block';
        if (pRenew) pRenew.style.display = 'none';
        if (bNew) bNew.classList.add('active');
        if (bRenew) bRenew.classList.remove('active');
      } else {
        if (pNew) pNew.style.display = 'none';
        if (pRenew) pRenew.style.display = 'block';
        if (bNew) bNew.classList.remove('active');
        if (bRenew) bRenew.classList.add('active');
      }
    };

    window.renderDashboardOperations = function (periodStr, segment) {
      var period = periodStr || window.currentPeriod || '2026-09';
      var seg = segment || window.currentSegment || 'ALL';
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;

      function fmt(val) {
        if (!val) return '0đ';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var all = window.DUMMY_CONTRACTS_DATA || [];
      var contracts = all.filter(function (c) {
        if (seg === 'ALL') return true;
        return c.customerType === seg;
      });

      var effectiveMonth = (period === '2026-09-24') ? '2026-09' : period;
      var curDay = 24; // Mốc thời gian hệ thống

      // 1. Phân loại Công nợ & Kỳ hạn thu
      var collectedList = [];
      var dueSoonList = [];
      var overdueList = [];

      var payingInMonth = contracts.filter(function (c) {
        return c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1;
      });

      payingInMonth.forEach(function (c) {
        var isCol = window.isContractCollected(c, effectiveMonth, period);
        if (isCol) {
          collectedList.push(c);
        } else {
          if (c.billingDay >= curDay) {
            dueSoonList.push(c);
          } else {
            overdueList.push(c);
          }
        }
      });

      var sumCol = collectedList.reduce(function (s, c) { return s + c.billingAmount; }, 0);
      var sumDue = dueSoonList.reduce(function (s, c) { return s + c.billingAmount; }, 0);
      var sumOver = overdueList.reduce(function (s, c) { return s + c.billingAmount; }, 0);
      var totalBill = sumCol + sumDue + sumOver;
      var colPct = totalBill > 0 ? ((sumCol / totalBill) * 100).toFixed(1) : 100;

      // Update KPI cards in Section 1.5
      var elValCol = document.getElementById('ops-val-collected');
      var elCntCol = document.getElementById('ops-cnt-collected');
      var elValDue = document.getElementById('ops-val-due');
      var elCntDue = document.getElementById('ops-cnt-due');
      var elValOver = document.getElementById('ops-val-overdue');
      var elCntOver = document.getElementById('ops-cnt-overdue');
      var elHealth = document.getElementById('debt-health-badge');

      if (elValCol) elValCol.textContent = fmt(sumCol);
      if (elCntCol) elCntCol.textContent = collectedList.length + ' hợp đồng (' + colPct + '%)';
      if (elValDue) elValDue.textContent = fmt(sumDue);
      if (elCntDue) elCntDue.textContent = dueSoonList.length + ' hợp đồng (' + (100 - colPct).toFixed(1) + '%)';
      if (elValOver) elValOver.textContent = fmt(sumOver);
      if (elCntOver) elCntOver.textContent = overdueList.length + ' hợp đồng nợ trễ';
      if (elHealth) elHealth.textContent = 'Tỷ lệ thu đúng hạn: ' + colPct + '%';

      // Render Debt / Due list
      var debtContainer = document.getElementById('ops-debt-list');
      if (debtContainer) {
        if (dueSoonList.length === 0 && overdueList.length === 0) {
          debtContainer.innerHTML = '<div style="background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;padding:16px;text-align:center;color:#64748b;font-size:12px">🎉 Toàn bộ hợp đồng trong kỳ ' + effectiveMonth + ' đã hoàn tất thu tiền đúng hạn 100%!</div>';
        } else {
          var html = '';
          overdueList.forEach(function (c) {
            var daysLate = curDay - c.billingDay;
            html += '<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center">';
            html += '<div>';
            html += '<div style="font-weight:700;font-size:12px;color:#991b1b">' + c.customerName + ' <span style="font-size:10px;background:#fee2e2;color:#b91c1c;padding:1px 5px;border-radius:4px">Quá hạn ' + daysLate + ' ngày</span></div>';
            html += '<div style="font-size:11px;color:#7f1d1d;margin-top:2px">' + c.contactPerson + ' • ' + c.planTier + ' • Hạn: Ngày ' + c.billingDay + '/' + effectiveMonth.split('-')[1] + '</div>';
            html += '</div>';
            html += '<div style="text-align:right">';
            html += '<div style="font-size:13px;font-weight:800;color:#dc2626">' + fmt(c.billingAmount) + '</div>';
            html += '<button type="button" class="btn btn-outline btn-sm" onclick="showAdminToast(\'Đã gửi thông báo nhắc nợ đến ' + c.customerName + '\')" style="margin-top:4px;padding:1px 6px;font-size:10.5px;color:#dc2626;border-color:#fca5a5;background:#fff">📞 Đôn đốc</button>';
            html += '</div>';
            html += '</div>';
          });
          dueSoonList.forEach(function (c) {
            var daysLeft = c.billingDay - curDay;
            var badgeText = daysLeft === 0 ? 'Hôm nay' : ('Còn ' + daysLeft + ' ngày');
            html += '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center">';
            html += '<div>';
            html += '<div style="font-weight:700;font-size:12px;color:#92400e">' + c.customerName + ' <span style="font-size:10px;background:#fef3c7;color:#b45309;padding:1px 5px;border-radius:4px;font-weight:700">' + badgeText + '</span></div>';
            html += '<div style="font-size:11px;color:#78350f;margin-top:2px">' + c.contactPerson + ' • ' + c.planTier + ' (' + c.billingCycle + ') • Hạn: Ngày ' + c.billingDay + '/' + effectiveMonth.split('-')[1] + '</div>';
            html += '</div>';
            html += '<div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:3px">';
            html += '<div style="font-size:13px;font-weight:800;color:#b45309">' + fmt(c.billingAmount) + '</div>';
            html += '<div style="display:flex;gap:4px">';
            html += '<button type="button" class="btn btn-outline btn-sm" onclick="window.openReconciliationModal(\'ALL\', ' + c.billingDay + ')" style="padding:1px 6px;font-size:10.5px;color:#089490;border-color:#99f6e4;background:#f0fdfa" title="Xem trên bảng">🔍 Xem</button>';
            html += '<button type="button" class="btn btn-outline btn-sm" onclick="showAdminToast(\'Đã gửi nhắc lịch nạp tiền đến ' + c.customerName + '\')" style="padding:1px 6px;font-size:10.5px;color:#b45309;border-color:#fde68a;background:#fff" title="Nhắc nợ">✉️ Nhắc</button>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
          });
          debtContainer.innerHTML = html;
        }
      }

      // 2. Tình trạng Hợp đồng mới ký & Sắp hết hạn
      var newInMonth = contracts.filter(function (c) {
        return c.startDate && c.startDate.indexOf(effectiveMonth) === 0;
      });
      var newTotalAmt = newInMonth.reduce(function (s, c) { return s + c.billingAmount; }, 0);

      var elNewAmt = document.getElementById('ops-new-total-amt');
      var elNewCnt = document.getElementById('ops-new-total-cnt');
      var elNewBtn = document.getElementById('btn-ops-tab-new');
      if (elNewAmt) elNewAmt.textContent = fmt(newTotalAmt);
      if (elNewCnt) elNewCnt.textContent = newInMonth.length + ' HĐ phát sinh';
      if (elNewBtn) elNewBtn.textContent = '🌟 Mới ký (' + newInMonth.length + ')';

      var newListContainer = document.getElementById('ops-new-contracts-list');
      if (newListContainer) {
        if (newInMonth.length === 0) {
          newListContainer.innerHTML = '<div style="background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;padding:14px;text-align:center;color:#64748b;font-size:12px">Không có hợp đồng mới ký trong tháng ' + effectiveMonth + '</div>';
        } else {
          var nHtml = '';
          newInMonth.forEach(function (c) {
            nHtml += '<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;transition:background 0.2s">';
            nHtml += '<div>';
            nHtml += '<div style="font-weight:700;font-size:12px;color:#0f172a">' + c.customerName + ' <span style="font-size:9.5px;background:#f0fdfa;color:#089490;padding:1px 5px;border-radius:4px;font-weight:700;border:1px solid #ccfbf1">' + c.customerType + '</span></div>';
            nHtml += '<div style="font-size:11px;color:#64748b;margin-top:2px">' + c.planTier + ' (' + c.seats + ' ghế) • ' + c.billingCycle + ' • Ngày ký: ' + c.startDate + '</div>';
            nHtml += '</div>';
            nHtml += '<div style="text-align:right">';
            nHtml += '<div style="font-size:13px;font-weight:800;color:#089490">' + fmt(c.billingAmount) + '</div>';
            nHtml += '<span style="font-size:10px;color:#64748b">MRR: ' + fmt(c.mrrContribution) + '/tháng</span>';
            nHtml += '</div>';
            nHtml += '</div>';
          });
          newListContainer.innerHTML = nHtml;
        }
      }

      // Hợp đồng sắp hết hạn chu kỳ cần gia hạn
      var renewDue = contracts.filter(function (c) {
        return (c.cycleMonths === 3 || c.cycleMonths === 12) && c.billingAmount >= 15000;
      }).slice(0, 4);

      var renewTotalAmt = renewDue.reduce(function (s, c) { return s + c.billingAmount; }, 0);
      var elRenewAmt = document.getElementById('ops-renew-total-amt');
      var elRenewBtn = document.getElementById('btn-ops-tab-renew');
      if (elRenewAmt) elRenewAmt.textContent = fmt(renewTotalAmt);
      if (elRenewBtn) elRenewBtn.textContent = '⏳ Sắp hết hạn (' + renewDue.length + ')';

      var renewListContainer = document.getElementById('ops-renew-contracts-list');
      if (renewListContainer) {
        var rHtml = '';
        renewDue.forEach(function (c) {
          rHtml += '<div style="background:#ffffff;border:1px solid #fee2e2;border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center">';
          rHtml += '<div>';
          rHtml += '<div style="font-weight:700;font-size:12px;color:#1e293b">' + c.customerName + ' <span style="font-size:9.5px;background:#fef2f2;color:#dc2626;padding:1px 5px;border-radius:4px;font-weight:700">Tái ký Q4</span></div>';
          rHtml += '<div style="font-size:11px;color:#64748b;margin-top:2px">' + c.contactPerson + ' • ' + c.planTier + ' (' + c.billingCycle + ')</div>';
          rHtml += '</div>';
          rHtml += '<div style="text-align:right">';
          rHtml += '<div style="font-size:13px;font-weight:800;color:#b91c1c">' + fmt(c.billingAmount) + '</div>';
          rHtml += '<button type="button" class="btn btn-outline btn-sm" onclick="showAdminToast(\'Đã tạo đề xuất gia hạn gói cho ' + c.customerName + '\')" style="margin-top:3px;padding:1px 6px;font-size:10.5px;color:#b91c1c;border-color:#fca5a5;background:#fff">🔄 Đề xuất tái ký</button>';
          rHtml += '</div>';
          rHtml += '</div>';
        });
        renewListContainer.innerHTML = rHtml;
      }

      // Update Summary Header Badge
      var elSumBadge = document.getElementById('ops-summary-badge');
      if (elSumBadge) {
        elSumBadge.textContent = 'Kỳ ' + effectiveMonth + ': ' + collectedList.length + ' Đúng hạn • ' + dueSoonList.length + ' Sắp đến hạn • ' + newInMonth.length + ' HĐ mới';
      }
    };

    // ===== RENDER BẢNG DỮ LIỆU HỢP ĐỒNG KHÁCH HÀNG (DUMMY CONTRACTS DATA TABLE) =====
    // ===== RENDER BẢNG DIỄN BIẾN DÒNG TIỀN CHI TIẾT THEO NGÀY TRÊN DASHBOARD =====
    window.currentDashboardDailyDay = 'ALL';
    window.currentDashboardDailyPeriod = '2026-09';

    // ===== RENDER BẢNG DIỄN BIẾN DÒNG TIỀN CHI TIẾT THEO NGÀY TRÊN DASHBOARD =====
    window.currentDashboardDailyDay = 'ALL';
    window.currentDashboardDailyPeriod = '2026-09';

    window.dashDailySearchQuery = '';

    window.toggleDashboardFormulas = function () {
      var box = document.getElementById('dash-calculation-formulas-box');
      var btn = document.getElementById('lbl-dash-formula-btn');
      if (!box) return;
      if (box.style.display === 'none' || !box.style.display) {
        box.style.display = 'block';
        if (btn) btn.textContent = 'Ẩn Công Thức';
      } else {
        box.style.display = 'none';
        if (btn) btn.textContent = 'Công Thức Tính Toán';
      }
    };

    window.onDashDailySearch = function (val) {
      window.dashDailySearchQuery = (val || '').trim().toLowerCase();
      window.renderDailyCashflowDashboard(null, null, window.currentDashboardDailyDay);
    };

    window.currentDashboardDailyDay = 'ALL';
    window.currentDashboardDailyPeriod = '2026-09';
    window.currentDashboardDailySegFilter = 'ALL';
    window.dashDailySearchQuery = '';

    window.toggleDashboardFormulas = function () {
      var box = document.getElementById('dash-calculation-formulas-box');
      var btn = document.getElementById('lbl-dash-formula-btn');
      if (!box) return;
      if (box.style.display === 'none' || !box.style.display) {
        box.style.display = 'block';
        if (btn) btn.textContent = 'Ẩn Công Thức';
      } else {
        box.style.display = 'none';
        if (btn) btn.textContent = 'Công Thức Tính Toán';
      }
    };

    window.onDashDailySearch = function (val) {
      window.dashDailySearchQuery = (val || '').trim().toLowerCase();
      window.renderDailyCashflowDashboard();
    };

    window.setDashboardDailySegmentFilter = function (seg) {
      window.currentDashboardDailySegFilter = seg || 'ALL';
      var btnAll = document.getElementById('btn-seg-filter-all');
      var btnB2b = document.getElementById('btn-seg-filter-b2b');
      var btnB2c = document.getElementById('btn-seg-filter-b2c');
      if (btnAll) {
        btnAll.style.background = (seg === 'ALL' ? '#0f172a' : '#ffffff');
        btnAll.style.color = (seg === 'ALL' ? '#ffffff' : '#475569');
        btnAll.style.border = (seg === 'ALL' ? 'none' : '1px solid #cbd5e1');
      }
      if (btnB2b) {
        btnB2b.style.background = (seg === 'B2B' ? '#0284c7' : '#ffffff');
        btnB2b.style.color = (seg === 'B2B' ? '#ffffff' : '#0369a1');
        btnB2b.style.border = (seg === 'B2B' ? 'none' : '1px solid #cbd5e1');
      }
      if (btnB2c) {
        btnB2c.style.background = (seg === 'B2C' ? '#7e22ce' : '#ffffff');
        btnB2c.style.color = (seg === 'B2C' ? '#ffffff' : '#7e22ce');
        btnB2c.style.border = (seg === 'B2C' ? 'none' : '1px solid #cbd5e1');
      }
      window.renderDailyCashflowDashboard();
    };

    window.currentDashboardDailyDay = 'ALL';
    window.currentDashboardDailyPeriod = '2026-09';
    window.currentDashboardDailySegFilter = 'ALL';
    window.dashDailySearchQuery = '';

    window.toggleDashboardFormulas = function () {
      var box = document.getElementById('dash-calculation-formulas-box');
      var btn = document.getElementById('lbl-dash-formula-btn');
      if (!box) return;
      if (box.style.display === 'none' || !box.style.display) {
        box.style.display = 'block';
        if (btn) btn.textContent = 'Ẩn Công Thức';
      } else {
        box.style.display = 'none';
        if (btn) btn.textContent = 'Công Thức Tính Toán';
      }
    };

    window.onDashDailySearch = function (val) {
      window.dashDailySearchQuery = (val || '').trim().toLowerCase();
      window.renderDailyCashflowDashboard();
    };

    window.setDashboardDailySegmentFilter = function (seg) {
      window.currentDashboardDailySegFilter = seg || 'ALL';
      var btnAll = document.getElementById('btn-seg-filter-all');
      var btnB2b = document.getElementById('btn-seg-filter-b2b');
      var btnB2c = document.getElementById('btn-seg-filter-b2c');
      if (btnAll) {
        btnAll.style.background = (seg === 'ALL' ? '#0f172a' : '#ffffff');
        btnAll.style.color = (seg === 'ALL' ? '#ffffff' : '#475569');
        btnAll.style.border = (seg === 'ALL' ? 'none' : '1px solid #cbd5e1');
      }
      if (btnB2b) {
        btnB2b.style.background = (seg === 'B2B' ? '#0284c7' : '#ffffff');
        btnB2b.style.color = (seg === 'B2B' ? '#ffffff' : '#0369a1');
        btnB2b.style.border = (seg === 'B2B' ? 'none' : '1px solid #cbd5e1');
      }
      if (btnB2c) {
        btnB2c.style.background = (seg === 'B2C' ? '#7e22ce' : '#ffffff');
        btnB2c.style.color = (seg === 'B2C' ? '#ffffff' : '#7e22ce');
        btnB2c.style.border = (seg === 'B2C' ? 'none' : '1px solid #cbd5e1');
      }
      window.renderDailyCashflowDashboard();
    };

    window.switchDailyCashflowMonth = function (targetMonth) {
      window.currentPeriod = targetMonth;
      window.currentDashboardDailyPeriod = targetMonth;
      window.currentDashboardDailyDay = 'ALL';
      quickJumpPeriod(targetMonth);
    };

        // ===== QUẢN LÝ TRẠNG THÁI THU TIỀN (COLLECTED vs PENDING) =====
    window.currentDashboardDailyStatusFilter = 'ALL';
    window.currentDashboardMainView = 'daily';
    window.currentDashboardDailyDay = 'ALL';
    window.currentDashboardDailyPeriod = '2026-09';
    window.currentDashboardDailySegFilter = 'ALL';
    window.dashDailySearchQuery = '';

    window.switchDashboardMainView = function (view) {
      window.currentDashboardMainView = view;
      var vDaily = document.getElementById('dash-view-daily');
      var vCharts = document.getElementById('dash-view-charts');
      if (view === 'daily' && vDaily) {
        vDaily.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (view === 'charts' && vCharts) {
        vCharts.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.setDashboardDailyStatusFilter = function (status, noScroll) {
      window.currentDashboardDailyStatusFilter = status || 'ALL';

      // Update button styling across toolbar & header
      var btnAll = document.getElementById('btn-dash-st-all');
      var btnCol = document.getElementById('btn-dash-st-col');
      var btnPen = document.getElementById('btn-dash-st-pen');
      var btnAll2 = document.getElementById('btn-dash-st-all-header');
      var btnCol2 = document.getElementById('btn-dash-st-col-header');
      var btnPen2 = document.getElementById('btn-dash-st-pen-header');

      [btnAll, btnAll2].forEach(function (b) {
        if (b) {
          b.style.background = (status === 'ALL' ? '#0f172a' : '#ffffff');
          b.style.color = (status === 'ALL' ? '#ffffff' : '#334155');
          b.style.border = (status === 'ALL' ? 'none' : '1px solid #cbd5e1');
        }
      });
      [btnCol, btnCol2].forEach(function (b) {
        if (b) {
          b.style.background = (status === 'COLLECTED' ? '#15803d' : '#ffffff');
          b.style.color = (status === 'COLLECTED' ? '#ffffff' : '#15803d');
          b.style.border = (status === 'COLLECTED' ? 'none' : '1px solid #86efac');
        }
      });
      [btnPen, btnPen2].forEach(function (b) {
        if (b) {
          b.style.background = (status === 'PENDING' ? '#b45309' : '#ffffff');
          b.style.color = (status === 'PENDING' ? '#ffffff' : '#b45309');
          b.style.border = (status === 'PENDING' ? 'none' : '1px solid #fde68a');
        }
      });

      // Highlight active KPI cards
      var cardCol = document.getElementById('card-kpi-collected');
      var cardPen = document.getElementById('card-kpi-pending');
      if (cardCol) {
        cardCol.style.boxShadow = (status === 'COLLECTED') ? '0 0 0 3px rgba(22, 163, 74, 0.45), 0 4px 12px rgba(22, 163, 74, 0.15)' : 'none';
        cardCol.style.borderColor = (status === 'COLLECTED') ? '#16a34a' : '';
      }
      if (cardPen) {
        cardPen.style.boxShadow = (status === 'PENDING') ? '0 0 0 3px rgba(217, 119, 6, 0.45), 0 4px 12px rgba(217, 119, 6, 0.15)' : 'none';
        cardPen.style.borderColor = (status === 'PENDING') ? '#d97706' : '';
      }

      // Reset day filter to ALL to show all items for this status
      window.currentDashboardDailyDay = 'ALL';

      // Re-render
      window.renderDailyCashflowDashboard();

      // Sync lower dummy contracts table if present
      if (typeof window.setDummyStatusFilter === 'function') {
        window.setDummyStatusFilter(status);
      }

      // Update modal title and toast feedback dynamically
      var dynPeriod = window.currentDashboardDailyPeriod || window.currentPeriod || '2026-09';
      var dynMetrics = window.getDynamicPeriodMetrics ? window.getDynamicPeriodMetrics(dynPeriod, window.currentSegment || 'ALL') : null;
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      function dynFmt(val) {
        if (!val) return '0đ';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var titleEl = document.getElementById('reconcile-modal-title');
      if (titleEl) {
        if (status === 'COLLECTED') {
          var colCount = dynMetrics ? dynMetrics.collectedCount : 22;
          titleEl.innerHTML = '🟢 SỔ DÒNG TIỀN: DANH SÁCH ' + colCount + ' HỢP ĐỒNG ĐÃ THU';
        } else if (status === 'PENDING') {
          var penCount = dynMetrics ? dynMetrics.pendingCount : 2;
          titleEl.innerHTML = '🟡 SỔ DÒNG TIỀN: DANH SÁCH ' + penCount + ' HỢP ĐỒNG CHƯA THU (CHỜ NẠP)';
        } else {
          titleEl.innerHTML = '📅 SỔ DÒNG TIỀN & ĐỐI SOÁT THEO NGÀY';
        }
      }

      // Scroll only if not suppressed and modal is not open
      var dailyPanel = document.getElementById('dash-view-daily');
      if (!noScroll && dailyPanel && dailyPanel.style.display !== 'none' && dailyPanel.style.position !== 'fixed') {
        dailyPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Toast feedback
      if (typeof window.showAdminToast === 'function') {
        if (status === 'COLLECTED') {
          var cCnt = dynMetrics ? dynMetrics.collectedCount : 22;
          var cAmt = dynMetrics ? dynFmt(dynMetrics.collectedCash) : '¥248,500';
          window.showAdminToast('Đang lọc ' + cCnt + ' hợp đồng ĐÃ THU TIỀN (' + cAmt + ')', 'success');
        } else if (status === 'PENDING') {
          var pCnt = dynMetrics ? dynMetrics.pendingCount : 2;
          var pAmt = dynMetrics ? dynFmt(dynMetrics.pendingCash) : '¥21,300';
          window.showAdminToast('Đang lọc ' + pCnt + ' hợp đồng CHƯA THU TIỀN (' + pAmt + ')', 'info');
        } else {
          window.showAdminToast('Đang hiển thị toàn bộ hợp đồng trong kỳ', 'info');
        }
      }
    };

    window.openReconciliationModal = function (status, specificDay) {
      var m = document.getElementById('dash-view-daily');
      if (!m) return;
      m.style.display = 'flex';
      document.body.style.overflow = 'hidden';

      if (status) {
        window.setDashboardDailyStatusFilter(status, true);
      }
      if (specificDay !== undefined) {
        window.filterContractsBySpecificDay(specificDay);
      }
    };

    window.closeReconciliationModal = function () {
      var m = document.getElementById('dash-view-daily');
      if (m) {
        m.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeReconciliationModal();
      }
    });

    window.selectDailyMilestoneDay = function (day) {
      window.currentDashboardDailyDay = day;
      window.renderDailyCashflowDashboard();
    };

    window.toggleDashboardFormulas = function () {
      var box = document.getElementById('dash-calculation-formulas-box');
      if (!box) return;
      box.style.display = (box.style.display === 'none' || !box.style.display) ? 'block' : 'none';
    };

    window.onDashDailySearch = function (val) {
      window.dashDailySearchQuery = (val || '').trim().toLowerCase();
      window.renderDailyCashflowDashboard();
    };

    window.setDashboardDailySegmentFilter = function (seg) {
      window.currentDashboardDailySegFilter = seg || 'ALL';
      var btnAll = document.getElementById('btn-seg-filter-all');
      var btnB2b = document.getElementById('btn-seg-filter-b2b');
      var btnB2c = document.getElementById('btn-seg-filter-b2c');
      if (btnAll) {
        btnAll.style.background = (seg === 'ALL' ? '#0f172a' : '#ffffff');
        btnAll.style.color = (seg === 'ALL' ? '#ffffff' : '#475569');
        btnAll.style.border = (seg === 'ALL' ? 'none' : '1px solid #cbd5e1');
      }
      if (btnB2b) {
        btnB2b.style.background = (seg === 'B2B' ? '#0284c7' : '#ffffff');
        btnB2b.style.color = (seg === 'B2B' ? '#ffffff' : '#0369a1');
        btnB2b.style.border = (seg === 'B2B' ? 'none' : '1px solid #cbd5e1');
      }
      if (btnB2c) {
        btnB2c.style.background = (seg === 'B2C' ? '#7e22ce' : '#ffffff');
        btnB2c.style.color = (seg === 'B2C' ? '#ffffff' : '#7e22ce');
        btnB2c.style.border = (seg === 'B2C' ? 'none' : '1px solid #cbd5e1');
      }
      window.renderDailyCashflowDashboard();
    };

    window.renderDailyCashflowDashboard = function (arg1, arg2, arg3) {
      var container = document.getElementById('dashboard-daily-cashflow-panel');
      if (!container) return;

      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      // Smart resolution of parameters
      var s = window.currentSegment || 'ALL';
      var p = window.currentPeriod || '2026-09';
      var specificDay = undefined;

      [arg1, arg2, arg3].forEach(function (arg) {
        if (typeof arg === 'string') {
          if (arg === 'ALL' || arg === 'B2B' || arg === 'B2C') {
            s = arg;
          } else if (arg.startsWith('2026') || arg.includes('-')) {
            p = arg;
          }
        } else if (typeof arg === 'number') {
          specificDay = arg;
        }
      });

      if (arg1 === 'ALL' && arg2 === undefined && arg3 === undefined) {
        specificDay = 'ALL';
      }
      if (arg3 !== undefined && arg3 !== null) {
        specificDay = arg3;
      }

      if (window.currentDashboardDailySegFilter && window.currentDashboardDailySegFilter !== 'ALL') {
        s = window.currentDashboardDailySegFilter;
      }

      var isDayMode = (p === '2026-09-24');
      var targetMonth = isDayMode ? '2026-09' : p;
      var pParts = targetMonth.split('-');
      var pYear = pParts[0] || '2026';
      var pMonthNum = parseInt(pParts[1], 10) || 9;
      var monthCode = (pMonthNum < 10 ? '0' : '') + pMonthNum;
      var monthName = 'Tháng ' + monthCode + '/' + pYear;

      if (specificDay !== undefined) {
        window.currentDashboardDailyDay = specificDay;
      } else if (isDayMode) {
        window.currentDashboardDailyDay = 24;
      } else if (!window.currentDashboardDailyDay || window.currentDashboardDailyPeriod !== targetMonth) {
        window.currentDashboardDailyDay = 'ALL';
      }
      window.currentDashboardDailyPeriod = targetMonth;
      var activeDay = window.currentDashboardDailyDay;

      // Sync Month Selectors
      var topbarSel = document.getElementById('vb-period-select');
      if (topbarSel) topbarSel.value = targetMonth;
      var tabSel = document.getElementById('dash-month-selector-main');
      if (tabSel) tabSel.value = targetMonth;

      // Collect all transactions for targetMonth (bao gồm cả Đã thu và Chưa thu)
      var allTx = [];
      var contractsSource = window.DUMMY_CONTRACTS_DATA || window.DEFAULT_DUMMY_CONTRACTS || [];
      contractsSource.forEach(function (c) {
        if (c.paymentMonths && c.paymentMonths.indexOf(targetMonth) !== -1) {
          if (s === 'ALL' || c.customerType === s) {
            var bDay = c.billingDay || 1;
            var isCol = (typeof window.isContractCollected === 'function')
              ? window.isContractCollected(c, targetMonth, p)
              : (bDay <= 24);

            // Nếu đang xem chế độ Hôm nay 24/09 thì chỉ lấy ngày 24
            if (isDayMode && bDay !== 24) return;

            allTx.push({
              dayNum: bDay,
              dayStr: (bDay < 10 ? '0' : '') + bDay + '/' + monthCode + '/' + pYear,
              id: c.id,
              name: c.customerName,
              contact: c.contactPerson,
              type: c.customerType,
              plan: c.planTier,
              cycleMonths: (c.billingCycle === 'annual' ? 12 : (c.billingCycle === 'quarterly' ? 3 : 1)),
              cycleLabel: (c.billingCycle === 'annual' ? 'Năm' : (c.billingCycle === 'quarterly' ? 'Quý' : 'Tháng')),
              amount: c.billingAmount,
              seats: c.seats || 1,
              method: c.paymentMethod || 'Chuyển khoản NH',
              bankRef: c.bankRef || ('REF-' + c.id),
              notes: c.notes || '',
              isCollected: isCol
            });
          }
        }
      });

      // Sort by dayNum ascending
      allTx.sort(function (a, b) {
        if (a.dayNum !== b.dayNum) return a.dayNum - b.dayNum;
        return a.id.localeCompare(b.id);
      });

      // Running cumulative and MRR
      var running = 0;
      allTx.forEach(function (tx) {
        running += tx.amount;
        tx.cumulative = running;
        tx.mrr = Math.round(tx.amount / tx.cycleMonths);
      });

      // Phân tách số liệu Đã Thu vs Chưa Thu toàn tháng
      var totalMonthCash = allTx.reduce(function (acc, x) { return acc + x.amount; }, 0);
      var collectedMonthCash = allTx.filter(function (x) { return x.isCollected; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var pendingMonthCash = allTx.filter(function (x) { return !x.isCollected; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var collectedCount = allTx.filter(function (x) { return x.isCollected; }).length;
      var pendingCount = allTx.filter(function (x) { return !x.isCollected; }).length;

      // Cập nhật số đếm badge
      var dashBadgeCol = document.getElementById('dash-badge-col-count');
      var dashBadgePen = document.getElementById('dash-badge-pen-count');
      if (dashBadgeCol) dashBadgeCol.textContent = collectedCount;
      if (dashBadgePen) dashBadgePen.textContent = pendingCount;

      var tabBadge = document.getElementById('tab-daily-badge');
      if (tabBadge) {
        tabBadge.textContent = collectedCount + ' Đã thu • ' + pendingCount + ' Chờ thu';
      }

      // Group by day for left column milestones
      var dayMap = {};
      allTx.forEach(function (tx) {
        if (!dayMap[tx.dayNum]) {
          dayMap[tx.dayNum] = {
            day: tx.dayNum,
            dayStr: tx.dayStr,
            count: 0,
            sum: 0,
            collectedSum: 0,
            pendingSum: 0,
            b2b: 0,
            b2c: 0,
            cumulative: tx.cumulative
          };
        }
        dayMap[tx.dayNum].count++;
        dayMap[tx.dayNum].sum += tx.amount;
        if (tx.isCollected) dayMap[tx.dayNum].collectedSum += tx.amount;
        else dayMap[tx.dayNum].pendingSum += tx.amount;
        dayMap[tx.dayNum].cumulative = tx.cumulative;
        if (tx.type === 'B2B') dayMap[tx.dayNum].b2b += tx.amount;
        else dayMap[tx.dayNum].b2c += tx.amount;
      });

      var uniqueDays = Object.keys(dayMap).map(function (k) { return dayMap[k]; }).sort(function (a, b) { return a.day - b.day; });
      var maxDaySum = uniqueDays.reduce(function (max, d) { return Math.max(max, d.sum); }, 1);

      // Update Left Column Header & All-Month button
      var matrixTitleEl = document.getElementById('daily-matrix-title');
      var matrixSubtitleEl = document.getElementById('daily-matrix-subtitle');
      var matrixBadgeEl = document.getElementById('daily-matrix-badge');
      var allSumBadge = document.getElementById('daily-all-sum-badge');
      var allCountSub = document.getElementById('daily-all-count-sub');
      var btnAll = document.getElementById('daily-milestone-all');

      var currentStFilter = window.currentDashboardDailyStatusFilter || 'ALL';

      if (matrixTitleEl) matrixTitleEl.textContent = 'Mốc Ngày Thu — ' + monthName;
      if (matrixSubtitleEl) {
        if (currentStFilter === 'COLLECTED') {
          matrixSubtitleEl.textContent = 'Đang lọc ' + collectedCount + ' hợp đồng đã vào két (' + fmt(collectedMonthCash) + ')';
        } else if (currentStFilter === 'PENDING') {
          matrixSubtitleEl.textContent = 'Đang lọc ' + pendingCount + ' hợp đồng chờ nạp (' + fmt(pendingMonthCash) + ')';
        } else {
          matrixSubtitleEl.textContent = uniqueDays.length + ' ngày có nạp (' + collectedCount + ' đã thu • ' + pendingCount + ' chờ thu)';
        }
      }
      if (matrixBadgeEl) matrixBadgeEl.textContent = uniqueDays.length + ' mốc ngày';
      if (allSumBadge) {
        if (currentStFilter === 'COLLECTED') allSumBadge.textContent = fmt(collectedMonthCash);
        else if (currentStFilter === 'PENDING') allSumBadge.textContent = fmt(pendingMonthCash);
        else allSumBadge.textContent = fmt(totalMonthCash);
      }
      if (allCountSub) {
        if (currentStFilter === 'COLLECTED') allCountSub.textContent = collectedCount + ' HĐ đã vào két';
        else if (currentStFilter === 'PENDING') allCountSub.textContent = pendingCount + ' HĐ đang chờ thu';
        else allCountSub.textContent = allTx.length + ' hợp đồng trong tháng';
      }

      if (btnAll) {
        var isAllActive = (activeDay === 'ALL');
        btnAll.style.background = isAllActive ? '#089490' : '#f8fafc';
        btnAll.style.color = isAllActive ? '#ffffff' : '#334155';
        btnAll.style.border = isAllActive ? 'none' : '1px solid #cbd5e1';
        btnAll.style.boxShadow = isAllActive ? '0 2px 6px rgba(8,148,144,0.3)' : 'none';
      }

      // Render Left Column Milestones List
      var milestonesList = document.getElementById('daily-milestones-list');
      if (milestonesList) {
        var visibleMilestones = uniqueDays;
        if (currentStFilter === 'COLLECTED') {
          visibleMilestones = uniqueDays.filter(function (d) { return d.collectedSum > 0; });
        } else if (currentStFilter === 'PENDING') {
          visibleMilestones = uniqueDays.filter(function (d) { return d.pendingSum > 0; });
        }

        if (visibleMilestones.length === 0) {
          milestonesList.innerHTML = '<div style="padding:20px;text-align:center;color:#94a3b8;font-size:12px">Không có mốc ngày nào khớp với bộ lọc.</div>';
        } else {
          var mListHTML = '';
          visibleMilestones.forEach(function (d) {
            var isSelected = (activeDay === d.day);
            var isToday = (targetMonth === '2026-09' && d.day === 24);
            var pct = Math.max(8, Math.round((d.sum / maxDaySum) * 100));

            var cardBg = isSelected
              ? (isToday ? '#fffbeb' : '#f0fdfa')
              : '#ffffff';
            var cardBorder = isSelected
              ? (isToday ? '2px solid #d97706' : '2px solid #089490')
              : (isToday ? '1px solid #fde68a' : '1px solid #e2e8f0');

            var badgeTag = '';
            if (isToday) {
              badgeTag = '<span style="font-size:10px;background:#ef4444;color:#fff;padding:1px 5px;border-radius:4px;font-weight:800">★ LIVE</span>';
            } else if (d.pendingSum === 0) {
              badgeTag = '<span style="font-size:10px;background:#dcfce7;color:#15803d;padding:1px 5px;border-radius:4px;font-weight:700">✓ Đã thu</span>';
            } else {
              badgeTag = '<span style="font-size:10px;background:#fffdf5;color:#b45309;padding:1px 5px;border-radius:4px;font-weight:700;border:1px solid #fde68a">⏳ Chờ thu</span>';
            }

            var dayAmount = (currentStFilter === 'COLLECTED') ? d.collectedSum : ((currentStFilter === 'PENDING') ? d.pendingSum : d.sum);

            mListHTML += '<div onclick="selectDailyMilestoneDay(' + d.day + ')" style="cursor:pointer;padding:9px 12px;border-radius:10px;background:' + cardBg + ';border:' + cardBorder + ';transition:all 0.15s;position:relative" title="Xem chi tiết ngày ' + d.day + '/' + monthCode + '">';
            mListHTML += '<div style="display:flex;justify-content:space-between;align-items:center">';
            mListHTML += '<div style="display:flex;align-items:center;gap:6px"><strong style="font-size:12.5px;color:' + (isSelected ? '#089490' : '#0f172a') + '">Ngày ' + (d.day < 10 ? '0' : '') + d.day + '/' + monthCode + '</strong>' + badgeTag + '</div>';
            mListHTML += '<strong style="font-size:13px;color:' + (isSelected ? '#089490' : '#0f172a') + '">' + fmt(dayAmount) + '</strong>';
            mListHTML += '</div>';

            mListHTML += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;font-size:11px;color:#64748b">';
            mListHTML += '<span>' + d.count + ' HĐ (🟢 ' + fmt(d.collectedSum) + (d.pendingSum > 0 ? (' • 🟡 ' + fmt(d.pendingSum)) : '') + ')</span>';
            mListHTML += '<span>Lũy kế: ' + fmt(d.cumulative) + '</span>';
            mListHTML += '</div>';

            mListHTML += '<div style="margin-top:6px;width:100%;height:3px;background:#f1f5f9;border-radius:2px;overflow:hidden">';
            mListHTML += '<div style="height:100%;width:' + pct + '%;background:' + (isSelected ? (isToday ? '#d97706' : '#089490') : '#cbd5e1') + ';border-radius:2px"></div>';
            mListHTML += '</div>';

            mListHTML += '</div>';
          });
          milestonesList.innerHTML = mListHTML;
        }
      }

      // Update Left Column Footer
      var matB2bEl = document.getElementById('matrix-sum-b2b');
      var matB2cEl = document.getElementById('matrix-sum-b2c');
      var b2bTotalMonth = allTx.filter(function (x) { return x.type === 'B2B'; }).reduce(function (s, x) { return s + x.amount; }, 0);
      var b2cTotalMonth = allTx.filter(function (x) { return x.type === 'B2C'; }).reduce(function (s, x) { return s + x.amount; }, 0);
      if (matB2bEl) matB2bEl.textContent = fmt(b2bTotalMonth);
      if (matB2cEl) matB2cEl.textContent = fmt(b2cTotalMonth);

      // Filter by activeDay
      var displayTx = allTx;
      if (activeDay !== 'ALL') {
        displayTx = allTx.filter(function (tx) { return tx.dayNum === activeDay; });
      }

      // Filter by Payment Status (ĐÃ THU vs CHƯA THU)
      if (currentStFilter === 'COLLECTED') {
        displayTx = displayTx.filter(function (tx) { return tx.isCollected === true; });
      } else if (currentStFilter === 'PENDING') {
        displayTx = displayTx.filter(function (tx) { return tx.isCollected === false; });
      }

      // Filter by Search Query
      var q = window.dashDailySearchQuery;
      if (q) {
        displayTx = displayTx.filter(function (tx) {
          var str = (tx.name + ' ' + tx.contact + ' ' + tx.id + ' ' + tx.plan + ' ' + tx.method + ' ' + tx.notes + ' ' + tx.dayStr + ' ' + tx.bankRef).toLowerCase();
          return str.indexOf(q) !== -1;
        });
      }

      var currentDispTotal = displayTx.reduce(function (acc, x) { return acc + x.amount; }, 0);
      var dispB2b = displayTx.filter(function (x) { return x.type === 'B2B'; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var dispB2c = displayTx.filter(function (x) { return x.type === 'B2C'; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var dispCollected = displayTx.filter(function (x) { return x.isCollected; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var dispPending = displayTx.filter(function (x) { return !x.isCollected; }).reduce(function (acc, x) { return acc + x.amount; }, 0);

      // Update Search Counter Badge
      var searchCounterEl = document.getElementById('dash-daily-search-counter');
      if (searchCounterEl) {
        var dayScopeText = (activeDay === 'ALL') ? '' : ('Ngày ' + (activeDay < 10 ? '0' : '') + activeDay + ': ');
        var stLabel = (currentStFilter === 'COLLECTED') ? 'Đã thu • ' : ((currentStFilter === 'PENDING') ? 'Chờ thu • ' : '');
        searchCounterEl.textContent = dayScopeText + stLabel + displayTx.length + ' HĐ • ' + fmt(currentDispTotal);
      }

      // Update Formulas Box Content
      var fTitleEl = document.getElementById('dash-formulas-title');
      var fCashinEl = document.getElementById('dash-formula-cashin');
      var fMrrEl = document.getElementById('dash-formula-mrr');
      var fSegEl = document.getElementById('dash-formula-seg');

      if (fTitleEl) fTitleEl.textContent = '📐 Công Thức Đối Soát — ' + monthName + (activeDay !== 'ALL' ? (' (Ngày ' + (activeDay < 10 ? '0' : '') + activeDay + ')') : '');
      if (fCashinEl) {
        fCashinEl.innerHTML = '🟢 Đã thu: <strong>' + fmt(collectedMonthCash) + '</strong> (' + collectedCount + ' HĐ)<br>🟡 Chưa thu: <strong>' + fmt(pendingMonthCash) + '</strong> (' + pendingCount + ' HĐ)<br>💰 Tổng dự thu = <strong>' + fmt(totalMonthCash) + '</strong>';
      }
      if (fMrrEl) {
        var totalMrrCalc = allTx.reduce(function (sum, tx) { return sum + tx.mrr; }, 0);
        fMrrEl.innerHTML = 'MRR = ∑(HĐ/chu kỳ) = <strong>' + fmt(totalMrrCalc) + '/tháng</strong> (ARR = ' + fmt(totalMrrCalc * 12) + ')';
      }
      if (fSegEl) {
        var b2bPct = totalMonthCash > 0 ? Math.round((b2bTotalMonth / totalMonthCash) * 100) : 0;
        var b2cPct = totalMonthCash > 0 ? Math.round((b2cTotalMonth / totalMonthCash) * 100) : 0;
        fSegEl.innerHTML = 'B2B: ' + fmt(b2bTotalMonth) + ' (' + b2bPct + '%) | B2C: ' + fmt(b2cTotalMonth) + ' (' + b2cPct + '%)';
      }

      // Render Table Rows
      var tbody = document.getElementById('dashboard-daily-tbody');
      if (tbody) {
        if (displayTx.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;font-size:12.5px"><div style="font-size:20px;margin-bottom:6px">🔍</div>Không tìm thấy hợp đồng nào khớp với bộ lọc.<br><button type="button" onclick="document.getElementById(\'dash-daily-search\').value=\'\';onDashDailySearch(\'\');setDashboardDailyStatusFilter(\'ALL\');selectDailyMilestoneDay(\'ALL\');" style="margin-top:8px;padding:4px 10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:11.5px;cursor:pointer">Đặt lại bộ lọc</button></td></tr>';
        } else {
          var rowsHTML = '';
          displayTx.forEach(function (tx) {
            var isToday = (tx.dayNum === 24 && targetMonth === '2026-09');

            var segBadge = (tx.type === 'B2B')
              ? '<span style="background:#e0f2fe;color:#0369a1;padding:1px 6px;border-radius:6px;font-size:10px;font-weight:700">🏢 B2B</span>'
              : '<span style="background:#f3e8ff;color:#7e22ce;padding:1px 6px;border-radius:6px;font-size:10px;font-weight:700">👤 B2C</span>';

            var cycleBadge = (tx.cycleMonths === 12)
              ? '<span style="background:#ccfbf1;color:#0f766e;padding:1px 5px;border-radius:4px;font-size:10px;font-weight:700">1 Năm</span>'
              : (tx.cycleMonths === 3
                ? '<span style="background:#e0f2fe;color:#0284c7;padding:1px 5px;border-radius:4px;font-size:10px;font-weight:700">3 Tháng</span>'
                : '<span style="background:#fef3c7;color:#b45309;padding:1px 5px;border-radius:4px;font-size:10px;font-weight:700">1 Tháng</span>');

            var calcFormula = '<span style="font-family:Consolas,monospace;font-size:10.5px;color:#0f766e">' + fmt(tx.amount) + ' ÷ ' + tx.cycleMonths + ' = <strong>' + fmt(tx.mrr) + ' MRR</strong></span>';

            var statusBadge = tx.isCollected
              ? '<span onclick="window.toggleContractPaymentStatus(\'' + tx.id + '\');window.applyDashboardMetrics();window.renderDailyCashflowDashboard();" style="cursor:pointer;background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;border:1px solid #86efac;display:inline-flex;align-items:center;gap:3px" title="Bấm vào để đổi sang Chưa thu (Pending)">🟢 Đã thu ↺</span>'
              : '<span onclick="window.toggleContractPaymentStatus(\'' + tx.id + '\');window.applyDashboardMetrics();window.renderDailyCashflowDashboard();" style="cursor:pointer;background:#fffdf5;color:#b45309;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;border:1px solid #fde68a;display:inline-flex;align-items:center;gap:3px" title="Bấm vào để đổi sang Đã thu (Collected)">🟡 Chưa thu ↺</span>';

            var amountColor = tx.isCollected ? '#089490' : '#d97706';
            var rowBg = isToday ? ' style="background:#fffdf5"' : (!tx.isCollected ? ' style="background:#fffdfa"' : '');

            rowsHTML += '<tr' + rowBg + ' style="border-bottom:1px solid #f1f5f9;transition:background-color 0.12s ease">';
            rowsHTML += '<td style="padding:8px 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><code style="color:#089490;font-weight:700;font-size:11px;background:#f0fdfa;padding:2px 5px;border-radius:4px;border:1px solid #ccfbf1">' + tx.id + '</code></td>';
            rowsHTML += '<td style="padding:8px 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><span style="font-weight:700;color:#0f172a">' + tx.name + '</span><div style="font-size:10.5px;color:#64748b;overflow:hidden;text-overflow:ellipsis">' + tx.contact + '</div></td>';
            rowsHTML += '<td style="padding:8px 10px;text-align:center">' + segBadge + '</td>';
            rowsHTML += '<td style="padding:8px 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><span style="font-weight:600;color:#334155;font-size:11.5px">' + tx.plan + '</span><span style="margin-left:4px">' + cycleBadge + '</span></td>';
            rowsHTML += '<td style="padding:8px 10px;text-align:right"><strong style="color:' + amountColor + ';font-size:12.5px;font-family:Consolas,monospace">' + fmt(tx.amount) + '</strong></td>';
            rowsHTML += '<td style="padding:8px 10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + calcFormula + '</td>';
            rowsHTML += '<td style="padding:8px 10px;text-align:center">' + statusBadge + '</td>';
            rowsHTML += '<td style="padding:8px 10px;text-align:center"><button type="button" onclick="showContractOnDashboard(\'' + tx.id + '\')" class="btn btn-sm" style="padding:2px 6px;font-size:10px;border-radius:4px;background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;cursor:pointer">Xem</button></td>';
            rowsHTML += '</tr>';
          });
          tbody.innerHTML = rowsHTML;
        }
      }

      // Update Summary Footer Bar
      var sumCountEl = document.getElementById('daily-sum-tx-count');
      var sumB2bEl = document.getElementById('daily-sum-b2b');
      var sumB2cEl = document.getElementById('daily-sum-b2c');
      var sumTotalEl = document.getElementById('daily-sum-total');
      var sumBadgeEl = document.getElementById('daily-sum-status-badge');

      if (sumCountEl) sumCountEl.textContent = displayTx.length + ' HĐ';
      if (sumB2bEl) sumB2bEl.textContent = fmt(dispB2b);
      if (sumB2cEl) sumB2cEl.textContent = fmt(dispB2c);
      if (sumTotalEl) sumTotalEl.textContent = fmt(currentDispTotal);

      if (sumBadgeEl) {
        if (currentStFilter === 'COLLECTED') {
          sumBadgeEl.innerHTML = '<span style="color:#15803d;font-weight:700;background:#dcfce7;padding:2px 7px;border-radius:8px;font-size:11px">✓ Đã vào két: ' + fmt(collectedMonthCash) + '</span>';
        } else if (currentStFilter === 'PENDING') {
          sumBadgeEl.innerHTML = '<span style="color:#b45309;font-weight:700;background:#fef3c7;padding:2px 7px;border-radius:8px;font-size:11px">⏳ Chờ thu nạp: ' + fmt(pendingMonthCash) + '</span>';
        } else {
          sumBadgeEl.innerHTML = '<span style="color:#0f766e;font-weight:700;background:#ccfbf1;padding:2px 7px;border-radius:8px;font-size:11px">' + collectedCount + ' Đã thu • ' + pendingCount + ' Chờ thu</span>';
        }
      }
    };

    window.exportDailyCashflowTableCSV = function () {
      var isUsd = (window.currentCurrency === 'USD');
      var curr = isUsd ? 'USD' : 'JPY';
      var targetMonth = window.currentDashboardDailyPeriod || '2026-09';
      var activeDay = window.currentDashboardDailyDay || 'ALL';
      var pMonthNum = parseInt(targetMonth.split('-')[1], 10);
      var pYear = targetMonth.split('-')[0];

      var csv = '\uFEFFNgay_Thu,Ma_HD,Khach_Hang,Nguoi_Lien_He,Phan_Khuc,Goi_Cuoc,So_Tien (' + curr + '),Ghi_Chu\n';

      window.DUMMY_CONTRACTS_DATA.forEach(function (c) {
        if (c.paymentMonths && c.paymentMonths.indexOf(targetMonth) !== -1) {
          if (activeDay === 'ALL' || c.billingDay === activeDay) {
            var bDay = c.billingDay || 1;
            var dayStr = (bDay < 10 ? '0' : '') + bDay + '/' + (pMonthNum < 10 ? '0' : '') + pMonthNum + '/' + pYear;
            var cleanName = '"' + c.customerName.replace(/"/g, '""') + '"';
            var cleanContact = '"' + c.contactPerson.replace(/"/g, '""') + '"';
            var cleanNote = '"' + (c.notes || '').replace(/"/g, '""') + '"';
            csv += dayStr + ',' + c.id + ',' + cleanName + ',' + cleanContact + ',' + c.customerType + ',' + c.planTier + ',' + c.billingAmount + ',' + cleanNote + '\n';
          }
        }
      });

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Emind_Chi_Tiet_Thu_Tien_Theo_Ngay_' + targetMonth + '.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


    // ===== HỆ THỐNG PHÂN BIỆT ĐÃ THU (COLLECTED) & CHƯA THU (PENDING) =====
    window.currentDummyStatusFilter = 'ALL';
    window.CONTRACT_MANUAL_STATUS = {}; // Lưu trạng thái can thiệp thủ công: { [id_month]: 'collected' | 'pending' }

    // Kiểm tra hợp đồng đã thu hay chưa thu trong kỳ
    window.isContractCollected = function (c, periodStr, timelineMode) {
      var p = periodStr || '2026-09';
      var key = c.id + '_' + p;
      if (window.CONTRACT_MANUAL_STATUS[key] !== undefined) {
        return window.CONTRACT_MANUAL_STATUS[key] === 'collected';
      }

      var isPaying = (c.paymentMonths && c.paymentMonths.indexOf(p) !== -1);
      if (!isPaying) return null; // Không có kỳ nạp tháng này (Active MRR)

      if (timelineMode === '2026-09-24') {
        // Mốc hôm nay 24/09:
        if (c.billingDay === 24) return true;
        if (c.billingDay < 24) return true;
        return false;
      }

      if (p === '2026-09') {
        // Mốc hệ thống hiện tại là 24/09/2026:
        // Các ngày <= 24 là ĐÃ THU, các ngày > 24 là CHƯA THU
        return (c.billingDay <= 24);
      } else if (p < '2026-09') {
        return true; // Quá khứ: Đã thu
      } else {
        return false; // Tương lai: Chưa thu (Dự thu)
      }
    };

    // Chuyển đổi trạng thái thu tiền trực tiếp khi click
    window.toggleContractPaymentStatus = function (id) {
      var monthFilter = document.getElementById('dd-filter-month') ? document.getElementById('dd-filter-month').value : '2026-09';
      var p = (monthFilter && monthFilter !== 'ALL') ? (monthFilter === '2026-09-24' ? '2026-09' : monthFilter) : (window.currentPeriod || '2026-09');
      if (p === '2026-09-24') p = '2026-09';

      var contract = window.DUMMY_CONTRACTS_DATA.find(function (c) { return c.id === id; });
      if (!contract) return;

      if (!contract.paymentMonths || contract.paymentMonths.length === 0) {
        alert('Hợp đồng ' + contract.customerName + ' không có kỳ nạp tiền trong năm 2026.');
        return;
      }
      if (contract.paymentMonths.indexOf(p) === -1) {
        p = contract.paymentMonths[0];
      }

      var current = window.isContractCollected(contract, p, monthFilter);
      if (current === null) {
        alert('Hợp đồng ' + contract.customerName + ' là gói ' + contract.billingCycle + ' (đã trả trước từ trước, tháng này chỉ duy trì MRR không phát sinh nạp tiền).');
        return;
      }

      var newStatus = current ? 'pending' : 'collected';
      window.CONTRACT_MANUAL_STATUS[id + '_' + p] = newStatus;

      var statusLabel = (newStatus === 'collected') ? '🟢 ĐÃ THU' : '🟡 CHƯA THU';
      var msg = '✓ Đã chuyển hợp đồng ' + contract.customerName + ' (' + contract.id + ') sang trạng thái: ' + statusLabel + '.';
      console.log(msg);

      // Cập nhật ngay lập tức:
      // 1. Bảng hợp đồng mẫu ở tab Dummy Data
      if (typeof window.renderDummyContractsTable === 'function') {
        window.renderDummyContractsTable();
      }

      // 2. Thẻ chỉ số tổng quan ở Admin Dashboard (Thực thu, Chưa thu, v.v.)
      if (typeof window.applyDashboardMetrics === 'function') {
        window.applyDashboardMetrics();
      }

      // 3. Biểu đồ doanh thu
      if (typeof window.renderInteractiveRevenueChart === 'function') {
        window.renderInteractiveRevenueChart();
      }

      // 4. Giám sát công nợ & vòng đời hợp đồng (Phần 1.5 Admin Dashboard)
      if (typeof window.renderDashboardOperations === 'function') {
        window.renderDashboardOperations();
      }

      // 5. Bảng sổ quỹ dòng tiền / đối soát modal
      if (typeof window.renderDailyCashflowDashboard === 'function') {
        window.renderDailyCashflowDashboard();
      }

      // 6. Hiển thị thông báo phản hồi (Toast) tức thì
      if (typeof window.showAdminToast === 'function') {
        window.showAdminToast(statusLabel + ': ' + contract.customerName + ' — Dashboard đã cập nhật số liệu ngay!', 'success');
      }
    };

    // Lọc nhanh bằng nút pill
    window.setDummyStatusFilter = function (status) {
      window.currentDummyStatusFilter = status;
      var sel = document.getElementById('dd-filter-status');
      if (sel) sel.value = status;

      // Cập nhật class active cho nút pill
      var btns = {
        'ALL': 'dd-btn-st-all',
        'COLLECTED': 'dd-btn-st-col',
        'PENDING': 'dd-btn-st-pen',
        'ACTIVE_MRR': 'dd-btn-st-mrr'
      };
      Object.keys(btns).forEach(function (k) {
        var el = document.getElementById(btns[k]);
        if (el) el.classList.toggle('active', k === status);
      });

      window.renderDummyContractsTable();
    };

    window.onDummyStatusSelectChange = function (val) {
      window.setDummyStatusFilter(val);
    };

    window.renderDummyContractsTable = function () {
      var tbody = document.getElementById('dd-contracts-tbody');
      if (!tbody) return;

      var searchInput = document.getElementById('dd-search-input');
      var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var segFilter = document.getElementById('dd-filter-segment') ? document.getElementById('dd-filter-segment').value : 'ALL';
      var cycleFilter = document.getElementById('dd-filter-cycle') ? document.getElementById('dd-filter-cycle').value : 'ALL';
      var dayFilter = document.getElementById('dd-filter-billing-day') ? document.getElementById('dd-filter-billing-day').value : 'ALL';
      var monthFilter = document.getElementById('dd-filter-month') ? document.getElementById('dd-filter-month').value : '2026-09';

      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;

      function fmt(val) {
        if (!val) return '0đ';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      // Also refresh the daily matrix data
      // Đã lược bỏ renderDailyMatrixData theo yêu cầu tinh gọn tab data dummy

      var statusFilter = window.currentDummyStatusFilter || 'ALL';
      var checkMonth = (monthFilter === 'ALL' || monthFilter === '2026-09-24') ? '2026-09' : monthFilter;

      var filtered = window.DUMMY_CONTRACTS_DATA.filter(function (c) {
        if (segFilter !== 'ALL' && c.customerType !== segFilter) return false;
        if (cycleFilter !== 'ALL' && String(c.cycleMonths) !== String(cycleFilter)) return false;
        if (dayFilter !== 'ALL' && String(c.billingDay) !== String(dayFilter)) return false;

        // Month / Timeline filter
        if (monthFilter === '2026-09-24') {
          // Chỉ lấy HĐ nạp tiền vào ngày 24/09 hoặc active
          if (c.billingDay !== 24 && c.startDate > '2026-09-24') return false;
        } else if (monthFilter !== 'ALL') {
          // Phải bắt đầu trước hoặc trong tháng này
          if (c.startDate > monthFilter + '-31') return false;
        }

        // BỘ LỌC PHÂN BIỆT ĐÃ THU VÀ CHƯA THU
        var isPayingInPeriod = (c.paymentMonths && c.paymentMonths.indexOf(checkMonth) !== -1);
        if (monthFilter === '2026-09-24') {
          isPayingInPeriod = (isPayingInPeriod && c.billingDay === 24);
        }
        var isCol = window.isContractCollected(c, checkMonth, monthFilter);

        if (statusFilter === 'COLLECTED') {
          if (!isPayingInPeriod || isCol !== true) return false;
        } else if (statusFilter === 'PENDING') {
          if (!isPayingInPeriod || isCol !== false) return false;
        } else if (statusFilter === 'ACTIVE_MRR') {
          if (isPayingInPeriod) return false;
        }

        if (query) {
          var matchName = c.customerName.toLowerCase().indexOf(query) !== -1;
          var matchContact = c.contactPerson.toLowerCase().indexOf(query) !== -1;
          var matchId = c.id.toLowerCase().indexOf(query) !== -1;
          var matchPlan = c.planTier.toLowerCase().indexOf(query) !== -1;
          var matchNote = (c.notes || '').toLowerCase().indexOf(query) !== -1;
          if (!matchName && !matchContact && !matchId && !matchPlan && !matchNote) return false;
        }
        return true;
      });

      // Update top statistics chips with live accurate metrics
      var monthMetrics = window.getDynamicPeriodMetrics(monthFilter === 'ALL' ? '2026-09' : monthFilter, segFilter);

      var statTotal = document.getElementById('dd-stat-total');
      var statSubTotal = document.getElementById('dd-stat-sub-total');
      var statPeriod = document.getElementById('dd-stat-period');
      var statActive = document.getElementById('dd-stat-active-count');
      var statMrr = document.getElementById('dd-stat-mrr');
      var statCash = document.getElementById('dd-stat-cash');
      var statCashLabel = document.getElementById('dd-stat-cash-label');
      var statCashSub = document.getElementById('dd-stat-cash-sub');
      var statSeats = document.getElementById('dd-stat-seats');
      var statSeatsSub = document.getElementById('dd-stat-seats-sub');
      var filterText = document.getElementById('dd-filter-text');
      var badgeCount = document.getElementById('dd-badge-count');
      var allBtnCount = document.getElementById('dd-count-all-btn');

      if (statTotal) statTotal.textContent = window.DUMMY_CONTRACTS_DATA.length;
      if (badgeCount) badgeCount.textContent = window.DUMMY_CONTRACTS_DATA.length + ' Hợp Đồng Thực Tế';
      if (allBtnCount) allBtnCount.textContent = window.DUMMY_CONTRACTS_DATA.length;

      var b2bCount = window.DUMMY_CONTRACTS_DATA.filter(function (c) { return c.customerType === 'B2B'; }).length;
      var b2cCount = window.DUMMY_CONTRACTS_DATA.filter(function (c) { return c.customerType === 'B2C'; }).length;
      if (statSubTotal) statSubTotal.textContent = b2bCount + ' Doanh nghiệp • ' + b2cCount + ' Cá nhân';

      // Cập nhật số đếm trên các nút pill lọc trạng thái thu
      var btnColCount = document.getElementById('dd-count-col-btn');
      var btnPenCount = document.getElementById('dd-count-pen-btn');
      var btnMrrCount = document.getElementById('dd-count-mrr-btn');
      if (btnColCount) btnColCount.textContent = monthMetrics.collectedCount;
      if (btnPenCount) btnPenCount.textContent = monthMetrics.pendingCount;
      if (btnMrrCount) btnMrrCount.textContent = monthMetrics.prepaidCount;

      var statPending = document.getElementById('dd-stat-pending');
      var statPendingLabel = document.getElementById('dd-stat-pending-label');
      var statPendingSub = document.getElementById('dd-stat-pending-sub');

      if (monthFilter === '2026-09-24') {
        if (statPeriod) statPeriod.textContent = '24/09/2026 (Hôm nay)';
        if (statActive) statActive.textContent = monthMetrics.collectedCount + ' HĐ nạp hôm nay';
        if (statCashLabel) statCashLabel.textContent = '🟢 ĐÃ THU HÔM NAY';
        if (statCash) statCash.textContent = fmt(monthMetrics.collectedCash);
        if (statCashSub) statCashSub.textContent = monthMetrics.collectedCount + ' HĐ đã vào tài khoản';
        if (statPendingLabel) statPendingLabel.textContent = '🟡 CHƯA THU CÒN LẠI';
        if (statPending) statPending.textContent = fmt(monthMetrics.pendingCash);
        if (statPendingSub) statPendingSub.textContent = monthMetrics.pendingCount + ' HĐ đến hạn sau';
      } else if (monthFilter === 'ALL') {
        if (statPeriod) statPeriod.textContent = 'Tất cả 12 tháng';
        if (statActive) statActive.textContent = window.DUMMY_CONTRACTS_DATA.length + ' HĐ quản lý';
        if (statCashLabel) statCashLabel.textContent = '🟢 ĐÃ THU T09 (LIVE)';
        if (statCash) statCash.textContent = fmt(monthMetrics.collectedCash);
        if (statCashSub) statCashSub.textContent = monthMetrics.collectedCount + ' HĐ hoàn tất nạp';
        if (statPendingLabel) statPendingLabel.textContent = '🟡 CHƯA THU T09';
        if (statPending) statPending.textContent = fmt(monthMetrics.pendingCash);
        if (statPendingSub) statPendingSub.textContent = monthMetrics.pendingCount + ' HĐ chờ nạp';
      } else {
        var mNum = parseInt(monthFilter.split('-')[1], 10);
        if (statPeriod) statPeriod.textContent = 'Tháng ' + (mNum < 10 ? '0' : '') + mNum + '/2026';
        if (statActive) statActive.textContent = monthMetrics.activeCount + ' HĐ Active (' + monthMetrics.payingCount + ' nạp kỳ này)';
        if (statCashLabel) statCashLabel.textContent = '🟢 ĐÃ THU (THỰC THU)';
        if (statCash) statCash.textContent = fmt(monthMetrics.collectedCash);
        var colRate = monthMetrics.totalExpectedCash > 0 ? ((monthMetrics.collectedCash / monthMetrics.totalExpectedCash) * 100).toFixed(1) : 100;
        if (statCashSub) statCashSub.textContent = monthMetrics.collectedCount + ' HĐ (' + colRate + '% hoàn tất)';
        if (statPendingLabel) statPendingLabel.textContent = '🟡 CHƯA THU (CHỜ NẠP)';
        if (statPending) statPending.textContent = fmt(monthMetrics.pendingCash);
        if (statPendingSub) statPendingSub.textContent = monthMetrics.pendingCount + ' HĐ chờ đối soát / đến hạn';
      }

      if (statMrr) statMrr.textContent = fmt(monthMetrics.totalMrr);
      if (statSeats) statSeats.textContent = monthMetrics.totalSeats + ' / ' + monthMetrics.totalCapacity;
      var seatPct = ((monthMetrics.totalSeats / monthMetrics.totalCapacity) * 100).toFixed(1);
      if (statSeatsSub) statSeatsSub.textContent = 'Tỷ lệ ' + seatPct + '% (Trống ' + (monthMetrics.totalCapacity - monthMetrics.totalSeats) + ')';
      if (filterText) filterText.textContent = 'Đang hiển thị ' + filtered.length + '/' + window.DUMMY_CONTRACTS_DATA.length + ' hợp đồng khách hàng';

      var html = '';
      if (filtered.length === 0) {
        html = '<tr><td colspan="12" style="text-align:center;padding:36px;color:#94a3b8">Không tìm thấy hợp đồng nào khớp với bộ lọc</td></tr>';
      } else {
        filtered.forEach(function (c) {
          var isPayingThisMonth = false;
          var statusBadge = '';

          var pMonth = (monthFilter === 'ALL' || monthFilter === '2026-09-24') ? '2026-09' : monthFilter;
          isPayingThisMonth = (c.paymentMonths && c.paymentMonths.indexOf(pMonth) !== -1);
          if (monthFilter === '2026-09-24') {
            isPayingThisMonth = (isPayingThisMonth && c.billingDay === 24);
          }
          var isActiveThisMonth = (c.startDate <= pMonth + '-31');

          if (!isActiveThisMonth) {
            statusBadge = '<span style="background:#f8fafc;color:#64748b;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:600;border:1px solid #e2e8f0">⏳ Bắt đầu: ' + c.startDate + '</span>';
          } else if (isPayingThisMonth) {
            var isCol = window.isContractCollected(c, pMonth, monthFilter);
            if (isCol) {
              var colDayText = (c.billingDay === 24) ? 'Đã nạp 24/09 (Hôm nay)' : ('Đã nạp ngày ' + (c.billingDay < 10 ? '0' : '') + c.billingDay);
              statusBadge = '<div style="display:inline-flex;flex-direction:column;align-items:center;gap:2px">' +
                '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" style="cursor:pointer;background:#dcfce7;color:#15803d;padding:4px 9px;border-radius:12px;font-size:11.5px;font-weight:800;border:1px solid #86efac;box-shadow:0 1px 2px rgba(22,163,74,0.12)" title="Bấm vào để chuyển sang Chưa Thu (Pending)">' +
                '🟢 ĐÃ THU: ' + fmt(c.billingAmount) + ' ↺</span>' +
                '<span style="font-size:10px;color:#16a34a;font-weight:600">' + colDayText + '</span>' +
                '</div>';
            } else {
              var penDayText = 'Hạn thu ngày ' + (c.billingDay < 10 ? '0' : '') + c.billingDay + '/' + pMonth.split('-')[1];
              statusBadge = '<div style="display:inline-flex;flex-direction:column;align-items:center;gap:2px">' +
                '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" style="cursor:pointer;background:#fffdf5;color:#b45309;padding:4px 9px;border-radius:12px;font-size:11.5px;font-weight:800;border:1px solid #fde68a;box-shadow:0 1px 2px rgba(217,119,6,0.12)" title="Bấm vào để xác nhận Đã Thu Tiền (Collected)">' +
                '🟡 CHƯA THU: ' + fmt(c.billingAmount) + ' ↺</span>' +
                '<span style="font-size:10px;color:#b45309;font-weight:600">' + penDayText + '</span>' +
                '</div>';
            }
          } else {
            statusBadge = '<div style="display:inline-flex;flex-direction:column;align-items:center;gap:2px">' +
              '<span style="background:#f0f9ff;color:#0369a1;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:600;border:1px solid #bae6fd">' +
              '🔵 ĐÃ TRẢ TRƯỚC</span>' +
              '<span style="font-size:10px;color:#0284c7">Active MRR ' + fmt(c.mrrContribution) + '</span>' +
              '</div>';
          }

          var segBadge = (c.customerType === 'B2B')
            ? '<span style="background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700">🏢 Doanh nghiệp</span>'
            : '<span style="background:#f0fdf4;color:#15803d;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700">👤 Cá nhân</span>';

          var cycleBadge = (c.cycleMonths === 12)
            ? '<span style="background:#ccfbf1;color:#0f766e;padding:2px 6px;border-radius:6px;font-size:11px;font-weight:600">1 Năm (Annual)</span>'
            : (c.cycleMonths === 3
              ? '<span style="background:#e0f2fe;color:#0284c7;padding:2px 6px;border-radius:6px;font-size:11px;font-weight:600">3 Tháng (Quý)</span>'
              : '<span style="background:#fef3c7;color:#b45309;padding:2px 6px;border-radius:6px;font-size:11px;font-weight:600">1 Tháng (Định kỳ)</span>');

          // Detailed Mathematical Calculation for this contract
          var calcDetail = '';
          if (c.cycleMonths === 12) {
            calcDetail = '<div style="font-family:monospace;font-size:11px;color:#0369a1;background:#f0f9ff;padding:3px 6px;border-radius:4px;border:1px solid #bae6fd">' + fmt(c.billingAmount) + ' ÷ 12 thg = <strong>' + fmt(c.mrrContribution) + ' MRR</strong></div><div style="font-size:10px;color:#64748b;margin-top:1px">Nạp 1 lần/năm (ngày ' + (c.billingDay || 1) + ')</div>';
          } else if (c.cycleMonths === 3) {
            calcDetail = '<div style="font-family:monospace;font-size:11px;color:#047857;background:#f0fdfa;padding:3px 6px;border-radius:4px;border:1px solid #99f6e4">' + fmt(c.billingAmount) + ' ÷ 3 thg = <strong>' + fmt(c.mrrContribution) + ' MRR</strong></div><div style="font-size:10px;color:#64748b;margin-top:1px">Tái nạp theo quý (ngày ' + (c.billingDay || 1) + ')</div>';
          } else {
            calcDetail = '<div style="font-family:monospace;font-size:11px;color:#b45309;background:#fffbeb;padding:3px 6px;border-radius:4px;border:1px solid #fde68a">' + fmt(c.billingAmount) + ' ÷ 1 thg = <strong>' + fmt(c.mrrContribution) + ' MRR</strong></div><div style="font-size:10px;color:#64748b;margin-top:1px">Thu đều hàng tháng (ngày ' + (c.billingDay || 1) + ')</div>';
          }

          var rowBg = isPayingThisMonth ? ' style="background:#fafffd"' : '';

          html += '<tr' + rowBg + '>';
          html += '<td><code style="font-size:11.5px;color:#089490;font-weight:700">' + c.id + '</code></td>';
          html += '<td><div style="font-weight:700;color:#0f172a">' + c.customerName + '</div><div style="font-size:11.5px;color:#64748b;margin-top:2px">' + c.contactPerson + '</div></td>';
          html += '<td>' + segBadge + '</td>';
          html += '<td><strong style="color:#334155">' + c.planTier + '</strong><div style="font-size:11px;color:#64748b">' + c.seats + ' Ghế sử dụng</div></td>';
          html += '<td>' + cycleBadge + '</td>';
          html += '<td><span style="font-size:12px;color:#475569;font-weight:600">' + c.startDate + '</span></td>';
          var isBdayToday = (c.billingDay === 24);
          var bdayBadge = isBdayToday
            ? '<span style="font-size:11px;color:#0284c7;font-weight:800;background:#e0f2fe;padding:2px 6px;border-radius:4px;border:1px solid #bae6fd">Ngày 24 (Hôm nay ★)</span>'
            : '<span style="font-size:11.5px;color:#0f766e;font-weight:700;background:#f0fdfa;padding:2px 6px;border-radius:4px">Ngày ' + (c.billingDay < 10 ? '0' : '') + c.billingDay + '</span>';
          html += '<td>' + bdayBadge + '</td>';
          html += '<td style="text-align:right"><strong style="color:#0f172a;font-size:13px">' + fmt(c.billingAmount) + '</strong><div style="font-size:10.5px;color:#64748b">/' + (c.cycleMonths === 12 ? 'năm' : (c.cycleMonths === 3 ? 'quý' : 'tháng')) + '</div></td>';
          html += '<td style="text-align:right"><strong style="color:#16a34a;font-size:13px">' + fmt(c.mrrContribution) + '</strong><div style="font-size:10.5px;color:#64748b">/tháng</div></td>';
          html += '<td style="padding:8px 10px">' + calcDetail + '</td>';
          html += '<td style="text-align:center">' + statusBadge + '</td>';
          html += '<td style="text-align:center"><button type="button" class="btn btn-outline btn-sm" onclick="showContractOnDashboard(\'' + c.id + '\')" style="padding:2px 7px;font-size:11px;border-radius:5px;color:#089490;border-color:#99f6e4;background:#f0fdfa" title="Xem hợp đồng này trên Dashboard">📊</button></td>';
          html += '</tr>';
        });
      }

      tbody.innerHTML = html;
    };

    window.toggleCalculationFormulas = function () {
      var box = document.getElementById('dd-calculation-formulas-box');
      var lbl = document.getElementById('lbl-toggle-formulas');
      if (!box) return;
      if (box.style.display === 'none' || !box.style.display) {
        box.style.display = 'block';
        if (lbl) lbl.textContent = 'Ẩn Công Thức Tính Toán';
      } else {
        box.style.display = 'none';
        if (lbl) lbl.textContent = 'Xem Công Thức Tính Toán Chi Tiết';
      }
    };

    window.filterContractsBySpecificDay = function (dayNum) {
      var daySelect = document.getElementById('dd-filter-billing-day');
      if (daySelect) {
        daySelect.value = String(dayNum);
      }
      window.renderDummyContractsTable();
      // Scroll to table smoothly
      var tbl = document.getElementById('dd-contracts-table');
      if (tbl) tbl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.renderDailyMatrixData = function (periodStr) {
      var tbody = document.getElementById('dd-daily-matrix-tbody');
      if (!tbody) return;

      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var p = periodStr || window.currentPeriod || '2026-09';
      if (p === '2026-09-24') p = '2026-09';
      var pMonthNum = parseInt(p.split('-')[1], 10);
      var pYear = p.split('-')[0];

      // Group contracts by billingDay for the period (Phân biệt ĐÃ THU & CHƯA THU)
      var dayMap = {};
      window.DUMMY_CONTRACTS_DATA.forEach(function (c) {
        if (c.paymentMonths && c.paymentMonths.indexOf(p) !== -1) {
          var bDay = c.billingDay || 1;
          if (!dayMap[bDay]) {
            dayMap[bDay] = {
              day: bDay,
              dayStr: (bDay < 10 ? '0' : '') + bDay + '/' + (pMonthNum < 10 ? '0' : '') + pMonthNum + '/' + pYear,
              contracts: [],
              b2bSum: 0,
              b2cSum: 0,
              total: 0,
              isCollected: (p === '2026-09') ? (bDay <= 24) : (p < '2026-09')
            };
          }
          dayMap[bDay].contracts.push(c);
          if (c.customerType === 'B2B') dayMap[bDay].b2bSum += c.billingAmount;
          else dayMap[bDay].b2cSum += c.billingAmount;
          dayMap[bDay].total += c.billingAmount;
        }
      });

      var dayList = Object.keys(dayMap).map(function (k) { return dayMap[k]; }).sort(function (a, b) { return a.day - b.day; });

      var grandTotalMonth = dayList.reduce(function (sum, d) { return sum + d.total; }, 0);
      var cum = 0;
      var rowsHTML = '';

      dayList.forEach(function (d) {
        cum += d.total;
        var pct = ((cum / (grandTotalMonth || 1)) * 100).toFixed(1);
        var isToday = (d.day === 24 && p === '2026-09');

        var dayBadge = isToday
          ? '<div style="display:inline-flex;align-items:center;gap:5px"><span style="background:#fef3c7;color:#b45309;font-weight:800;padding:2px 8px;border-radius:6px;font-size:11px;border:1px solid #fde68a">⏱️ ' + d.dayStr + '</span><span style="font-size:9.5px;background:#ef4444;color:#fff;padding:1px 4px;border-radius:4px;font-weight:700">Hôm nay</span></div>'
          : '<strong style="color:#0f172a;font-size:12px">' + d.dayStr + '</strong>';

        // Summary of contracts in this day
        var contractsSummary = d.contracts.map(function (c) {
          var tag = (c.customerType === 'B2B') ? '🏢' : '👤';
          return '<span style="display:inline-block;background:#f1f5f9;padding:1px 6px;border-radius:4px;margin:1px;font-size:10.5px" title="' + c.customerName + ' (' + c.id + ') - ' + fmt(c.billingAmount) + '">' + tag + ' ' + c.customerName.split(' ')[0] + ' (' + fmt(c.billingAmount) + ')</span>';
        }).join(' ');

        var rowBg = isToday ? ' style="background:#fffdf5"' : '';

        var statusCellBadge = d.isCollected
          ? '<span style="background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:10px;font-size:11px;font-weight:700;border:1px solid #86efac;display:inline-block">🟢 ĐÃ THU</span>'
          : '<span style="background:#fffdf5;color:#b45309;padding:3px 8px;border-radius:10px;font-size:11px;font-weight:700;border:1px solid #fde68a;display:inline-block">🟡 CHƯA THU</span>';

        rowsHTML += '<tr' + rowBg + ' style="border-bottom:1px solid #f1f5f9">';
        rowsHTML += '<td style="padding:9px 12px">' + dayBadge + '</td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:center"><strong style="color:#089490">' + d.contracts.length + ' HĐ</strong></td>';
        rowsHTML += '<td style="padding:9px 12px">' + contractsSummary + '</td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:right;color:#0284c7;font-weight:600">' + fmt(d.b2bSum) + '</td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:right;color:#7e22ce;font-weight:600">' + fmt(d.b2cSum) + '</td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:right"><strong style="color:#089490;font-size:12.5px">' + fmt(d.total) + '</strong></td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:right;background:#f0fdfa"><strong style="color:#0f766e;font-size:12.5px">' + fmt(cum) + '</strong></td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:center">' + statusCellBadge + '</td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:center"><span style="background:#f1f5f9;color:#334155;padding:2px 7px;border-radius:10px;font-size:10.5px;font-weight:700">' + pct + '%</span></td>';
        rowsHTML += '<td style="padding:9px 12px;text-align:center"><button type="button" class="btn btn-outline btn-sm" onclick="filterContractsBySpecificDay(' + d.day + ')" style="padding:2px 8px;font-size:11px;border-radius:6px;color:#089490;border-color:#99f6e4;background:#f0fdfa" title="Lọc các hợp đồng nạp tiền ngày ' + d.day + '">🔍 Lọc Ngày ' + d.day + '</button></td>';
        rowsHTML += '</tr>';
      });

      tbody.innerHTML = rowsHTML;

      // Update Matrix Footer Totals
      var sumB2b = dayList.reduce(function (sum, d) { return sum + d.b2bSum; }, 0);
      var sumB2c = dayList.reduce(function (sum, d) { return sum + d.b2cSum; }, 0);
      var sumCount = dayList.reduce(function (sum, d) { return sum + d.contracts.length; }, 0);

      var elCount = document.getElementById('dd-matrix-sum-count');
      var elB2b = document.getElementById('dd-matrix-sum-b2b');
      var elB2c = document.getElementById('dd-matrix-sum-b2c');
      var elTotal = document.getElementById('dd-matrix-sum-total');
      var elCum = document.getElementById('dd-matrix-sum-cum');
      var elBadge = document.getElementById('dd-matrix-badge-status');

      var colDays = dayList.filter(function (d) { return d.isCollected; });
      var penDays = dayList.filter(function (d) { return !d.isCollected; });
      var sumCollectedAmt = colDays.reduce(function (s, d) { return s + d.total; }, 0);
      var sumPendingAmt = penDays.reduce(function (s, d) { return s + d.total; }, 0);
      var sumCollectedCount = colDays.reduce(function (s, d) { return s + d.contracts.length; }, 0);
      var sumPendingCount = penDays.reduce(function (s, d) { return s + d.contracts.length; }, 0);

      if (elCount) elCount.textContent = sumCount + ' HĐ (' + sumCollectedCount + ' đã thu / ' + sumPendingCount + ' chưa thu)';
      if (elB2b) elB2b.textContent = fmt(sumB2b);
      if (elB2c) elB2c.textContent = fmt(sumB2c);
      if (elTotal) elTotal.textContent = fmt(grandTotalMonth);
      if (elCum) elCum.textContent = fmt(grandTotalMonth);
      if (elBadge) elBadge.textContent = '🟢 Đã thu: ' + fmt(sumCollectedAmt) + ' (' + sumCollectedCount + ' HĐ) • 🟡 Chưa thu: ' + fmt(sumPendingAmt) + ' (' + sumPendingCount + ' HĐ)';
    };

    window.setDummyTimelineFilter = function (filterVal) {
      var sel = document.getElementById('dd-filter-month');
      if (sel) sel.value = filterVal;

      var btnAll = document.getElementById('dd-btn-tl-all');
      var btnToday = document.getElementById('dd-btn-tl-today');
      var btnT9 = document.getElementById('dd-btn-tl-t9');
      var btnT10 = document.getElementById('dd-btn-tl-t10');

      var actStyle = 'font-size:11.5px;padding:5px 11px;font-weight:800;background:#ffffff;color:#089490;box-shadow:0 1px 2px rgba(0,0,0,0.06)';
      var inactStyle = 'font-size:11.5px;padding:5px 11px;font-weight:600;background:transparent;color:#475569;border:none';

      if (btnAll) btnAll.style.cssText = (filterVal === 'ALL') ? actStyle : inactStyle;
      if (btnToday) btnToday.style.cssText = (filterVal === '2026-09-24') ? actStyle : inactStyle;
      if (btnT9) btnT9.style.cssText = (filterVal === '2026-09') ? actStyle : inactStyle;
      if (btnT10) btnT10.style.cssText = (filterVal === '2026-10') ? actStyle : inactStyle;

      var hint = document.getElementById('dd-timeline-status-hint');
      if (hint) {
        if (filterVal === '2026-09-24') hint.innerHTML = 'Đang đối chiếu: <strong>Hôm nay (24/09/2026)</strong>';
        else if (filterVal === '2026-09') hint.innerHTML = 'Đang đối chiếu: <strong>Tháng 09/2026 (LIVE)</strong>';
        else if (filterVal === '2026-10') hint.innerHTML = 'Đang đối chiếu: <strong>Tháng 10/2026 (Dự báo Q4)</strong>';
        else hint.innerHTML = 'Đang hiển thị: <strong>Toàn bộ 52 hợp đồng</strong>';
      }

      renderDummyContractsTable();
    };

    window.showTimelineInDashboard = function () {
      var sel = document.getElementById('dd-filter-month');
      var m = sel ? sel.value : '2026-09';
      navigate('admin-dashboard', null);
      quickJumpPeriod(m);
    };

    window.onDummyMonthFilterChange = function (val) {
      window.setDummyTimelineFilter(val);
    };

    window.resetDummyFilters = function () {
      var s = document.getElementById('dd-search-input'); if (s) s.value = '';
      var seg = document.getElementById('dd-filter-segment'); if (seg) seg.value = 'ALL';
      var cyc = document.getElementById('dd-filter-cycle'); if (cyc) cyc.value = 'ALL';
      window.setDummyTimelineFilter('2026-09');
    };

    window.showContractOnDashboard = function (contractId) {
      var contract = window.DUMMY_CONTRACTS_DATA.find(function (c) { return c.id === contractId; });
      if (!contract) return;

      var targetMonth = '2026-09';
      if (contract.paymentMonths && contract.paymentMonths.length > 0) {
        if (contract.paymentMonths.indexOf('2026-09') !== -1) targetMonth = '2026-09';
        else if (contract.paymentMonths.indexOf('2026-10') !== -1) targetMonth = '2026-10';
        else targetMonth = contract.paymentMonths[0];
      } else {
        targetMonth = contract.startDate.substring(0, 7);
      }

      window.currentSegment = contract.customerType;
      window.currentPeriod = targetMonth;

      navigate('admin-dashboard', null);
      quickJumpPeriod(targetMonth);
      filterSegment(contract.customerType);

      showAdminToast('🔍 Đang xem Dashboard tại kỳ ' + targetMonth + ' cho hợp đồng: ' + contract.customerName, 'info');
    };

    // Modal Form Thêm Hợp Đồng Mới
    window.openAddContractModal = function () {
      var m = document.getElementById('add-contract-modal');
      if (m) m.style.display = 'flex';
      autoSuggestAmount();
    };

    window.closeAddContractModal = function () {
      var m = document.getElementById('add-contract-modal');
      if (m) m.style.display = 'none';
    };

    window.onNewContractTypeChange = function () {
      var type = document.getElementById('new-c-type').value;
      var tierSelect = document.getElementById('new-c-tier');
      var seatsInput = document.getElementById('new-c-seats');

      if (type === 'B2C') {
        tierSelect.value = 'Pro Personal';
        seatsInput.value = 1;
      } else {
        tierSelect.value = 'Professional';
        seatsInput.value = 15;
      }
      autoSuggestAmount();
    };

    window.autoSuggestAmount = function () {
      var tier = document.getElementById('new-c-tier').value;
      var cycle = parseInt(document.getElementById('new-c-cycle').value, 10);
      var amtInput = document.getElementById('new-c-amount');

      var baseMonth = 10000;
      if (tier === 'Enterprise') baseMonth = 60000;
      else if (tier === 'Professional') baseMonth = 10000;
      else if (tier === 'Standard') baseMonth = 16000;
      else if (tier === 'Starter') baseMonth = 8000;
      else if (tier === 'Pro Personal') baseMonth = 3000;
      else if (tier === 'Basic Personal') baseMonth = 2000;

      var total = baseMonth * cycle;
      if (cycle === 12) total = Math.round(total * 0.85); // 15% discount for annual
      if (amtInput) amtInput.value = total;
    };

    window.saveNewContract = function (e) {
      if (e) e.preventDefault();

      var name = document.getElementById('new-c-name').value.trim();
      var contact = document.getElementById('new-c-contact').value.trim();
      var type = document.getElementById('new-c-type').value;
      var tier = document.getElementById('new-c-tier').value;
      var seats = parseInt(document.getElementById('new-c-seats').value, 10) || 1;
      var cycle = parseInt(document.getElementById('new-c-cycle').value, 10) || 1;
      var start = document.getElementById('new-c-start').value || '2026-09-24';
      var day = parseInt(document.getElementById('new-c-day').value, 10) || 24;
      var amount = parseInt(document.getElementById('new-c-amount').value, 10) || 10000;
      var method = document.getElementById('new-c-method').value;
      var note = document.getElementById('new-c-note').value.trim() || 'Hợp đồng mới được thêm qua giao diện';

      var newIndex = window.DUMMY_CONTRACTS_DATA.length + 1;
      var newId = 'CTR-2026-' + (newIndex < 100 ? (newIndex < 10 ? '00' : '0') : '') + newIndex;

      var category = (tier === 'Enterprise') ? 'ent' : ((tier === 'Professional' || tier === 'Pro Personal') ? 'pro' : 'basic');
      var mrr = Math.round(amount / cycle);
      // Generate payment months
      var paymentMonths = [];
      var startMonth = start.substring(0, 7);
      paymentMonths.push(startMonth);
      if (cycle === 1) {
        var startM = parseInt(startMonth.split('-')[1], 10);
        for (var m = startM + 1; m <= 12; m++) {
          paymentMonths.push('2026-' + (m < 10 ? '0' : '') + m);
        }
      } else if (cycle === 3) {
        var curM = parseInt(startMonth.split('-')[1], 10);
        while (curM + 3 <= 12) {
          curM += 3;
          paymentMonths.push('2026-' + (curM < 10 ? '0' : '') + curM);
        }
      }

      var newContract = {
        id: newId,
        customerName: name,
        customerType: type,
        contactPerson: contact,
        planTier: tier,
        planCategory: category,
        seats: seats,
        billingCycle: (cycle === 12) ? '1 Năm (Annual)' : ((cycle === 3) ? '3 Tháng (Quý)' : '1 Tháng (Định kỳ)'),
        cycleMonths: cycle,
        startDate: start,
        billingDay: day,
        billingAmount: amount,
        mrrContribution: mrr,
        paymentMonths: paymentMonths,
        paymentMethod: method,
        status: (start <= '2026-09-30') ? 'active' : 'upcoming',
        notes: note
      };

      window.DUMMY_CONTRACTS_DATA.unshift(newContract);
      window.recalculateRevenueData2026();

      // Update sidebar counts
      var sc1 = document.getElementById('sidebar-dummy-count-1');
      var sc2 = document.getElementById('sidebar-dummy-count-2');
      if (sc1) sc1.textContent = window.DUMMY_CONTRACTS_DATA.length;
      if (sc2) sc2.textContent = window.DUMMY_CONTRACTS_DATA.length;

      closeAddContractModal();
      renderDummyContractsTable();
      applyDashboardMetrics();
      renderInteractiveRevenueChart();
      if (typeof window.renderDashboardOperations === 'function') window.renderDashboardOperations();
      if (typeof window.renderDailyCashflowDashboard === 'function') window.renderDailyCashflowDashboard();

      showAdminToast('🎉 Đã thêm hợp đồng ' + newId + ' ("' + name + '") thành công! Số liệu đã cập nhật sang Dashboard.', 'success');
    };

    window.resetDummyToDefault = function () {
      if (!confirm('Khôi phục danh sách 52 hợp đồng mẫu chuẩn ban đầu?')) return;
      window.DUMMY_CONTRACTS_DATA = JSON.parse(JSON.stringify(window.DEFAULT_DUMMY_CONTRACTS));
      window.CONTRACT_MANUAL_STATUS = {};
      window.recalculateRevenueData2026();

      var sc1 = document.getElementById('sidebar-dummy-count-1');
      var sc2 = document.getElementById('sidebar-dummy-count-2');
      if (sc1) sc1.textContent = window.DUMMY_CONTRACTS_DATA.length;
      if (sc2) sc2.textContent = window.DUMMY_CONTRACTS_DATA.length;

      renderDummyContractsTable();
      applyDashboardMetrics();
      renderInteractiveRevenueChart();
      if (typeof window.renderDashboardOperations === 'function') window.renderDashboardOperations();
      if (typeof window.renderDailyCashflowDashboard === 'function') window.renderDailyCashflowDashboard();

      showAdminToast('↺ Đã khôi phục lại 52 hợp đồng mẫu chuẩn!', 'info');
    };

    window.exportDummyContractsCSV = function () {
      var isUsd = (window.currentCurrency === 'USD');
      var curr = isUsd ? 'USD' : 'JPY';
      var csv = '\uFEFFMa_HD,Ten_Khach_Hang,Phan_Khuc,Nguoi_Lien_He,Goi_Cuoc,So_Ghe,Ky_Thanh_Toan,Ngay_Dang_Ky,Ngay_Thu,Phuong_Thuc,So_Tien_Ky (' + curr + '),Dong_Gop_MRR (' + curr + '),Ghi_Chu\n';

      window.DUMMY_CONTRACTS_DATA.forEach(function (c) {
        var cleanName = '"' + c.customerName.replace(/"/g, '""') + '"';
        var cleanContact = '"' + c.contactPerson.replace(/"/g, '""') + '"';
        var cleanMethod = '"' + (c.paymentMethod || '').replace(/"/g, '""') + '"';
        var cleanNotes = '"' + (c.notes || '').replace(/"/g, '""') + '"';
        csv += c.id + ',' + cleanName + ',' + c.customerType + ',' + cleanContact + ',' + c.planTier + ',' + c.seats + ',' + c.billingCycle + ',' + c.startDate + ',' + (c.billingDay || 1) + ',' + cleanMethod + ',' + c.billingAmount + ',' + c.mrrContribution + ',' + cleanNotes + '\n';
      });

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Emind_Danh_Sach_52_Hop_Dong_Mau.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Modal Bảng Kê Dòng Tiền Theo Ngày Cụ Thể
    window.currentDailyCashSeg = 'ALL';
    window.currentDailyCashPeriod = '2026-09';
    window.currentDailyCashSearch = '';

    window.getDailyCashRecordsForPeriod = function (periodStr) {
      var p = periodStr || window.currentDailyCashPeriod || window.currentPeriod || '2026-09';
      if (p === '2026-09-24') p = '2026-09';
      var pMonthNum = parseInt(p.split('-')[1], 10);
      var pYear = p.split('-')[0];

      var records = [];
      window.DUMMY_CONTRACTS_DATA.forEach(function (c) {
        if (c.paymentMonths && c.paymentMonths.indexOf(p) !== -1) {
          var bDay = c.billingDay || 1;
          // In September, include all transactions up to day 24 (all September paying contracts fall on or before 24)
          var isIncluded = (p === '2026-09') ? (bDay <= 24) : true;
          if (isIncluded) {
            records.push({
              dayNum: bDay,
              day: (bDay < 10 ? '0' : '') + bDay + '/' + (pMonthNum < 10 ? '0' : '') + pMonthNum + '/' + pYear,
              id: c.id,
              name: c.customerName,
              contact: c.contactPerson,
              type: c.customerType,
              plan: c.planTier,
              cycle: c.billingCycle,
              cycleMonths: c.cycleMonths,
              amount: c.billingAmount,
              method: c.paymentMethod || 'Chuyển khoản (Bank Transfer)',
              note: c.notes || 'Thanh toán theo hợp đồng'
            });
          }
        }
      });

      // Sort chronologically by billingDay
      records.sort(function (a, b) {
        if (a.dayNum !== b.dayNum) return a.dayNum - b.dayNum;
        return a.id.localeCompare(b.id);
      });

      return records;
    };

    window.filterDailyCashModal = function (seg) {
      window.currentDailyCashSeg = seg;
      window.renderDailyCashContent(seg, window.currentDailyCashPeriod, window.currentDailyCashSearch);
    };

    window.searchDailyCashModal = function (query) {
      window.currentDailyCashSearch = (query || '').trim().toLowerCase();
      window.renderDailyCashContent(window.currentDailyCashSeg, window.currentDailyCashPeriod, window.currentDailyCashSearch);
    };

    window.printDailyCashTable = function () {
      var printWindow = window.open('', '_blank');
      var tableHtml = document.getElementById('dcm-table').outerHTML;
      var titleText = document.getElementById('dcm-modal-title').textContent;
      var statTotal = document.getElementById('dcm-stat-total').textContent;
      var statB2b = document.getElementById('dcm-stat-b2b').textContent;
      var statB2c = document.getElementById('dcm-stat-b2c').textContent;

      printWindow.document.write('<!DOCTYPE html><html><head><title>' + titleText + '</title>');
      printWindow.document.write('<style>');
      printWindow.document.write('body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #0f172a; }');
      printWindow.document.write('h2 { margin: 0 0 4px; color: #0f172a; }');
      printWindow.document.write('.meta { font-size: 13px; color: #64748b; margin-bottom: 16px; }');
      printWindow.document.write('.stats { display: flex; gap: 20px; margin-bottom: 20px; background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; }');
      printWindow.document.write('.stat-item { font-size: 13px; }');
      printWindow.document.write('.stat-item strong { display: block; font-size: 16px; color: #089490; }');
      printWindow.document.write('table { width: 100%; border-collapse: collapse; font-size: 11px; }');
      printWindow.document.write('th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }');
      printWindow.document.write('th { background: #f1f5f9; font-weight: bold; }');
      printWindow.document.write('tr:nth-child(even) { background: #f8fafc; }');
      printWindow.document.write('@media print { button { display: none; } }');
      printWindow.document.write('</style></head><body>');
      printWindow.document.write('<h2>' + titleText + '</h2>');
      printWindow.document.write('<div class="meta">Hệ thống Quản lý Sản xuất & Bàn Điều Hành Doanh Thu • Đã đối soát 100% dòng tiền về két</div>');
      printWindow.document.write('<div class="stats"><div class="stat-item">Tổng Thực Thu: <strong>' + statTotal + '</strong></div><div class="stat-item">Khối B2B: <strong>' + statB2b + '</strong></div><div class="stat-item">Khối B2C: <strong>' + statB2c + '</strong></div></div>');
      printWindow.document.write(tableHtml);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      setTimeout(function () { printWindow.print(); }, 250);
    };

    window.renderDailyCashContent = function (seg, periodStr, searchQuery) {
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var s = seg || window.currentDailyCashSeg || 'ALL';
      var p = periodStr || window.currentDailyCashPeriod || window.currentPeriod || '2026-09';
      if (p === '2026-09-24') p = '2026-09';
      window.currentDailyCashSeg = s;
      window.currentDailyCashPeriod = p;

      var q = (searchQuery !== undefined) ? searchQuery : (window.currentDailyCashSearch || '');
      window.currentDailyCashSearch = q;

      var allRows = window.getDailyCashRecordsForPeriod(p);

      // Overall stats for allRows in period
      var totalAll = 0, b2bAll = 0, b2cAll = 0, todayAll = 0;
      var countAll = allRows.length, countB2b = 0, countB2c = 0, countToday = 0;

      allRows.forEach(function (r) {
        totalAll += r.amount;
        if (r.type === 'B2B') { b2bAll += r.amount; countB2b++; }
        else { b2cAll += r.amount; countB2c++; }
        if (r.dayNum === 24) { todayAll += r.amount; countToday++; }
      });

      // Update Top 4 Metric Cards
      var statTotal = document.getElementById('dcm-stat-total');
      var statTotalSub = document.getElementById('dcm-stat-total-sub');
      var statB2b = document.getElementById('dcm-stat-b2b');
      var statB2bSub = document.getElementById('dcm-stat-b2b-sub');
      var statB2c = document.getElementById('dcm-stat-b2c');
      var statB2cSub = document.getElementById('dcm-stat-b2c-sub');
      var statToday = document.getElementById('dcm-stat-today');
      var statTodaySub = document.getElementById('dcm-stat-today-sub');

      if (statTotal) statTotal.textContent = fmt(totalAll);
      if (statTotalSub) statTotalSub.textContent = '✓ ' + countAll + '/' + countAll + ' giao dịch đã về két (100% KPI)';

      if (statB2b) statB2b.textContent = fmt(b2bAll);
      if (statB2bSub) {
        var b2bPct = Math.round((b2bAll / (totalAll || 1)) * 100);
        statB2bSub.textContent = countB2b + ' hợp đồng nạp tiền (' + b2bPct + '% tổng tiền)';
      }

      if (statB2c) statB2c.textContent = fmt(b2cAll);
      if (statB2cSub) {
        var b2cPct = Math.round((b2cAll / (totalAll || 1)) * 100);
        statB2cSub.textContent = countB2c + ' nhóm & cá nhân (' + b2cPct + '% tổng tiền)';
      }

      if (statToday) statToday.textContent = fmt(todayAll);
      if (statTodaySub) {
        var todayPct = Math.round((todayAll / (totalAll || 1)) * 100);
        statTodaySub.textContent = countToday + ' HĐ nạp đúng ngày 24/09 (+' + todayPct + '%)';
      }

      // Update Tab Counter Badges
      var badgeAll = document.getElementById('dcm-badge-cnt-all');
      var badgeB2b = document.getElementById('dcm-badge-cnt-b2b');
      var badgeB2c = document.getElementById('dcm-badge-cnt-b2c');
      var badgeToday = document.getElementById('dcm-badge-cnt-today');

      if (badgeAll) badgeAll.textContent = countAll;
      if (badgeB2b) badgeB2b.textContent = countB2b;
      if (badgeB2c) badgeB2c.textContent = countB2c;
      if (badgeToday) badgeToday.textContent = countToday + ' HĐ';

      // Update Tab Active Styling
      var tabAll = document.getElementById('dcm-tab-all');
      var tabB2b = document.getElementById('dcm-tab-b2b');
      var tabB2c = document.getElementById('dcm-tab-b2c');
      var tabToday = document.getElementById('dcm-tab-today');

      if (tabAll) tabAll.classList.toggle('active', s === 'ALL');
      if (tabB2b) tabB2b.classList.toggle('active', s === 'B2B');
      if (tabB2c) tabB2c.classList.toggle('active', s === 'B2C');
      if (tabToday) tabToday.classList.toggle('active', s === 'TODAY');

      // Filter rows by segment
      var filteredRows = allRows.filter(function (r) {
        if (s === 'B2B') return r.type === 'B2B';
        if (s === 'B2C') return r.type === 'B2C';
        if (s === 'TODAY') return r.dayNum === 24;
        return true;
      });

      // Filter rows by search query
      if (q) {
        filteredRows = filteredRows.filter(function (r) {
          var str = (r.name + ' ' + r.contact + ' ' + r.id + ' ' + r.plan + ' ' + r.method + ' ' + r.note + ' ' + r.day).toLowerCase();
          return str.indexOf(q) !== -1;
        });
      }

      // Update Filter Note
      var noteEl = document.getElementById('dcm-filter-note');
      var filteredTotal = filteredRows.reduce(function (sum, r) { return sum + r.amount; }, 0);
      if (noteEl) {
        noteEl.textContent = 'Hiển thị ' + filteredRows.length + '/' + countAll + ' giao dịch • Tổng: ' + fmt(filteredTotal);
      }

      // Render Table Body
      var tbody = document.getElementById('dcm-tbody');
      if (tbody) {
        if (filteredRows.length === 0) {
          tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:36px;color:#94a3b8;font-size:13px">Không tìm thấy giao dịch nào khớp với bộ lọc hoặc từ khóa tìm kiếm.</td></tr>';
        } else {
          var h = '';
          var cum = 0;
          filteredRows.forEach(function (r) {
            cum += r.amount;
            var isToday = (r.dayNum === 24);

            var dayBadge = isToday
              ? '<div style="display:inline-flex;align-items:center;gap:4px"><span style="background:#fef3c7;color:#b45309;font-weight:800;padding:2px 7px;border-radius:6px;font-size:11px;border:1px solid #fde68a">⏱️ ' + r.day + '</span><span style="font-size:9.5px;background:#ef4444;color:#fff;padding:1px 4px;border-radius:4px;font-weight:700">Mới</span></div>'
              : '<strong style="color:#0f172a;font-size:12px">' + r.day + '</strong>';

            var segBadge = (r.type === 'B2B')
              ? '<span style="background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:3px">🏢 B2B</span>'
              : '<span style="background:#f0fdf4;color:#15803d;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:3px">👤 B2C</span>';

            var cycleBadge = (r.cycleMonths === 12)
              ? '<span style="background:#ccfbf1;color:#0f766e;padding:1px 6px;border-radius:4px;font-size:10.5px;font-weight:600">1 Năm</span>'
              : (r.cycleMonths === 3
                ? '<span style="background:#e0f2fe;color:#0284c7;padding:1px 6px;border-radius:4px;font-size:10.5px;font-weight:600">3 Tháng (Quý)</span>'
                : '<span style="background:#fef3c7;color:#b45309;padding:1px 6px;border-radius:4px;font-size:10.5px;font-weight:600">Hàng Tháng</span>');

            var methodIcon = (r.method.indexOf('Bank') !== -1 || r.method.indexOf('khoản') !== -1)
              ? '🏦'
              : (r.method.indexOf('Thẻ') !== -1 ? '💳' : '📄');

            var rowClass = 'dcm-row-item' + (isToday ? ' dcm-row-today' : '');

            h += '<tr class="' + rowClass + '" style="border-bottom:1px solid #f1f5f9;transition:background-color 0.12s ease">';
            h += '<td style="padding:10px 12px">' + dayBadge + '</td>';
            h += '<td style="padding:10px 12px"><code style="font-size:11px;color:#089490;font-weight:700;background:#f0fdfa;padding:2px 6px;border-radius:4px;border:1px solid #ccfbf1">' + r.id + '</code></td>';
            h += '<td style="padding:10px 12px"><div style="font-weight:700;color:#0f172a;font-size:13px">' + r.name + '</div><div style="font-size:11px;color:#64748b;margin-top:2px">' + r.contact + '</div></td>';
            h += '<td style="padding:10px 12px;text-align:center">' + segBadge + '</td>';
            h += '<td style="padding:10px 12px"><div style="font-weight:600;color:#334155">' + r.plan + '</div><div style="margin-top:2px">' + cycleBadge + '</div></td>';
            h += '<td style="padding:10px 12px"><span style="font-size:11.5px;color:#475569;display:inline-flex;align-items:center;gap:4px">' + methodIcon + ' ' + r.method.split('(')[0].trim() + '</span></td>';
            h += '<td style="padding:10px 12px;text-align:right"><strong style="color:#089490;font-size:13.5px">' + fmt(r.amount) + '</strong></td>';
            h += '<td style="padding:10px 12px;text-align:right;background:#fafffd"><strong style="color:#0f766e;font-size:13px">' + fmt(cum) + '</strong></td>';
            h += '<td style="padding:10px 12px;text-align:center"><span style="background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:12px;font-size:10.5px;font-weight:700;border:1px solid #bbf7d0;display:inline-flex;align-items:center;gap:3px">✓ Đã về két</span></td>';
            h += '<td style="padding:10px 12px;font-size:11.5px;color:#475569">' + r.note + '</td>';
            h += '</tr>';
          });
          tbody.innerHTML = h;
        }
      }

      // Update Table Footer
      var footTotal = document.getElementById('dcm-foot-total');
      var footCum = document.getElementById('dcm-foot-cum');
      var footNote = document.getElementById('dcm-foot-note');

      if (footTotal) footTotal.textContent = fmt(filteredTotal);
      if (footCum) footCum.textContent = fmt(filteredTotal);
      if (footNote) footNote.textContent = filteredRows.length + '/' + countAll + ' giao dịch đối soát 100% khớp tài khoản';
    };

    window.openDailyCashModal = function (period) {
      var m = document.getElementById('daily-cash-modal');
      if (!m) return;
      var p = period || window.currentPeriod || '2026-09';
      if (p === '2026-09-24') p = '2026-09';
      window.currentDailyCashPeriod = p;
      window.renderDailyCashContent(window.currentDailyCashSeg || 'ALL', p, '');
      m.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    window.closeDailyCashModal = function () {
      var m = document.getElementById('daily-cash-modal');
      if (m) m.style.display = 'none';
      document.body.style.overflow = '';
    };

    window.exportDailyCashCSV = function () {
      var isUsd = (window.currentCurrency === 'USD');
      var curr = isUsd ? 'USD' : 'JPY';
      var rate = isUsd ? (1 / 150.24) : 1;
      var records = window.getDailyCashRecordsForPeriod(window.currentDailyCashPeriod || '2026-09');

      var csv = '﻿Ngay_Thu,Ma_HD,Khach_Hang,Nguoi_Lien_He,Phan_Khuc,Goi_Cuoc,Chu_Ky,Phuong_Thuc,So_Tien (' + curr + '),Luy_Ke (' + curr + '),Trang_Thai,Ghi_Chu\n';

      var cum = 0;
      records.forEach(function (r) {
        var amt = isUsd ? Math.round(r.amount * rate) : r.amount;
        cum += amt;
        var cleanName = '"' + r.name.replace(/"/g, '""') + '"';
        var cleanContact = '"' + r.contact.replace(/"/g, '""') + '"';
        var cleanMethod = '"' + r.method.replace(/"/g, '""') + '"';
        var cleanNote = '"' + r.note.replace(/"/g, '""') + '"';
        csv += r.day + ',' + r.id + ',' + cleanName + ',' + cleanContact + ',' + r.type + ',' + r.plan + ',' + r.cycle + ',' + cleanMethod + ',' + amt + ',' + cum + ',Da_Ve_Ket,' + cleanNote + '\n';
      });

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Emind_Bang_Dong_Tien_Thuc_Thu_Den_24_09_2026.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Close modal on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeDailyCashModal();
        window.closeAddContractModal();
      }
    });
    window.showAdminToast = function (msg, type) {
      var t = document.getElementById('admin-toast');
      if (!t) return;
      var icon = (type === 'success') ? '✅' : (type === 'info' ? 'ℹ️' : '🔔');
      t.innerHTML = '<span>' + icon + ' ' + msg + '</span>';
      t.classList.add('show');
      clearTimeout(window.adminToastTimer);
      window.adminToastTimer = setTimeout(function () {
        t.classList.remove('show');
      }, 3500);
    };
    window.toggleTimelineMatrix = function (forceState) {
      var panel = document.getElementById('timeline-matrix-panel');
      var icon = document.getElementById('matrix-toggle-icon');
      if (!panel) return;
      var isHidden = (panel.style.display === 'none');
      var newState = (forceState !== undefined) ? forceState : isHidden;
      panel.style.display = newState ? 'block' : 'none';
      if (icon) icon.textContent = newState ? '▲' : '▼';
    };

    window.toggleCurrency = function (curr) {
      window.currentCurrency = curr;
      var btnJpy = document.getElementById('btn-curr-jpy');
      var btnUsd = document.getElementById('btn-curr-usd');
      if (btnJpy) btnJpy.classList.toggle('active', curr === 'JPY');
      if (btnUsd) btnUsd.classList.toggle('active', curr === 'USD');

      if (typeof window.applyDashboardMetrics === 'function') window.applyDashboardMetrics();
      if (typeof window.renderInteractiveRevenueChart === 'function') window.renderInteractiveRevenueChart();
      if (typeof window.renderDailyCashflowDashboard === 'function') window.renderDailyCashflowDashboard();
      if (typeof window.renderDummyContractsTable === 'function') window.renderDummyContractsTable();
    };

    window.changeDashboardPeriod = function (period) {
      quickJumpPeriod(period);
    };

    window.exportDashboardSummary = function () {
      var isUsd = (window.currentCurrency === 'USD');
      var currSymbol = isUsd ? 'USD' : 'JPY';
      var csvContent = "data:text/csv;charset=utf-8,Phan Khuc,Chi So,Gia Tri (" + currSymbol + "),Ghi Chu\n";
      csvContent += '"Tong The","Tong Khach Hang","52","32 Doanh nghiep • 20 Nguoi dung ca nhan"\n';
      csvContent += '"Tong The","Doanh Thu Thang (MRR)",' + (isUsd ? '"$3,115"' : '"¥468,000"') + ',"ARR: ' + (isUsd ? '$37.4k' : '¥5.61M') + '"\n';
      csvContent += '"Tong The","Thuc Thu Thang 09",' + (isUsd ? '"$1,058"' : '"¥158,900"') + ',"Thu day du 100% KPI thang 9"\n';
      csvContent += '"Tong The","Ghe Hoat Dong (Active Seats)","442 / 520","Ty le su dung 85.0% • Con trong 78 slot"\n';

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Emind_Bao_Cao_Tong_Quan_Doanh_Thu.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


    function initDashboardLogic() {
      var periodSelect = document.getElementById('vb-period-select');
      if (periodSelect) {
        periodSelect.addEventListener('change', function (e) {
          changeDashboardPeriod(e.target.value);
        });
      }
      if (typeof window.applyDashboardMetrics === "function") window.applyDashboardMetrics();
      if (typeof window.renderInteractiveRevenueChart === "function") window.renderInteractiveRevenueChart();
      if (typeof window.renderDashboardOperations === "function") window.renderDashboardOperations();
      if (typeof window.renderDummyContractsTable === "function") window.renderDummyContractsTable();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDashboardLogic);
    } else {
      initDashboardLogic();
    }
