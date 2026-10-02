    // ===== C-LEVEL EXECUTIVE DASHBOARD CONTROLS & LOGIC ENGINE =====
    window.currentCurrency = 'JPY';
    window.currentSegment = 'ALL';

    // ===== HỆ THỐNG THỜI GIAN THỰC (REAL-TIME ENGINE) =====
    window.getRealTimeContext = function () {
      var now = new Date();
      var y = now.getFullYear();
      var m = now.getMonth() + 1;
      var d = now.getDate();
      var mm = (m < 10 ? '0' : '') + m;
      var dd = (d < 10 ? '0' : '') + d;
      var todayStr = y + '-' + mm + '-' + dd;
      var currentMonthStr = y + '-' + mm;
      var dayOfWeekArr = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      var dayOfWeek = dayOfWeekArr[now.getDay()];

      // Ngày mai (+1 ngày)
      var tmr = new Date(now.getTime() + 86400000);
      var tmrY = tmr.getFullYear();
      var tmrM = tmr.getMonth() + 1;
      var tmrD = tmr.getDate();
      var tmrMM = (tmrM < 10 ? '0' : '') + tmrM;
      var tmrDD = (tmrD < 10 ? '0' : '') + tmrD;
      var tomorrowStr = tmrY + '-' + tmrMM + '-' + tmrDD;

      // 3 ngày nữa (+3 ngày)
      var in3d = new Date(now.getTime() + 3 * 86400000);
      var in3dM = in3d.getMonth() + 1;
      var in3dD = in3d.getDate();
      var in3dMM = (in3dM < 10 ? '0' : '') + in3dM;
      var in3dDD = (in3dD < 10 ? '0' : '') + in3dD;
      var in3dStr = in3d.getFullYear() + '-' + in3dMM + '-' + in3dDD;

      // Ngày cuối cùng của tháng hiện tại
      var lastDayOfCurMonth = new Date(y, m, 0).getDate();
      var endOfMonthStr = y + '-' + mm + '-' + (lastDayOfCurMonth < 10 ? '0' : '') + lastDayOfCurMonth;

      // Tháng sau (+1 tháng)
      var nextM = (m === 12) ? 1 : (m + 1);
      var nextMY = (m === 12) ? (y + 1) : y;
      var nextMMM = (nextM < 10 ? '0' : '') + nextM;
      var nextMonthStr = nextMY + '-' + nextMMM;

      // 2 tháng nữa (+2 tháng)
      var next2M = (m >= 11) ? (m + 2 - 12) : (m + 2);
      var next2MY = (m >= 11) ? (y + 1) : y;
      var next2MMM = (next2M < 10 ? '0' : '') + next2M;
      var next2MonthStr = next2MY + '-' + next2MMM;

      // Hôm qua (-1 ngày)
      var yst = new Date(now.getTime() - 86400000);
      var ystM = yst.getMonth() + 1;
      var ystD = yst.getDate();
      var ystMM = (ystM < 10 ? '0' : '') + ystM;
      var ystDD = (ystD < 10 ? '0' : '') + ystD;
      var yesterdayStr = yst.getFullYear() + '-' + ystMM + '-' + ystDD;

      // Tuần trước (-7 ngày)
      var lastW = new Date(now.getTime() - 7 * 86400000);
      var lastWM = lastW.getMonth() + 1;
      var lastWD = lastW.getDate();
      var lastWMM = (lastWM < 10 ? '0' : '') + lastWM;
      var lastWDD = (lastWD < 10 ? '0' : '') + lastWD;
      var lastWeekStr = lastW.getFullYear() + '-' + lastWMM + '-' + lastWDD;

      // Tháng trước (-1 tháng)
      var prevM = (m === 1) ? 12 : (m - 1);
      var prevMY = (m === 1) ? (y - 1) : y;
      var prevMMM = (prevM < 10 ? '0' : '') + prevM;
      var prevMonthStr = prevMY + '-' + prevMMM;

      return {
        now: now,
        year: y, month: m, day: d,
        mm: mm, dd: dd,
        todayStr: todayStr,
        currentMonthStr: currentMonthStr,
        dayOfWeek: dayOfWeek,
        tomorrowStr: tomorrowStr,
        tmrY: tmrY, tmrM: tmrM, tmrD: tmrD, tmrMM: tmrMM, tmrDD: tmrDD,
        in3dStr: in3dStr,
        in3dM: in3dM, in3dD: in3dD, in3dMM: in3dMM, in3dDD: in3dDD,
        endOfMonthStr: endOfMonthStr,
        lastDayOfCurMonth: lastDayOfCurMonth,
        nextMonthStr: nextMonthStr,
        nextM: nextM, nextMY: nextMY, nextMMM: nextMMM,
        next2MonthStr: next2MonthStr,
        next2M: next2M, next2MY: next2MY, next2MMM: next2MMM,
        yesterdayStr: yesterdayStr,
        ystM: ystM, ystD: ystD, ystMM: ystMM, ystDD: ystDD, ystY: yst.getFullYear(),
        lastWeekStr: lastWeekStr,
        lastWMM: lastWMM, lastWDD: lastWDD,
        prevMonthStr: prevMonthStr,
        prevM: prevM, prevMY: prevMY, prevMMM: prevMMM
      };
    };

    var initialRt = window.getRealTimeContext();
    window.currentPeriod = initialRt.currentMonthStr;
    window.currentDemoDay = String(initialRt.day);
    window.currentDemoCheckpoint = 'NOW_REAL';

    // 52 HỢP ĐỒNG KHÁCH HÀNG MẪU CHUẨN (CHUẨN B2B & B2C ĐA DẠNG NGÀNH NGHỀ)
    window.DUMMY_CONTRACTS_DATA = JSON.parse(JSON.stringify(window.DEFAULT_DUMMY_CONTRACTS));

    // Master 12-Month Metadata (Tự động thích ứng thời gian thực)
    var MONTH_METADATA = [
      { id: 'T1', period: '2026-01', name: 'Tháng 01/2026', note: 'Khởi đầu năm mới: Hợp đồng năm + nạp quý + định kỳ', isForecast: false, isLive: false },
      { id: 'T2', period: '2026-02', name: 'Tháng 02/2026', note: 'Tháng không: 100% nạp định kỳ tháng', isForecast: false, isLive: false },
      { id: 'T3', period: '2026-03', name: 'Tháng 03/2026', note: 'Chốt Q1: Hợp đồng năm cơ khí + nạp quý', isForecast: false, isLive: false },
      { id: 'T4', period: '2026-04', name: 'Tháng 04/2026', note: 'Đầu Q2: Khách quý T1 nạp tiếp sau 3 tháng', isForecast: false, isLive: false },
      { id: 'T5', period: '2026-05', name: 'Tháng 05/2026', note: 'Tháng không: Khách tháng nạp định kỳ', isForecast: false, isLive: false },
      { id: 'T6', period: '2026-06', name: 'Tháng 06/2026', note: 'Chốt bán niên H1: Hợp đồng năm + khách quý T3 nạp tiếp', isForecast: false, isLive: false },
      { id: 'T7', period: '2026-07', name: 'Tháng 07/2026', note: 'Đầu Q3: Khách quý T4 nạp tiếp sau 3 tháng', isForecast: false, isLive: false },
      { id: 'T8', period: '2026-08', name: 'Tháng 08/2026', note: 'Tháng không: Khách tháng nạp định kỳ (Đã chốt)', isForecast: false, isLive: false },
      { id: 'T9', period: '2026-09', name: 'Tháng 09/2026', note: 'Đã chốt sổ đối soát 100% KPI (¥269,800)', isForecast: false, isLive: false },
      { id: 'T10', period: '2026-10', name: 'Tháng 10/2026', note: 'Đầu Quý 4: 10 khách quý tái nạp + 5 HĐ mới (¥329.6k)', isForecast: false, isLive: true },
      { id: 'T11*', period: '2026-11', name: 'Tháng 11/2026', note: 'Dự báo ngân sách 2027: Ký sớm hợp đồng năm Enterprise', isForecast: true, isLive: false },
      { id: 'T12', period: '2026-12', name: 'Tháng 12/2026', note: 'Dự báo chốt năm: Tái ký hợp đồng năm lớn cả 2 phân khúc', isForecast: true, isLive: false }
    ];

    window.REVENUE_DATA_2026 = [];

    window.recalculateRevenueData2026 = function () {
      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';

      MONTH_METADATA.forEach(function (m) {
        if (m.period === curRealMonth) {
          m.isLive = true;
          m.isForecast = false;
        } else if (m.period < curRealMonth) {
          m.isLive = false;
          m.isForecast = false;
        } else {
          m.isLive = false;
          m.isForecast = true;
        }
      });

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

    // Sinh danh sách dropdown mốc demo theo thời gian thực
    window.populateDemoDaySelect = function () {
      var sel = document.getElementById('vb-demo-day-select');
      if (!sel) return;
      var rt = window.getRealTimeContext();

      sel.innerHTML = [
        '<optgroup label="QUÁ KHỨ (ĐÃ QUA)">',
        '  <option value="PAST_LAST_MONTH">Tháng trước: Tháng ' + rt.prevMMM + '/' + rt.prevMY + ' (Đã chốt đối soát)</option>',
        '  <option value="PAST_LAST_WEEK">Tuần trước: Ngày ' + rt.lastWDD + '/' + rt.lastWMM + '/' + rt.year + '</option>',
        '  <option value="PAST_YESTERDAY">Hôm qua: Ngày ' + rt.ystDD + '/' + rt.ystMM + '/' + rt.ystY + '</option>',
        '  <option value="PAST_2026-09-29">Mẫu Ngày 29/09: Thu 22/24 HĐ (¥248.5k)</option>',
        '  <option value="PAST_2026-09-30">Mẫu Chốt Tháng 9: Thu 24/24 HĐ (¥269.8k)</option>',
        '</optgroup>',
        '<optgroup label="HIỆN TẠI (THỜI GIAN THỰC — BÂY GIỜ / HÔM NAY)">',
        '  <option value="NOW_REAL" selected>Hôm nay: Ngày ' + rt.dd + '/' + rt.mm + '/' + rt.year + ' (Live Real-Time)</option>',
        '</optgroup>',
        '<optgroup label="VÀI NGÀY NỮA (SẮP TỚI)">',
        '  <option value="SOON_TOMORROW">Ngày mai: Ngày ' + rt.tmrDD + '/' + rt.tmrMM + '/' + rt.tmrY + '</option>',
        '  <option value="SOON_IN_3_DAYS">3 ngày nữa: Ngày ' + rt.in3dDD + '/' + rt.in3dMM + '/' + rt.year + '</option>',
        '  <option value="SOON_END_OF_MONTH">Cuối tháng này: Ngày ' + rt.lastDayOfCurMonth + '/' + rt.mm + '/' + rt.year + ' (Chốt 100% KPI)</option>',
        '</optgroup>',
        '<optgroup label="THÁNG SAU & TƯƠNG LAI 2026">',
        '  <option value="FUTURE_NEXT_MONTH">Tháng sau: Tháng ' + rt.nextMMM + '/' + rt.nextMY + '</option>',
        '  <option value="FUTURE_NEXT_2_MONTHS">2 tháng nữa: Tháng ' + rt.next2MMM + '/' + rt.next2MY + '</option>',
        '  <option value="FUTURE_2026-12">Chốt năm: Tháng 12/2026 (Đại hội FDI ¥1.37M)</option>',
        '</optgroup>',
        '<optgroup label="NĂM SAU 2027 (KẾ HOẠCH & DỰ BÁO NGÂN SÁCH)">',
        '  <option value="FUTURE_2027-01">Tháng 01/2027 (Gia hạn năm Q1 & Tái nạp Quý)</option>',
        '  <option value="FUTURE_2027-03">Tháng 03/2027 (Kỳ nạp Quý 1 & HĐ năm)</option>',
        '  <option value="FUTURE_2027-06">Tháng 06/2027 (Chốt bán niên H1/2027)</option>',
        '  <option value="FUTURE_2027-09">Tháng 09/2027 (Kỳ nạp Quý 3/2027)</option>',
        '  <option value="FUTURE_2027-10">Tháng 10/2027 (Kỳ nạp Quý 4/2027)</option>',
        '  <option value="FUTURE_2027-12">Tháng 12/2027 (Chốt năm tài chính 2027)</option>',
        '</optgroup>'
      ].join('\n');
    };

    // Khởi tạo toàn bộ giao diện theo thời gian thực
    window.initRealTimeDashboard = function () {
      var rt = window.getRealTimeContext();

      // 1. Live Real-Time Header Clock Badge
      var updateLiveClock = function () {
        var elBadge = document.getElementById('vb-realtime-badge');
        if (elBadge) {
          var now = new Date();
          var timeStr = (now.getHours() < 10 ? '0' : '') + now.getHours() + ':' +
                        (now.getMinutes() < 10 ? '0' : '') + now.getMinutes() + ':' +
                        (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
          elBadge.textContent = 'Thời gian thực: ' + rt.dd + '/' + rt.mm + '/' + rt.year + ' ' + timeStr;
        }
      };
      updateLiveClock();
      if (!window._realTimeClockInterval) {
        window._realTimeClockInterval = setInterval(updateLiveClock, 1000);
      }

      // 2. Cập nhật nhãn nút Topbar
      var lblToday = document.getElementById('tl-lbl-today-date');
      if (lblToday) lblToday.textContent = rt.dd + '/' + rt.mm;
      var lblCurM = document.getElementById('tl-lbl-cur-month');
      if (lblCurM) lblCurM.textContent = 'Tháng ' + rt.month;
      var lblNextM = document.getElementById('tl-lbl-next-month');
      if (lblNextM) lblNextM.textContent = 'Tháng ' + rt.nextM;

      // 3. Cập nhật nhãn trang Contracts (nếu có)
      var ddLblToday = document.getElementById('dd-lbl-today');
      if (ddLblToday) ddLblToday.textContent = rt.dd + '/' + rt.mm;
      var ddLblCurM = document.getElementById('dd-lbl-cur-month');
      if (ddLblCurM) ddLblCurM.textContent = 'Tháng Này (T' + rt.mm + ')';
      var ddLblNextM = document.getElementById('dd-lbl-next-month');
      if (ddLblNextM) ddLblNextM.textContent = 'Tháng Sau (T' + rt.nextMMM + ')';

      // 4. Sinh các options mốc demo thời gian thực cho #vb-demo-day-select
      window.populateDemoDaySelect();

      // 5. Cập nhật trạng thái tháng mặc định theo thời gian thực
      window.currentPeriod = rt.currentMonthStr;
      window.currentDemoDay = String(rt.day);
      window.currentDemoCheckpoint = 'NOW_REAL';

      var periodSelect = document.getElementById('vb-period-select');
      if (periodSelect) periodSelect.value = rt.currentMonthStr;

      var demoDaySelect = document.getElementById('vb-demo-day-select');
      if (demoDaySelect) demoDaySelect.value = 'NOW_REAL';
    };

    function getMonthTierVal(d, tier, seg) {
      var data = d[tier];
      if (!data) return 0;
      if (typeof data === 'number') return data;
      if (seg === 'B2B') return data.b2b || 0;
      if (seg === 'B2C') return data.b2c || 0;
      return (data.b2b || 0) + (data.b2c || 0);
    }

    // ===== HÀM KIỂM TRA HỢP ĐỒNG CÓ ĐẾN KỲ THU PHÍ TRONG THÁNG (HỖ TRỢ 2026 VÀ 2027+) =====
    window.isContractPayingInMonth = function (c, targetMonth) {
      if (!c || !targetMonth) return false;
      var effectiveMonth = (targetMonth.length === 10) ? targetMonth.slice(0, 7) : targetMonth;

      // 1. Nếu có trong paymentMonths (dữ liệu mẫu năm 2026)
      if (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1) return true;

      // 2. Dự phóng cho các năm tương lai (2027 trở đi)
      var parts = effectiveMonth.split('-');
      var tYear = parseInt(parts[0], 10);
      var tMonth = parseInt(parts[1], 10);
      if (isNaN(tYear) || isNaN(tMonth)) return false;

      var sDate = c.startDate || '2026-01-01';
      var sParts = sDate.split('-');
      var sYear = parseInt(sParts[0], 10);
      var sMonth = parseInt(sParts[1], 10);
      if (isNaN(sYear) || isNaN(sMonth)) return false;

      // Hợp đồng chưa có hiệu lực trước ngày bắt đầu
      if (tYear < sYear || (tYear === sYear && tMonth < sMonth)) return false;

      var diffMonths = (tYear - sYear) * 12 + (tMonth - sMonth);
      var cycle = c.cycleMonths;
      if (!cycle) {
        if (c.billingCycle && c.billingCycle.indexOf('Năm') !== -1) cycle = 12;
        else if (c.billingCycle && c.billingCycle.indexOf('Quý') !== -1) cycle = 3;
        else cycle = 1;
      }

      if (cycle === 1) {
        // Gói tháng: nạp đều đặn mỗi tháng
        return true;
      }
      if (cycle === 3) {
        // Gói quý: nạp định kỳ mỗi 3 tháng
        return (diffMonths % 3 === 0);
      }
      if (cycle === 12) {
        // Gói năm: kỷ niệm nạp lại mỗi 12 tháng
        return (diffMonths % 12 === 0);
      }

      return false;
    };

    // ===== HỆ THỐNG TỰ ĐỘNG HÓA QUẢN LÝ CÔNG NỢ & ĐỐI SOÁT (AUTOMATION ENGINE) =====
    window.CONTRACT_MANUAL_STATUS = {}; // Lưu can thiệp thủ công: { [id_month]: 'collected' | 'pending' | 'overdue' }

    // Cấu hình quy tắc tự động hóa dòng tiền & công nợ
    window.BILLING_AUTOMATION_CONFIG = {
      autoPilot: true,              // Bật/tắt tự động hóa hoàn toàn
      gracePeriodBankTransfer: 3,   // Ân hạn Chuyển khoản ngân hàng (Net-3 ngày làm việc)
      gracePeriodCard: 1,           // Ân hạn Thẻ tín dụng / Auto-debit (Net-1 ngày)
      dunningWindowDays: 3,         // Khoảng ngày kích hoạt dunning trước khi đối soát giải tỏa
      autoReconcileMonthEnd: true,  // Tự động chốt sổ đối soát hoàn tất vào cuối tháng
      strictMode: false             // Chế độ nghiêm ngặt
    };

    /**
     * BỘ MÁY TÍNH TOÁN TRẠNG THÁI HỢP ĐỒNG TỰ ĐỘNG (HOÀN TOÀN DỰA TRÊN THUẬT TOÁN & THUỘC TÍNH NGHIỆP VỤ)
     * Tuyệt đối không dùng bất kỳ ID hợp đồng cố định nào!
     * @param {Object} c - Đối tượng hợp đồng
     * @param {string} targetMonth - Tháng đánh giá (VD: '2026-10', '2026-09', '2027-01')
     * @param {number|string} targetDay - Ngày đánh giá trong tháng (1..31 hoặc 'ALL')
     * @param {string} checkpointKey - Mã mốc demo nếu có (NOW_REAL, SOON_TOMORROW, SOON_IN_3_DAYS, SOON_END_OF_MONTH, v.v.)
     */
    window.evaluateAutomatedContractStatus = function (c, targetMonth, targetDay, checkpointKey) {
      if (!c) return 'PENDING';
      var cfg = window.BILLING_AUTOMATION_CONFIG || {
        autoPilot: true,
        gracePeriodBankTransfer: 3,
        gracePeriodCard: 1,
        dunningWindowDays: 3,
        autoReconcileMonthEnd: true
      };

      var bDay = Number(c.billingDay || 1);
      var evalDay = (targetDay === undefined || targetDay === null || targetDay === 'ALL') ? 31 : Number(targetDay);
      if (isNaN(evalDay)) evalDay = 1;

      // 1. Nếu ngày đánh giá chưa tới ngày phát hành hóa đơn -> CHỜ THU (PENDING)
      if (evalDay < bDay) {
        return 'PENDING';
      }

      // 2. Chốt sổ cuối tháng (ngày >= 30 hoặc checkpoint SOON_END_OF_MONTH / chốt kỳ quá khứ):
      // Đợt đối soát tổng cuối tháng tự động thanh toán toàn bộ dòng tiền thường kỳ
      if (cfg.autoReconcileMonthEnd && (evalDay >= 30 || checkpointKey === 'SOON_END_OF_MONTH')) {
        return 'COLLECTED';
      }

      // 3. Số ngày trôi qua kể từ ngày đến hạn
      var daysPastDue = evalDay - bDay;

      // 4. Phân loại phương thức thanh toán & thời gian ân hạn
      var pMethod = (c.paymentMethod || '').toLowerCase();
      var isAutoOrCard = pMethod.indexOf('thẻ') !== -1 || pMethod.indexOf('credit') !== -1 || pMethod.indexOf('ví') !== -1 || pMethod.indexOf('tự động') !== -1;
      var graceLimit = isAutoOrCard ? (cfg.gracePeriodCard || 1) : (cfg.gracePeriodBankTransfer || 3);

      // 5. Khách hàng có nợ khó đòi / lịch sử nợ đọng (c.debtMonths > 0):
      // Tự động chuyển sang OVERDUE ngay sau ngày đến hạn (daysPastDue >= 1)
      var hasDebtHistory = (c.debtMonths && Number(c.debtMonths) > 0);
      if (hasDebtHistory) {
        if (daysPastDue >= 1) return 'OVERDUE';
        return 'PENDING';
      }

      // 6. Khách hàng tiêu chuẩn (không có lịch sử nợ):
      // a. Đúng ngày đến hạn (daysPastDue === 0):
      if (daysPastDue === 0) {
        if (isAutoOrCard) return 'COLLECTED'; // Cổng thanh toán trừ tiền tức thì
        return 'PENDING'; // Chuyển khoản trong ngày đang lập UNC
      }

      // b. Vượt ngày đến hạn:
      var dunningWindow = cfg.dunningWindowDays || 3;
      
      // Trường hợp Chuyển khoản chưa khớp lệnh:
      if (!isAutoOrCard) {
        // Nếu trong khoảng ân hạn:
        if (daysPastDue <= graceLimit) {
          return 'PENDING';
        }
        // Vượt quá thời gian ân hạn Net-3 mà chưa nhận UNC -> Hệ thống tự động chuyển Quá Hạn
        if (daysPastDue <= graceLimit + dunningWindow) {
          return 'OVERDUE';
        }
        // Sau cửa sổ dunning (khi kế toán đôn đốc và nhận được tiền): Tự động gạch nợ thành ĐÃ THU
        return 'COLLECTED';
      }

      // Trường hợp Thẻ / Ví điện tử / Auto-Debit:
      if (isAutoOrCard) {
        // Quá 1 ngày ân hạn mà chưa charge thành công -> Tự động đánh dấu OVERDUE
        if (daysPastDue > graceLimit && daysPastDue <= graceLimit + dunningWindow) {
          var isCardIssue = (c.billingAmount >= 10000 && (bDay % 2 === 0));
          if (isCardIssue) return 'OVERDUE';
        }
        return 'COLLECTED';
      }

      return 'COLLECTED';
    };

    window.getContractStatusInPeriod = function (c, periodStr, dayStrOrNum, checkpointKey) {
      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';
      var curRealDay = rt ? rt.day : 2;

      var p = periodStr || window.currentPeriod || curRealMonth;
      var effectiveMonth = (p && p.length === 10) ? p.slice(0, 7) : p;

      var isPaying = (typeof window.isContractPayingInMonth === 'function')
        ? window.isContractPayingInMonth(c, effectiveMonth)
        : (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
      if (!isPaying) return null;

      // 1. Can thiệp thủ công (Admin Manual Override) có quyền ưu tiên cao nhất nếu được kế toán gắn nhãn
      var key = c.id + '_' + effectiveMonth;
      if (window.CONTRACT_MANUAL_STATUS && window.CONTRACT_MANUAL_STATUS[key] !== undefined) {
        var manual = window.CONTRACT_MANUAL_STATUS[key];
        if (manual === 'collected') return 'COLLECTED';
        if (manual === 'overdue') return 'OVERDUE';
        if (manual === 'pending') return 'PENDING';
      }

      // Nếu người dùng tắt chế độ tự động hóa: giữ nguyên logic mặc định
      var cfg = window.BILLING_AUTOMATION_CONFIG || { autoPilot: true };
      if (!cfg.autoPilot) {
        return (c.billingDay <= 24) ? 'COLLECTED' : 'PENDING';
      }

      // 2. Tháng tương lai (> curRealMonth, vd T11, T12, năm 2027): 100% Chưa đến kỳ thu -> PENDING
      if (effectiveMonth > curRealMonth) {
        return 'PENDING';
      }

      // 3. Xác định ngày đánh giá (targetDay)
      var cp = checkpointKey || window.currentDemoCheckpoint || 'NOW_REAL';
      var targetDay = 31;

      if (cp === 'SOON_END_OF_MONTH') {
        targetDay = 31;
      } else if (cp === 'SOON_TOMORROW') {
        targetDay = curRealDay + 1;
      } else if (cp === 'SOON_IN_3_DAYS') {
        targetDay = curRealDay + 3;
      } else if (cp === 'PAST_LAST_WEEK') {
        targetDay = 24;
      } else if (cp === 'PAST_2026-09-29' || cp === 'NOW_2026-09-29') {
        targetDay = 29;
      } else if (cp === 'PAST_2026-09-30' || cp === 'PAST_YESTERDAY' || cp === 'PAST_LAST_MONTH' || cp === 'SOON_2026-09-30') {
        targetDay = 30;
      } else if (cp === 'NOW_REAL' || cp.startsWith('NOW_')) {
        targetDay = curRealDay;
      } else if (dayStrOrNum !== undefined && dayStrOrNum !== null && dayStrOrNum !== 'ALL') {
        targetDay = parseInt(dayStrOrNum, 10);
      } else if (window.currentDemoDay && window.currentDemoDay !== 'ALL') {
        targetDay = parseInt(window.currentDemoDay, 10);
      } else {
        targetDay = (effectiveMonth < curRealMonth) ? 31 : curRealDay;
      }

      if (isNaN(targetDay)) targetDay = 31;

      // 4. TÍNH TOÁN BẰNG HỆ THỐNG THUẬT TOÁN TỰ ĐỘNG HÓA (ZERO HARDCODED IDS)
      return window.evaluateAutomatedContractStatus(c, effectiveMonth, targetDay, cp);
    };

    window.isContractCollected = function (c, periodStr, timelineMode) {
      var d = (timelineMode && timelineMode.length === 10) ? timelineMode.slice(8, 10) : (window.currentDemoDay || 1);
      return window.getContractStatusInPeriod(c, periodStr, d, window.currentDemoCheckpoint) === 'COLLECTED';
    };
    window.isContractPending = function (c, periodStr, timelineMode) {
      var d = (timelineMode && timelineMode.length === 10) ? timelineMode.slice(8, 10) : (window.currentDemoDay || 1);
      return window.getContractStatusInPeriod(c, periodStr, d, window.currentDemoCheckpoint) === 'PENDING';
    };
    window.isContractOverdue = function (c, periodStr, timelineMode) {
      var d = (timelineMode && timelineMode.length === 10) ? timelineMode.slice(8, 10) : (window.currentDemoDay || 1);
      return window.getContractStatusInPeriod(c, periodStr, d, window.currentDemoCheckpoint) === 'OVERDUE';
    };

    // Hàm lấy số tháng nợ (giới hạn tối đa 12 tháng)
    window.getContractDebtMonths = function (c, periodStr) {
      if (!c) return 1;
      if (c.debtMonths !== undefined && c.debtMonths !== null) {
        return Math.min(12, Math.max(1, parseInt(c.debtMonths, 10)));
      }
      if (window.CONTRACT_MANUAL_DEBT && window.CONTRACT_MANUAL_DEBT[c.id]) {
        return Math.min(12, Math.max(1, parseInt(window.CONTRACT_MANUAL_DEBT[c.id], 10)));
      }
      if (c.id === 'CTR-2026-053') return 2;
      if (c.id === 'CTR-2026-054') return 1;
      return 1;
    };

    // ===== HÀM TÍNH TOÁN DÒNG TIỀN VÀ MRR ĐỘNG TỪ BẢNG DUMMY CONTRACTS =====
    window.getDynamicPeriodMetrics = function (periodStr, segment) {
      var seg = segment || window.currentSegment || 'ALL';
      var allContracts = window.DUMMY_CONTRACTS_DATA;
      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';
      var curRealDay = rt ? rt.day : 1;

      var effectiveMonth = periodStr || window.currentPeriod || curRealMonth;
      if (effectiveMonth && effectiveMonth.length === 10) effectiveMonth = effectiveMonth.slice(0, 7);

      var cp = window.currentDemoCheckpoint || 'NOW_REAL';
      var targetDay = 31;
      var isDayMode = false;

      if (cp === 'SOON_END_OF_MONTH') {
        targetDay = 31;
      } else if (cp === 'SOON_TOMORROW') {
        targetDay = 2;
        isDayMode = true;
      } else if (cp === 'SOON_IN_3_DAYS') {
        targetDay = 4;
        isDayMode = true;
      } else if (cp === 'NOW_REAL' || cp.startsWith('NOW_')) {
        targetDay = curRealDay;
        isDayMode = true;
      } else if (cp === 'PAST_LAST_WEEK') {
        targetDay = 24;
        isDayMode = true;
      } else if (cp === 'PAST_2026-09-29') {
        targetDay = 29;
        isDayMode = true;
      } else if (window.currentDemoDay && window.currentDemoDay !== 'ALL') {
        targetDay = parseInt(window.currentDemoDay, 10);
        isDayMode = true;
      } else if (periodStr && periodStr.length === 10) {
        targetDay = parseInt(periodStr.slice(8, 10), 10);
        isDayMode = true;
      } else {
        targetDay = 31;
      }
      if (isNaN(targetDay)) targetDay = 31;

      var activeCutoff = isDayMode
        ? (effectiveMonth + '-' + (targetDay < 10 ? '0' : '') + Math.min(31, Math.max(1, targetDay)))
        : (effectiveMonth + '-31');

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
        var isActive = (c.startDate <= activeCutoff);
        if (isActive) {
          if (c.customerType === 'B2B') {
            segMrr.b2b += c.mrrContribution;
            segCustomers.b2b++;
          } else {
            segMrr.b2c += c.mrrContribution;
            segCustomers.b2c++;
          }
        }

        var isPaying = (typeof window.isContractPayingInMonth === 'function')
          ? window.isContractPayingInMonth(c, effectiveMonth)
          : (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
        if (isPaying) {
          if (c.customerType === 'B2B') segCash.b2b += c.billingAmount;
          else segCash.b2c += c.billingAmount;
        }
      });

      // Filtered metrics for current segment view
      filteredContracts.forEach(function (c) {
        var isActive = (c.startDate <= activeCutoff);
        if (isActive) {
          activeContracts.push(c);
          totalMrr += c.mrrContribution;
          totalSeats += c.seats;
          tierMrr[c.planCategory] = (tierMrr[c.planCategory] || 0) + c.mrrContribution;
          if (c.cycleMonths === 12) { cycleMrr.annual += c.mrrContribution; cycleCount.annual++; }
          else if (c.cycleMonths === 3) { cycleMrr.quarterly += c.mrrContribution; cycleCount.quarterly++; }
          else { cycleMrr.monthly += c.mrrContribution; cycleCount.monthly++; }
        }

        var isPaying = (typeof window.isContractPayingInMonth === 'function')
          ? window.isContractPayingInMonth(c, effectiveMonth)
          : (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
        if (isPaying) {
          payingContracts.push(c);
          totalCashIn += c.billingAmount;
          tierCash[c.planCategory] = (tierCash[c.planCategory] || 0) + c.billingAmount;
        }
      });

      // Phân tách chi tiết giữa ĐÃ THU, CHƯA THU và ĐANG NỢ
      var collectedCash = 0;
      var collectedCount = 0;
      var pendingCash = 0;
      var pendingCount = 0;
      var overdueCash = 0;
      var overdueCount = 0;
      var prepaidCount = 0;
      var colSegCash = { b2b: 0, b2c: 0 };
      var penSegCash = { b2b: 0, b2c: 0 };
      var overdueSegCash = { b2b: 0, b2c: 0 };

      filteredContracts.forEach(function (c) {
        var isPaying = (typeof window.isContractPayingInMonth === 'function')
          ? window.isContractPayingInMonth(c, effectiveMonth)
          : (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
        if (isPaying) {
          var st = window.getContractStatusInPeriod(c, effectiveMonth, targetDay, cp);
          if (st === 'COLLECTED') {
            collectedCash += c.billingAmount;
            collectedCount++;
            if (c.customerType === 'B2B') colSegCash.b2b += c.billingAmount;
            else colSegCash.b2c += c.billingAmount;
          } else if (st === 'OVERDUE') {
            overdueCash += c.billingAmount;
            overdueCount++;
            if (c.customerType === 'B2B') overdueSegCash.b2b += c.billingAmount;
            else overdueSegCash.b2c += c.billingAmount;
          } else {
            pendingCash += c.billingAmount;
            pendingCount++;
            if (c.customerType === 'B2B') penSegCash.b2b += c.billingAmount;
            else penSegCash.b2c += c.billingAmount;
          }
        } else {
          var isActive = (c.startDate <= activeCutoff);
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
        var isActive = (c.startDate <= activeCutoff);
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
        targetDay: targetDay,
        collectedCash: collectedCash,
        collectedCount: collectedCount,
        pendingCash: pendingCash,
        pendingCount: pendingCount,
        overdueCash: overdueCash,
        overdueCount: overdueCount,
        prepaidCount: prepaidCount,
        colSegCash: colSegCash,
        penSegCash: penSegCash,
        overdueSegCash: overdueSegCash,
        totalExpectedCash: collectedCash + pendingCash + overdueCash
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
        if (!val) return isUsd ? '$0' : '¥0';
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
      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';

      if (periodStr === 'TODAY' || (rt && periodStr === rt.todayStr)) {
        window.setDemoCheckpoint('NOW_REAL');
        return;
      }
      if (periodStr === 'CURRENT_MONTH') {
        window.setDemoCheckpoint('SOON_END_OF_MONTH');
        return;
      }
      if (periodStr === 'NEXT_MONTH') {
        window.setDemoCheckpoint('FUTURE_NEXT_MONTH');
        return;
      }
      if (periodStr === '2026-09-29') {
        window.setDemoCheckpoint('PAST_2026-09-29');
        return;
      }
      if (periodStr === '2026-09-30') {
        window.setDemoCheckpoint('PAST_2026-09-30');
        return;
      }
      if (periodStr === '2026-08') {
        window.setDemoCheckpoint('PAST_LAST_MONTH');
        return;
      }
      if (periodStr === '2026-11') {
        window.setDemoCheckpoint('FUTURE_NEXT_MONTH');
        return;
      }
      if (periodStr === '2026-12') {
        window.setDemoCheckpoint('FUTURE_2026-12');
        return;
      }

      window.currentPeriod = periodStr;
      window.currentDemoDay = 'ALL';
      var sel = document.getElementById('vb-period-select');
      if (sel) sel.value = periodStr;

      var foundIdx = -1;
      for (var i = 0; i < window.REVENUE_DATA_2026.length; i++) {
        if (window.REVENUE_DATA_2026[i].period === periodStr) {
          foundIdx = i;
          break;
        }
      }
      if (foundIdx !== -1) {
        window.selectedMonthIdx = foundIdx;
      }

      applyDashboardMetrics();
      renderInteractiveRevenueChart();
      if (typeof window.renderNewSignupsSection === 'function') window.renderNewSignupsSection();
      if (typeof window.renderDashMainContractsTable === 'function') window.renderDashMainContractsTable();
    };

    function applyDashboardMetrics() {
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      var seg = window.currentSegment || 'ALL';
      var period = window.currentPeriod || '2026-09';

      var metrics = window.getDynamicPeriodMetrics(period, seg);

      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
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

      var cCashTitle = document.getElementById('lbl-cash-title');
      var cCash = document.getElementById('val-cash-in');
      var subCash = document.getElementById('sub-cash');
      var cashB2b = document.getElementById('lbl-cash-b2b');
      var cashB2c = document.getElementById('lbl-cash-b2c');

      var cPendingTitle = document.getElementById('lbl-pending-title');
      var cPending = document.getElementById('val-cash-pending');
      var subPending = document.getElementById('sub-cash-pending');
      var penB2b = document.getElementById('lbl-pending-b2b');
      var penB2c = document.getElementById('lbl-pending-b2c');

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
      var periodYear = period.indexOf('-') !== -1 ? period.split('-')[0] : '2026';
      var periodMonth = period.indexOf('-') !== -1 ? period.split('-')[1] : '10';
      var isFutureYear = parseInt(periodYear, 10) > 2026;
      var periodMonthNum = isDayMode ? 9 : parseInt(periodMonth, 10);
      var monthText = isDayMode
        ? 'Ngày 24/09/2026'
        : ('Tháng ' + (periodMonthNum < 10 ? '0' : '') + periodMonthNum + (isFutureYear ? '/' + periodYear : ''));

      if (seg === 'B2B') {
        if (topTitle) topTitle.textContent = 'Bàn Điều Hành Doanh Nghiệp (B2B)';
        if (topDesc) topDesc.textContent = 'Khối Doanh nghiệp (B2B) • ' + metrics.totalManaged + ' Hợp đồng (' + metrics.activeCount + ' Active) • ' + monthText;
        if (cCustTitle) cCustTitle.textContent = 'HỢP ĐỒNG DOANH NGHIỆP';
        if (subCust) subCust.textContent = metrics.activeCount + ' HĐ đang active';
        if (cCashTitle) cCashTitle.textContent = isDayMode ? 'ĐÃ THU NGÀY 24/09 (B2B)' : (isFutureYear ? 'DỰ KIẾN THU (B2B)' : 'ĐÃ THANH TOÁN (B2B)');
        if (cPendingTitle) cPendingTitle.textContent = isFutureYear ? 'CHỜ NẠP KẾ HOẠCH (B2B)' : 'CHỜ THANH TOÁN (B2B)';
        if (cDefTitle) cDefTitle.textContent = 'NỢ QUÁ HẠN (B2B)';
      } else if (seg === 'B2C') {
        if (topTitle) topTitle.textContent = 'Bàn Điều Hành Khối Cá Nhân (B2C)';
        if (topDesc) topDesc.textContent = 'Khối Cá nhân (B2C) • ' + metrics.totalManaged + ' Hợp đồng (' + metrics.activeCount + ' Active) • ' + monthText;
        if (cCustTitle) cCustTitle.textContent = 'HỢP ĐỒNG CÁ NHÂN';
        if (subCust) subCust.textContent = metrics.activeCount + ' HĐ đang active';
        if (cCashTitle) cCashTitle.textContent = isDayMode ? 'ĐÃ THU NGÀY 24/09 (B2C)' : (isFutureYear ? 'DỰ KIẾN THU (B2C)' : 'ĐÃ THANH TOÁN (B2C)');
        if (cPendingTitle) cPendingTitle.textContent = isFutureYear ? 'CHỜ NẠP KẾ HOẠCH (B2C)' : 'CHỜ THANH TOÁN (B2C)';
        if (cDefTitle) cDefTitle.textContent = 'NỢ QUÁ HẠN (B2C)';
      } else {
        if (topTitle) topTitle.textContent = 'Bàn Điều Hành Toàn Nền Tảng';
        if (topDesc) topDesc.textContent = 'Hệ sinh thái Doanh nghiệp & Cá nhân • ' + metrics.totalManaged + ' Hợp đồng (' + metrics.activeCount + ' Active) • ' + monthText;
        if (cCustTitle) cCustTitle.textContent = 'TỔNG HỢP ĐỒNG';
        if (subCust) subCust.textContent = metrics.activeCount + ' HĐ đang active';
        if (cCashTitle) cCashTitle.textContent = isDayMode ? 'ĐÃ THU NGÀY 24/09/2026' : (isFutureYear ? 'DỰ KIẾN THU ' + periodYear : 'ĐÃ THANH TOÁN');
        if (cPendingTitle) cPendingTitle.textContent = isFutureYear ? 'CHỜ NẠP KẾ HOẠCH' : 'CHỜ THANH TOÁN';
        if (cDefTitle) cDefTitle.textContent = 'NỢ QUÁ HẠN';
      }

      // Cập nhật nhãn thời gian trực tiếp bên trong từng thẻ KPI
      var elLblCustPeriod = document.getElementById('lbl-cust-period');
      var elLblCashPeriod = document.getElementById('lbl-cash-period');
      var elLblPendingPeriod = document.getElementById('lbl-pending-period');
      var elLblDefPeriod = document.getElementById('lbl-def-period');

      var rtCtx = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curDateDisplay = (rtCtx && rtCtx.dd && rtCtx.mm) ? (rtCtx.dd + '/' + rtCtx.mm) : '02/10';

      var formattedPeriodLabel = '';
      var formattedDateRange = '';
      var shortPeriodLabel = '';

      if (isDayMode) {
        formattedPeriodLabel = 'Ngày 24/09/2026';
        formattedDateRange = '00:00 — 23:59 (24/09)';
        shortPeriodLabel = 'Ngày 24/09';
      } else {
        var daysInMonth = new Date(parseInt(periodYear, 10), parseInt(periodMonth, 10), 0).getDate();
        formattedPeriodLabel = 'Tháng ' + periodMonth + '/' + periodYear;
        formattedDateRange = '01/' + periodMonth + ' — ' + daysInMonth + '/' + periodMonth;
        shortPeriodLabel = 'Kỳ T' + parseInt(periodMonth, 10) + '/' + periodYear;
      }

      if (elLblCustPeriod) {
        if (isFutureYear) {
          elLblCustPeriod.innerHTML = '<span class="kpi-dot"></span>Toàn hệ thống • Kế hoạch ' + periodYear;
        } else {
          elLblCustPeriod.innerHTML = '<span class="kpi-dot"></span>Toàn hệ thống • Đến ' + curDateDisplay;
        }
      }
      if (elLblCashPeriod) {
        if (isDayMode) {
          elLblCashPeriod.innerHTML = '<span class="kpi-dot"></span>Ngày 24/09/2026 (Chốt ngày)';
        } else if (isFutureYear) {
          elLblCashPeriod.innerHTML = '<span class="kpi-dot"></span>' + shortPeriodLabel + ' (Dự thu: ' + formattedDateRange + ')';
        } else {
          elLblCashPeriod.innerHTML = '<span class="kpi-dot"></span>' + shortPeriodLabel + ' (' + formattedDateRange + ')';
        }
      }
      if (elLblPendingPeriod) {
        if (isDayMode) {
          elLblPendingPeriod.innerHTML = '<span class="kpi-dot"></span>Ngày 24/09/2026';
        } else if (isFutureYear) {
          elLblPendingPeriod.innerHTML = '<span class="kpi-dot"></span>' + shortPeriodLabel + ' (Chờ thu: ' + formattedDateRange + ')';
        } else {
          elLblPendingPeriod.innerHTML = '<span class="kpi-dot"></span>' + shortPeriodLabel + ' (' + formattedDateRange + ')';
        }
      }
      if (elLblDefPeriod) {
        if (isFutureYear) {
          elLblDefPeriod.innerHTML = '<span class="kpi-dot"></span>Kế hoạch an toàn ' + periodYear;
        } else {
          elLblDefPeriod.innerHTML = '<span class="kpi-dot"></span>Lũy kế ≤12 thg (Đến ' + curDateDisplay + ')';
        }
      }

      // Calculate totals for financial consistency
      var colAmt = metrics.collectedCash;
      var penAmt = metrics.pendingCash;
      var colCnt = metrics.collectedCount;
      var penCnt = metrics.pendingCount;
      var totalExp = colAmt + penAmt;
      var colPct = totalExp > 0 ? Math.round((colAmt / totalExp) * 100) : 100;
      var penPct = totalExp > 0 ? (100 - colPct) : 0;

      // Card 1: Khách hàng / Tổng hợp đồng
      if (cCust) cCust.textContent = metrics.totalManaged;
      var progCust = document.getElementById('prog-cust-active');
      if (progCust) {
        var activePct = metrics.totalManaged > 0 ? Math.round((metrics.activeCount / metrics.totalManaged) * 100) : 100;
        progCust.style.width = activePct + '%';
      }
      var elTotalExp = document.getElementById('val-total-expected');
      if (elTotalExp) elTotalExp.textContent = fmt(totalExp);
      if (custB2b) custB2b.textContent = '🏢 ' + metrics.segManaged.b2b + ' DN (' + metrics.segCustomers.b2b + ' Active)';
      if (custB2c) custB2c.textContent = '👤 ' + metrics.segManaged.b2c + ' Cá nhân (' + metrics.segCustomers.b2c + ' Active)';

      // Card 3: Tiền mặt ĐÃ THANH TOÁN (Thực thu)
      if (cCash) cCash.textContent = fmt(colAmt);
      var progCash = document.getElementById('prog-cash-in');
      if (progCash) progCash.style.width = Math.min(100, Math.max(0, colPct)) + '%';
      if (subCash) {
        if (isFutureYear) {
          subCash.innerHTML = '<strong>' + metrics.payingCount + ' HĐ kế hoạch</strong> (Dự kiến: ' + fmt(metrics.totalCashIn) + ') ➔';
        } else {
          subCash.innerHTML = '<strong>' + colCnt + ' HĐ đã thanh toán</strong> (' + colPct + '% kế hoạch) ➔';
        }
      }
      if (cashB2b) cashB2b.textContent = '🏢 DN: ' + fmt(metrics.colSegCash ? metrics.colSegCash.b2b : colAmt);
      if (cashB2c) cashB2c.textContent = '👤 Cá nhân: ' + fmt(metrics.colSegCash ? metrics.colSegCash.b2c : 0);

      // Card 4: Tiền mặt CHỜ THANH TOÁN
      if (cPending) cPending.textContent = fmt(penAmt);
      var progPending = document.getElementById('prog-cash-pending');
      if (progPending) progPending.style.width = Math.min(100, Math.max(0, penPct)) + '%';
      if (subPending) {
        if (penCnt === 0) {
          subPending.innerHTML = '<span style="color:#16a34a;font-weight:700">✓ Đã thu hoàn tất 100% KPI</span>';
        } else if (isFutureYear) {
          subPending.innerHTML = '<strong>' + penCnt + ' HĐ chờ thanh toán</strong> (100% kế hoạch ' + periodYear + ') ➔';
        } else {
          subPending.innerHTML = '<strong>' + penCnt + ' HĐ chờ thanh toán</strong> (' + penPct + '%) • Bấm mở bảng ➔';
        }
      }
      if (penB2b) penB2b.textContent = '🏢 DN: ' + fmt(metrics.penSegCash ? metrics.penSegCash.b2b : penAmt);
      if (penB2c) penB2c.textContent = '👤 Cá nhân: ' + fmt(metrics.penSegCash ? metrics.penSegCash.b2c : 0);

      // Card 5: Tiền mặt NỢ QUÁ HẠN
      var overAmt = metrics.overdueCash || 0;
      var overCnt = metrics.overdueCount || 0;
      if (cDefVal) {
        cDefVal.textContent = fmt(overAmt);
        cDefVal.style.color = overAmt > 0 ? '#dc2626' : '#16a34a';
      }
      var progDef = document.getElementById('prog-deferred');
      var progDefWrap = document.getElementById('prog-def-wrap');
      if (progDefWrap) {
        progDefWrap.style.display = overCnt > 0 ? 'block' : 'none';
        if (progDef && totalExp > 0) {
          var overPct = Math.min(100, Math.round((overAmt / totalExp) * 100));
          progDef.style.width = Math.max(5, overPct) + '%';
        }
      }
      if (subDef) {
        if (isFutureYear) {
          subDef.style.color = '#16a34a';
          subDef.innerHTML = '✓ 0 HĐ nợ quá hạn (Kế hoạch ' + periodYear + ' an toàn)';
        } else if (overCnt === 0) {
          subDef.style.color = '#16a34a';
          subDef.innerHTML = '✓ 0 HĐ nợ quá hạn (Trong hạn an toàn ≤12 thg)';
        } else {
          subDef.style.color = '#dc2626';
          subDef.innerHTML = '<strong>⚠️ ' + overCnt + ' HĐ nợ quá hạn</strong> • Giới hạn ≤12 thg ➔';
        }
      }
      var b2bOver = metrics.overdueSegCash ? metrics.overdueSegCash.b2b : 0;
      var b2cOver = metrics.overdueSegCash ? metrics.overdueSegCash.b2c : 0;
      if (defB2b) {
        defB2b.textContent = '🏢 DN: ' + fmt(b2bOver) + (b2bOver === 0 ? ' (Khớp)' : '');
        defB2b.style.color = b2bOver > 0 ? '#dc2626' : '#64748b';
      }
      if (defB2c) {
        defB2c.textContent = '👤 Cá nhân: ' + fmt(b2cOver) + (b2cOver === 0 ? ' (Khớp)' : '');
        defB2c.style.color = b2cOver > 0 ? '#dc2626' : '#64748b';
      }

      // Update Topbar Timeline Active States
      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';
      var curRealDay = rt ? String(rt.day) : '1';

      var isTodayActive = (period === curRealMonth && (window.currentDemoDay === curRealDay || window.currentDemoCheckpoint === 'NOW_REAL'));
      var isCurMonthActive = (period === curRealMonth && !isTodayActive);
      var isNextMonthActive = rt ? (period === rt.nextMonthStr) : (period === '2026-11');

      var btnToday = document.getElementById('tl-btn-today');
      var btnCurMonth = document.getElementById('tl-btn-cur-month');
      var btnNextMonth = document.getElementById('tl-btn-next-month');
      if (btnToday) btnToday.classList.toggle('active', isTodayActive);
      if (btnCurMonth) btnCurMonth.classList.toggle('active', isCurMonthActive);
      if (btnNextMonth) btnNextMonth.classList.toggle('active', isNextMonthActive);

      // Update 3-Timeline Matrix Cards Highlight
      var colToday = document.getElementById('tm-col-today');
      var colT9 = document.getElementById('tm-col-t9');
      var colT10 = document.getElementById('tm-col-t10');

      var activeColBorder = 'border:2px solid #089490;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.15s;background:#f0fdfa;position:relative;box-shadow:0 4px 12px rgba(8,148,144,0.1)';
      var inactiveColBorder = 'border:2px solid #e2e8f0;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.15s;background:#ffffff;position:relative';

      if (colToday) colToday.style.cssText = isTodayActive ? activeColBorder : inactiveColBorder;
      if (colT9) colT9.style.cssText = (period === '2026-09') ? activeColBorder : inactiveColBorder;
      if (colT10) colT10.style.cssText = (period === '2026-10' && !isTodayActive) ? activeColBorder : inactiveColBorder;

      // Update Executive Insight Banner
      var eibBanner = document.getElementById('executive-insight-banner');
      var eibIcon = document.getElementById('eib-icon');
      var eibTitle = document.getElementById('eib-title');
      var eibDesc = document.getElementById('eib-desc');
      var eibBtn = document.getElementById('eib-action-btn');

      if (eibBanner && eibTitle && eibDesc) {
        if (isTodayActive || window.currentDemoCheckpoint === 'NOW_REAL') {
          eibBanner.style.background = '#f0fdfa';
          eibBanner.style.borderColor = '#99f6e4';
          if (eibIcon) { eibIcon.textContent = '🔴'; eibIcon.style.background = '#ccfbf1'; eibIcon.style.color = '#0f766e'; }
          eibTitle.innerHTML = 'Tình Trạng Thời Gian Thực (Hôm nay ngày ' + (rt ? rt.dd + '/' + rt.mm + '/' + rt.year : '02/10/2026') + ' — Dữ Liệu Trực Tiếp)';
          var overText = overCnt > 0 ? (' Đang theo dõi <strong>' + overCnt + ' HĐ nợ quá hạn (' + fmt(overAmt) + ')</strong> cần đôn đốc.') : ' Không có công nợ quá hạn.';
          eibDesc.innerHTML = 'Hệ thống đồng bộ dữ liệu thời gian thực: Đến ngày <strong>' + (rt ? rt.dd + '/' + rt.mm : '02/10') + '</strong>, đã thu tiền mặt đạt <strong>' + fmt(colAmt) + '</strong> (' + colCnt + ' HĐ đã vào két, ' + colPct + '% kế hoạch).' + overText + ' Còn <strong>' + penCnt + ' hợp đồng</strong> (tổng ' + fmt(penAmt) + ') tiếp tục thu trong các ngày tới.';
          if (eibBtn) {
            eibBtn.textContent = '📅 Xem Bảng Đối Soát ➔';
            eibBtn.style.background = '#089490';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else if (window.currentDemoCheckpoint === 'SOON_TOMORROW') {
          eibBanner.style.background = '#eff6ff';
          eibBanner.style.borderColor = '#bfdbfe';
          if (eibIcon) { eibIcon.textContent = '⏳'; eibIcon.style.background = '#dbeafe'; eibIcon.style.color = '#1d4ed8'; }
          eibTitle.innerHTML = 'Kế Hoạch Ngày Mai (Ngày ' + (rt ? rt.tmrDD + '/' + rt.tmrMM + '/' + rt.tmrY : '03/10/2026') + ')';
          var overTextTmr = overCnt > 0 ? (' Công nợ quá hạn đang kiểm soát: <strong>' + fmt(overAmt) + '</strong> (' + overCnt + ' HĐ).') : '';
          eibDesc.innerHTML = 'Lũy kế dòng tiền dự kiến đạt <strong>' + fmt(colAmt) + '</strong> (' + colCnt + ' HĐ nạp tiền).' + overTextTmr + ' Toàn bộ hợp đồng đến hạn được giám sát tự động để đảm bảo tiến độ thu ngân.';
          if (eibBtn) {
            eibBtn.textContent = '📋 Xem Lịch Thu Ngày Mai ➔';
            eibBtn.style.background = '#1d4ed8';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else if (window.currentDemoCheckpoint === 'SOON_IN_3_DAYS') {
          eibBanner.style.background = '#eff6ff';
          eibBanner.style.borderColor = '#bfdbfe';
          if (eibIcon) { eibIcon.textContent = '⏱️'; eibIcon.style.background = '#dbeafe'; eibIcon.style.color = '#1d4ed8'; }
          eibTitle.innerHTML = 'Tiến Độ 3 Ngày Nữa (Ngày ' + (rt ? rt.in3dDD + '/' + rt.in3dMM + '/' + rt.year : '04/10/2026') + ')';
          var overText3d = overCnt > 0 ? (' Còn <strong>' + overCnt + ' HĐ chậm nạp (' + fmt(overAmt) + ')</strong> đang xử lý.') : ' Toàn bộ công nợ được thu hồi thành công.';
          eibDesc.innerHTML = 'Dự kiến lũy kế thực thu đạt <strong>' + fmt(colAmt) + '</strong> (' + colCnt + ' HĐ).' + overText3d + ' Các hợp đồng tiếp theo đang ở trạng thái chuẩn bị đối soát kỳ nạp.';
          if (eibBtn) {
            eibBtn.textContent = '📋 Xem Bảng Thu Chi ➔';
            eibBtn.style.background = '#1d4ed8';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else if (window.currentDemoCheckpoint === 'SOON_END_OF_MONTH' || (period === curRealMonth && window.currentDemoDay === 'ALL') || window.currentDemoCheckpoint === 'SOON_2026-09-30') {
          eibBanner.style.background = '#ecfdf5';
          eibBanner.style.borderColor = '#a7f3d0';
          if (eibIcon) { eibIcon.textContent = '🏁'; eibIcon.style.background = '#d1fae5'; eibIcon.style.color = '#059669'; }
          eibTitle.innerHTML = 'Chốt Sổ Kỳ ' + monthText + ' (Đạt 100% KPI Doanh Thu)';
          eibDesc.innerHTML = 'Kỳ ' + monthText + ' hoàn tất thu toàn bộ <strong>' + metrics.payingCount + '/' + metrics.payingCount + ' hợp đồng</strong>, tổng thực thu đạt <strong>' + fmt(metrics.totalCashIn) + '</strong> (100% kế hoạch). Toàn bộ tiền mặt đã vào két an toàn, đối soát ngân hàng khớp 100%.';
          if (eibBtn) {
            eibBtn.textContent = '📋 Sổ Quỹ Chốt Tháng ➔';
            eibBtn.style.background = '#059669';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else if (period === '2026-09' && window.currentDemoCheckpoint === 'PAST_2026-09-29') {
          eibBanner.style.background = '#f0fdfa';
          eibBanner.style.borderColor = '#99f6e4';
          if (eibIcon) { eibIcon.textContent = '📜'; eibIcon.style.background = '#ccfbf1'; eibIcon.style.color = '#0f766e'; }
          eibTitle.innerHTML = 'Hồ Sơ Mẫu Ngày 29/09/2026 (Đã thu 22/24 HĐ • Chờ 2 HĐ cuối tháng)';
          eibDesc.innerHTML = 'Đã thu tiền mặt đạt <strong>¥248,500</strong> (22 HĐ đã vào két). Còn <strong>2 hợp đồng chờ thu</strong> (Hải Dương Auto ¥18k và Kỹ sư Trọng ¥3.3k) khớp lệnh vào 30/09.';
          if (eibBtn) {
            eibBtn.textContent = '📅 Xem Bảng Đối Soát ➔';
            eibBtn.style.background = '#089490';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else if (period < curRealMonth) {
          eibBanner.style.background = '#f8fafc';
          eibBanner.style.borderColor = '#cbd5e1';
          if (eibIcon) { eibIcon.textContent = '⏮️'; eibIcon.style.background = '#e2e8f0'; eibIcon.style.color = '#334155'; }
          eibTitle.innerHTML = 'Hồ Sơ Quá Khứ (Kỳ ' + monthText + ' — Đã Chốt Sổ & Đối Soát 100%)';
          eibDesc.innerHTML = 'Kỳ ' + monthText + ' đã chốt sổ thành công: Thu 100% đúng hạn <strong>' + metrics.payingCount + '/' + metrics.payingCount + ' hợp đồng</strong> với tổng tiền <strong>' + fmt(metrics.totalCashIn) + '</strong>. Không tồn đọng công nợ.';
          if (eibBtn) {
            eibBtn.textContent = '📊 Xem Lịch Sử Đối Soát ➔';
            eibBtn.style.background = '#334155';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else if (isFutureYear) {
          eibBanner.style.background = '#f5f3ff';
          eibBanner.style.borderColor = '#ddd6fe';
          if (eibIcon) { eibIcon.textContent = '🌟'; eibIcon.style.background = '#ede9fe'; eibIcon.style.color = '#6d28d9'; }
          eibTitle.innerHTML = '🌟 Kế Hoạch & Dự Báo Doanh Thu Năm ' + periodYear + ' (' + monthText + ')';
          eibDesc.innerHTML = 'Dự báo dòng tiền nạp ngân sách năm ' + periodYear + ': Dự kiến đạt <strong>' + fmt(metrics.totalCashIn) + '</strong> từ <strong>' + metrics.payingCount + ' hợp đồng</strong> định kỳ & tái nạp gia hạn • Quy mô phục vụ: <strong>' + metrics.totalSeats + ' ghế</strong>.';
          if (eibBtn) {
            eibBtn.textContent = '📋 Xem Dự Báo Hợp Đồng ➔';
            eibBtn.style.background = '#6d28d9';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
          }
        } else {
          eibBanner.style.background = '#faf5ff';
          eibBanner.style.borderColor = '#e9d5ff';
          if (eibIcon) { eibIcon.textContent = '🔮'; eibIcon.style.background = '#f3e8ff'; eibIcon.style.color = '#7e22ce'; }
          eibTitle.innerHTML = 'Kế Hoạch & Dự Báo Kỳ ' + monthText;
          eibDesc.innerHTML = 'Kế hoạch thu tiền mặt dự phóng <strong>' + fmt(metrics.totalCashIn) + '</strong> từ ' + metrics.payingCount + ' hợp đồng đến hạn • Ghế triển khai: <strong>' + metrics.totalSeats + '/' + metrics.totalCapacity + '</strong>.';
          if (eibBtn) {
            eibBtn.textContent = '📋 Xem Kế Hoạch ➔';
            eibBtn.style.background = '#7e22ce';
            eibBtn.onclick = function () { window.openReconciliationModal('ALL'); };
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

      // Cập nhật khối tài khoản mới & bảng kê đối soát hợp đồng trên Dashboard
      if (typeof window.renderNewSignupsSection === 'function') {
        window.renderNewSignupsSection(period, seg);
      }
      if (typeof window.renderDashMainContractsTable === 'function') {
        window.renderDashMainContractsTable(period, seg);
      }
    }
    window.applyDashboardMetrics = applyDashboardMetrics;

    // ===== HÀM ĐIỀU HÀNH MỐC NGÀY DEMO (QUÁ KHỨ - BÂY GIỜ - VÀI NGÀY NỮA - THÁNG SAU) =====
    window.currentDemoCheckpoint = 'NOW_REAL';
    window.currentDemoDay = '1';

    window.setDemoCheckpoint = function (checkpointKey) {
      window.currentDemoCheckpoint = checkpointKey;
      var sel = document.getElementById('vb-demo-day-select');
      if (sel) sel.value = checkpointKey;

      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';
      var curRealDay = rt ? String(rt.day) : '1';

      var targetPeriod = curRealMonth;
      var targetDay = curRealDay;
      var toastLabel = '';

      if (checkpointKey === 'NOW_REAL' || checkpointKey.startsWith('NOW_')) {
        targetPeriod = curRealMonth;
        targetDay = curRealDay;
        toastLabel = 'Hôm nay: Ngày ' + (rt ? rt.dd + '/' + rt.mm + '/' + rt.year : '01/10/2026') + ' (Thời gian thực)';
      } else if (checkpointKey === 'SOON_TOMORROW') {
        targetPeriod = rt ? rt.tomorrowStr.slice(0, 7) : curRealMonth;
        targetDay = rt ? String(rt.tmrDD) : '2';
        toastLabel = 'Ngày mai: Ngày ' + (rt ? rt.tmrDD + '/' + rt.tmrMM + '/' + rt.tmrY : '02/10/2026');
      } else if (checkpointKey === 'SOON_IN_3_DAYS') {
        targetPeriod = rt ? rt.in3dStr.slice(0, 7) : curRealMonth;
        targetDay = rt ? String(rt.in3dDD) : '4';
        toastLabel = '3 ngày nữa: Ngày ' + (rt ? rt.in3dDD + '/' + rt.in3dMM + '/' + rt.year : '04/10/2026');
      } else if (checkpointKey === 'SOON_END_OF_MONTH') {
        targetPeriod = curRealMonth;
        targetDay = rt ? String(rt.lastDayOfCurMonth) : '31';
        toastLabel = 'Cuối tháng này: Ngày ' + (rt ? rt.lastDayOfCurMonth + '/' + rt.mm + '/' + rt.year : '31/10/2026') + ' (Chốt 100% KPI)';
      } else if (checkpointKey === 'FUTURE_NEXT_MONTH') {
        targetPeriod = rt ? rt.nextMonthStr : '2026-11';
        targetDay = 'ALL';
        toastLabel = 'Tháng sau: Tháng ' + (rt ? rt.nextMMM + '/' + rt.nextMY : '11/2026');
      } else if (checkpointKey === 'FUTURE_NEXT_2_MONTHS') {
        targetPeriod = rt ? rt.next2MonthStr : '2026-12';
        targetDay = 'ALL';
        toastLabel = '2 tháng nữa: Tháng ' + (rt ? rt.next2MMM + '/' + rt.next2MY : '12/2026');
      } else if (checkpointKey === 'FUTURE_2026-12') {
        targetPeriod = '2026-12';
        targetDay = 'ALL';
        toastLabel = 'Chốt năm: Tháng 12/2026 (Đại hội gia hạn FDI ¥1.37M)';
      } else if (checkpointKey === 'FUTURE_2027-01') {
        targetPeriod = '2027-01';
        targetDay = 'ALL';
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng 01/2027 (Gia hạn năm Q1 & Tái nạp Quý)';
      } else if (checkpointKey === 'FUTURE_2027-03') {
        targetPeriod = '2027-03';
        targetDay = 'ALL';
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng 03/2027 (Kỳ nạp Quý 1 & HĐ năm)';
      } else if (checkpointKey === 'FUTURE_2027-06') {
        targetPeriod = '2027-06';
        targetDay = 'ALL';
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng 06/2027 (Chốt bán niên H1/2027)';
      } else if (checkpointKey === 'FUTURE_2027-09') {
        targetPeriod = '2027-09';
        targetDay = 'ALL';
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng 09/2027 (Kỳ nạp Quý 3/2027)';
      } else if (checkpointKey === 'FUTURE_2027-10') {
        targetPeriod = '2027-10';
        targetDay = 'ALL';
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng 10/2027 (Kỳ nạp Quý 4/2027)';
      } else if (checkpointKey === 'FUTURE_2027-12') {
        targetPeriod = '2027-12';
        targetDay = 'ALL';
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng 12/2027 (Chốt năm tài chính 2027)';
      } else if (checkpointKey.startsWith('FUTURE_2027-')) {
        targetPeriod = checkpointKey.replace('FUTURE_', '');
        targetDay = 'ALL';
        var mNum = targetPeriod.split('-')[1];
        toastLabel = 'Dự báo Kế hoạch 2027: Tháng ' + mNum + '/2027';
      } else if (checkpointKey === 'PAST_YESTERDAY') {
        targetPeriod = rt ? rt.yesterdayStr.slice(0, 7) : '2026-09';
        targetDay = rt ? String(rt.ystDD) : '30';
        toastLabel = 'Hôm qua: Ngày ' + (rt ? rt.ystDD + '/' + rt.ystMM + '/' + rt.ystY : '30/09/2026');
      } else if (checkpointKey === 'PAST_LAST_WEEK') {
        targetPeriod = rt ? rt.lastWeekStr.slice(0, 7) : '2026-09';
        targetDay = rt ? String(rt.lastWDD) : '24';
        toastLabel = 'Tuần trước: Ngày ' + (rt ? rt.lastWDD + '/' + rt.lastWMM + '/' + rt.year : '24/09/2026');
      } else if (checkpointKey === 'PAST_LAST_MONTH') {
        targetPeriod = rt ? rt.prevMonthStr : '2026-09';
        targetDay = 'ALL';
        toastLabel = 'Tháng trước: Tháng ' + (rt ? rt.prevMMM + '/' + rt.prevMY : '09/2026') + ' (Đã chốt sổ đối soát)';
      } else if (checkpointKey === 'PAST_2026-09-29' || checkpointKey === 'NOW_2026-09-29') {
        targetPeriod = '2026-09';
        targetDay = '29';
        toastLabel = 'Mẫu Ngày 29/09: Thu 22/24 HĐ (¥248.5k)';
      } else if (checkpointKey === 'PAST_2026-09-30' || checkpointKey === 'SOON_2026-09-30') {
        targetPeriod = '2026-09';
        targetDay = '30';
        toastLabel = 'Mẫu Chốt Tháng 9: Thu 24/24 HĐ (¥269.8k)';
      } else if (checkpointKey === 'PAST_2026-08') {
        targetPeriod = '2026-08';
        targetDay = 'ALL';
        toastLabel = 'Tháng 08/2026 (Đã chốt & đối soát 100%)';
      } else if (checkpointKey.startsWith('FUTURE_')) {
        targetPeriod = checkpointKey.replace('FUTURE_', '');
        targetDay = 'ALL';
        toastLabel = 'Kế hoạch: ' + targetPeriod;
      } else if (checkpointKey.startsWith('PAST_')) {
        targetPeriod = checkpointKey.replace('PAST_', '');
        targetDay = 'ALL';
        toastLabel = 'Quá khứ: ' + targetPeriod;
      } else {
        targetPeriod = curRealMonth;
        targetDay = checkpointKey;
        toastLabel = 'Mốc Ngày ' + checkpointKey;
      }

      window.currentPeriod = targetPeriod;
      window.currentDemoDay = targetDay;

      // Đồng bộ select tháng
      var periodSelect = document.getElementById('vb-period-select');
      if (periodSelect) periodSelect.value = targetPeriod;

      // Đồng bộ chỉ số tháng được chọn trên biểu đồ 12 tháng
      if (window.REVENUE_DATA_2026) {
        var foundBar = false;
        for (var i = 0; i < window.REVENUE_DATA_2026.length; i++) {
          if (window.REVENUE_DATA_2026[i].period === targetPeriod) {
            window.selectedMonthIdx = i;
            foundBar = true;
            break;
          }
        }
        if (!foundBar) {
          window.selectedMonthIdx = -1;
        }
      }

      // Xóa can thiệp thủ công của kỳ để hiển thị số liệu chuẩn theo mốc
      if (window.CONTRACT_MANUAL_STATUS) {
        Object.keys(window.CONTRACT_MANUAL_STATUS).forEach(function (k) {
          if (k.indexOf('_' + targetPeriod) !== -1) {
            delete window.CONTRACT_MANUAL_STATUS[k];
          }
        });
      }

      if (typeof window.showAdminToast === 'function') {
        window.showAdminToast('🎯 Đã kích hoạt mốc: ' + toastLabel, 'success');
      }

      if (typeof applyDashboardMetrics === 'function') applyDashboardMetrics();
      if (typeof renderInteractiveRevenueChart === 'function') renderInteractiveRevenueChart();
      if (typeof window.renderNewSignupsSection === 'function') window.renderNewSignupsSection();
      if (typeof window.renderDashMainContractsTable === 'function') window.renderDashMainContractsTable();
      if (typeof window.renderDailyCashflowDashboard === 'function') {
        window.renderDailyCashflowDashboard(window.currentPeriod, window.currentSegment);
      }
      if (typeof window.renderDummyContractsTable === 'function') window.renderDummyContractsTable();
    };

    // ===== MỤC 1: KHÁCH HÀNG ĐĂNG KÝ TÀI KHOẢN MỚI TRONG THÁNG (REDESIGNED ULTRA MODERN) =====
    window.newSignupsSearchQuery = '';
    window.newSignupsSegmentFilter = 'ALL';

    window.setNewSignupsSegment = function (seg) {
      window.newSignupsSegmentFilter = seg || 'ALL';
      ['all', 'b2b', 'b2c'].forEach(function (s) {
        var btn = document.getElementById('btn-new-seg-' + s);
        if (btn) {
          if (s === (seg || 'ALL').toLowerCase()) {
            btn.style.background = '#0f172a';
            btn.style.color = '#ffffff';
            btn.style.borderColor = '#0f172a';
          } else {
            btn.style.background = '#ffffff';
            btn.style.color = (s === 'b2b' ? '#0284c7' : (s === 'b2c' ? '#7e22ce' : '#334155'));
            btn.style.borderColor = '#cbd5e1';
          }
        }
      });
      window.renderNewSignupsSection();
    };

    window.filterNewSignupsTable = function (query) {
      window.newSignupsSearchQuery = (query || '').toLowerCase().trim();
      window.renderNewSignupsSection();
    };

    window.exportNewSignupsCSV = function () {
      var period = window.currentPeriod || '2026-10';
      var allContracts = window.DUMMY_CONTRACTS_DATA || [];
      var effectiveMonth = (period === '2026-09-24') ? '2026-09' : period;
      var newSignups = allContracts.filter(function (c) {
        return c.startDate && c.startDate.indexOf(effectiveMonth) === 0;
      });

      var isUsd = (window.currentCurrency === 'USD');
      var curr = isUsd ? 'USD' : 'JPY';
      var rate = isUsd ? (1 / 150.24) : 1;

      var csv = '\uFEFFMa_HD,Khach_Hang,Nguoi_Dai_Dien,Phan_Khuc,Ngay_Dang_Ky,Goi_Cuoc,Chu_Ky,So_Ghe,Doanh_Thu (' + curr + '),Trang_Thai\n';
      newSignups.forEach(function (c) {
        var amt = isUsd ? Math.round(c.billingAmount * rate) : c.billingAmount;
        csv += '"' + c.id + '","' + c.customerName.replace(/"/g, '""') + '","' + (c.contactPerson || '').replace(/"/g, '""') + '","' +
          c.customerType + '","' + c.startDate + '","' + c.planTier + '","' + c.billingCycle + '",' +
          c.seats + ',' + amt + ',"' + (c.status || 'Active') + '"\n';
      });

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Emind_Khach_Hang_Moi_' + effectiveMonth + '.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    window.renderNewSignupsSection = function (periodStr, segment) {
      var period = periodStr || window.currentPeriod || '2026-10';
      var seg = segment || window.currentSegment || 'ALL';
      var innerSeg = window.newSignupsSegmentFilter || 'ALL';
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;

      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var allContracts = window.DUMMY_CONTRACTS_DATA || [];
      var effectiveMonth = (period === '2026-09-24') ? '2026-09' : period;

      // Lọc các hợp đồng mới bắt đầu trong tháng này
      var newSignups = allContracts.filter(function (c) {
        var matchMonth = c.startDate && c.startDate.indexOf(effectiveMonth) === 0;
        if (!matchMonth) return false;
        if (seg !== 'ALL' && c.customerType !== seg) return false;
        return true;
      });

      var b2bContracts = newSignups.filter(function (c) { return c.customerType === 'B2B'; });
      var b2cContracts = newSignups.filter(function (c) { return c.customerType === 'B2C'; });

      var b2bSeats = b2bContracts.reduce(function (s, c) { return s + (c.seats || 0); }, 0);
      var b2cSeats = b2cContracts.reduce(function (s, c) { return s + (c.seats || 0); }, 0);
      var totalSeats = b2bSeats + b2cSeats;

      var b2bCash = b2bContracts.reduce(function (s, c) { return s + (c.billingAmount || 0); }, 0);
      var b2cCash = b2cContracts.reduce(function (s, c) { return s + (c.billingAmount || 0); }, 0);
      var totalCash = b2bCash + b2cCash;
      var avgSeats = newSignups.length > 0 ? (totalSeats / newSignups.length).toFixed(1) : '0';

      // Cập nhật Header Badge và các thẻ KPI thống kê phong cách hiện đại
      var elSummaryBadge = document.getElementById('new-signups-summary-badge');
      if (elSummaryBadge) {
        var mParts = effectiveMonth.split('-');
        var mText = 'Tháng ' + (mParts[1] || '10') + '/' + (mParts[0] || '2026');
        elSummaryBadge.textContent = mText + ': ' + newSignups.length + ' Tài khoản mới • ' + totalSeats + ' Ghế • ' + fmt(totalCash);
      }

      var elB2bCnt = document.getElementById('new-stat-b2b-cnt');
      var elB2bDetail = document.getElementById('new-stat-b2b-detail');
      if (elB2bCnt) elB2bCnt.textContent = b2bContracts.length + ' Doanh nghiệp';
      if (elB2bDetail) elB2bDetail.innerHTML = '<strong style="color:#0369a1">' + b2bSeats + ' ghế</strong> • ' + fmt(b2bCash) + ' thực thu';

      var elB2cCnt = document.getElementById('new-stat-b2c-cnt');
      var elB2cDetail = document.getElementById('new-stat-b2c-detail');
      if (elB2cCnt) elB2cCnt.textContent = b2cContracts.length + ' Chuyên gia';
      if (elB2cDetail) elB2cDetail.innerHTML = '<strong style="color:#7e22ce">' + b2cContracts.length + ' tài khoản</strong> • ' + fmt(b2cCash) + ' thực thu';

      var elSeatsCnt = document.getElementById('new-stat-seats-cnt');
      var elSeatsDetail = document.getElementById('new-stat-seats-detail');
      if (elSeatsCnt) elSeatsCnt.textContent = totalSeats + ' Ghế mới';
      if (elSeatsDetail) elSeatsDetail.innerHTML = 'Bình quân <strong style="color:#0f766e">' + avgSeats + ' ghế</strong>/khách hàng';

      var elRate = document.getElementById('new-stat-rate');
      var elRateDetail = document.getElementById('new-stat-rate-detail');
      if (elRate) elRate.textContent = '100% Cấp Phép';
      if (elRateDetail) elRateDetail.textContent = newSignups.length + '/' + newSignups.length + ' Hợp đồng sẵn sàng vận hành';

      var elCountBadge = document.getElementById('new-table-count-badge');
      if (elCountBadge) elCountBadge.textContent = newSignups.length + ' khách hàng';

      // Áp dụng bộ lọc phân khúc bảng con (nếu chọn) & tìm kiếm
      var q = window.newSignupsSearchQuery || '';
      var displayList = newSignups.filter(function (c) {
        if (innerSeg !== 'ALL' && c.customerType !== innerSeg) return false;
        if (!q) return true;
        var full = (c.id + ' ' + c.customerName + ' ' + (c.contactPerson || '') + ' ' + (c.planTier || '')).toLowerCase();
        return full.indexOf(q) !== -1;
      });

      var tbody = document.getElementById('new-signups-tbody');
      if (!tbody) return;

      if (displayList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:36px 20px;color:#94a3b8">' +
          '<div style="font-size:32px;margin-bottom:8px">🌱</div>' +
          '<div style="font-size:13.5px;font-weight:700;color:#475569">' + (newSignups.length === 0 ? 'Không có tài khoản đăng ký mới trong kỳ ' + effectiveMonth : 'Không tìm thấy tài khoản phù hợp với từ khóa "' + q + '"') + '</div>' +
          '<div style="font-size:12px;color:#94a3b8;margin-top:2px">Các khách hàng kích hoạt kỳ này sẽ tự động xuất hiện tại đây</div>' +
          '</td></tr>';
        return;
      }

      var avatarPalette = [
        { bg: '#e0f2fe', text: '#0284c7' },
        { bg: '#f3e8ff', text: '#7e22ce' },
        { bg: '#fef3c7', text: '#b45309' },
        { bg: '#dcfce7', text: '#15803d' },
        { bg: '#fee2e2', text: '#dc2626' },
        { bg: '#ccfbf1', text: '#0f766e' }
      ];

      var html = '';
      displayList.forEach(function (c) {
        var isB2b = (c.customerType === 'B2B');
        var segBadge = isB2b
          ? '<span style="background:#e0f2fe;color:#0284c7;font-weight:800;padding:3px 8px;border-radius:6px;font-size:11px;border:1px solid #bae6fd">🏢 B2B</span>'
          : '<span style="background:#f3e8ff;color:#7e22ce;font-weight:800;padding:3px 8px;border-radius:6px;font-size:11px;border:1px solid #e9d5ff">👤 B2C</span>';

        var dateParts = (c.startDate || '').split('-');
        var fmtDate = dateParts.length === 3 ? (dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]) : c.startDate;

        var isCol = (typeof window.isContractCollected === 'function')
          ? window.isContractCollected(c, effectiveMonth, period)
          : true;

        var statusBadge = (isCol === true)
          ? '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" title="Bấm để đổi trạng thái" style="cursor:pointer;background:#dcfce7;color:#15803d;padding:4px 9px;border-radius:8px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:5px;border:1px solid #bbf7d0"><span style="width:6px;height:6px;border-radius:50%;background:#16a34a"></span> Đã nạp phí 🔄</span>'
          : '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" title="Bấm để đổi trạng thái" style="cursor:pointer;background:#fef3c7;color:#b45309;padding:4px 9px;border-radius:8px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:5px;border:1px solid #fde68a"><span style="width:6px;height:6px;border-radius:50%;background:#d97706"></span> Chờ nạp phí 🔄</span>';

        // Avatar chữ cái đầu
        var initials = (c.customerName || 'KH').split(' ').map(function (w) { return w[0]; }).filter(Boolean).slice(0, 2).join('').toUpperCase();
        var colorIdx = Math.abs(c.id.split('').reduce(function (a, b) { return a + b.charCodeAt(0); }, 0)) % avatarPalette.length;
        var av = avatarPalette[colorIdx];

        // Plan styling
        var planStyle = 'background:#f1f5f9;color:#334155;border:1px solid #cbd5e1';
        if (/enterprise/i.test(c.planTier)) planStyle = 'background:linear-gradient(135deg, #ede9fe, #f3e8ff);color:#6b21a8;border:1px solid #d8b4fe';
        else if (/professional/i.test(c.planTier)) planStyle = 'background:#e0f2fe;color:#0369a1;border:1px solid #bae6fd';
        else if (/standard/i.test(c.planTier)) planStyle = 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0';
        else if (/starter/i.test(c.planTier)) planStyle = 'background:#fef3c7;color:#b45309;border:1px solid #fde68a';

        // Cycle icon
        var cycleLabel = c.billingCycle || '1 Tháng';
        var cycleIcon = /năm|annual/i.test(cycleLabel) ? '⭐ ' : (/quý|quarter/i.test(cycleLabel) ? '🗓️ ' : '⏱️ ');

        html += '<tr style="border-bottom:1px solid #f1f5f9;transition:background 0.15s" onmouseover="this.style.background=\'#f8fafc\'" onmouseout="this.style.background=\'#ffffff\'">';
        html += '<td style="padding:12px;font-weight:800;color:#0284c7;font-family:Consolas,monospace">' + c.id + '</td>';
        html += '<td style="padding:12px">' +
          '<div style="display:flex;align-items:center;gap:10px">' +
            '<div style="width:34px;height:34px;border-radius:10px;background:' + av.bg + ';color:' + av.text + ';font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,0.06)">' + initials + '</div>' +
            '<div>' +
              '<div style="font-weight:700;color:#0f172a;font-size:12.5px">' + c.customerName + '</div>' +
              '<div style="font-size:11px;color:#64748b;margin-top:2px">' + (c.contactPerson || '') + '</div>' +
            '</div>' +
          '</div>' +
          '</td>';
        html += '<td style="padding:12px;text-align:center">' + segBadge + '</td>';
        html += '<td style="padding:12px;color:#475569;font-weight:600"><span style="display:inline-flex;align-items:center;gap:4px">📅 ' + fmtDate + '</span></td>';
        html += '<td style="padding:12px"><span style="font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:6px;' + planStyle + '">' + c.planTier + '</span></td>';
        html += '<td style="padding:12px;color:#334155;font-weight:600;font-size:11.5px">' + cycleIcon + cycleLabel + '</td>';
        html += '<td style="padding:12px;text-align:center"><span style="font-weight:800;color:#0f172a;background:#f1f5f9;padding:2px 8px;border-radius:6px;font-size:11.5px">💺 ' + c.seats + '</span></td>';
        html += '<td style="padding:12px;text-align:right;font-weight:900;color:#0f766e;font-size:13px">' + fmt(c.billingAmount) + '</td>';
        html += '<td style="padding:12px;text-align:center">' + statusBadge + '</td>';
        html += '<td style="padding:12px;text-align:center">' +
          '<button type="button" onclick="window.showContractDetailModal(\'' + c.id + '\')" style="padding:4px 10px;font-size:11px;font-weight:700;border-radius:6px;color:#0284c7;border:1px solid #bae6fd;background:#f0f9ff;cursor:pointer;display:inline-flex;align-items:center;gap:4px;transition:all 0.15s" onmouseover="this.style.background=\'#0284c7\';this.style.color=\'#fff\'" onmouseout="this.style.background=\'#f0f9ff\';this.style.color=\'#0284c7\'">👁️ Xem</button>' +
          '</td>';
        html += '</tr>';
      });

      tbody.innerHTML = html;
    };

    // ===== MỤC 2: BẢNG KÊ DOANH THU & ĐỐI SOÁT HỢP ĐỒNG TRỰC TIẾP TRÊN DASHBOARD =====
    window.dashMainSegmentFilter = 'ALL';
    window.dashMainStatusFilter = 'ALL';
    window.dashMainSearchQuery = '';

    window.setMainTableSegment = function (seg) {
      window.dashMainSegmentFilter = seg;
      ['all', 'b2b', 'b2c'].forEach(function (s) {
        var btn = document.getElementById('btn-main-seg-' + s);
        if (btn) {
          if (s === seg.toLowerCase()) {
            btn.style.background = '#0f172a';
            btn.style.color = '#ffffff';
            btn.style.borderColor = '#0f172a';
          } else {
            btn.style.background = '#ffffff';
            btn.style.color = (s === 'b2b' ? '#0284c7' : (s === 'b2c' ? '#7e22ce' : '#334155'));
            btn.style.borderColor = '#cbd5e1';
          }
        }
      });
      window.renderDashMainContractsTable();
    };

    window.setMainTableStatus = function (st) {
      window.dashMainStatusFilter = st;
      ['all', 'col', 'pen'].forEach(function (s) {
        var btn = document.getElementById('btn-main-st-' + s);
        if (btn) {
          var match = (s === 'all' && st === 'ALL') || (s === 'col' && st === 'COLLECTED') || (s === 'pen' && st === 'PENDING');
          if (match) {
            btn.style.background = '#0f172a';
            btn.style.color = '#ffffff';
            btn.style.borderColor = '#0f172a';
          } else {
            btn.style.background = '#ffffff';
            btn.style.color = (s === 'col' ? '#15803d' : (s === 'pen' ? '#b45309' : '#334155'));
            btn.style.borderColor = (s === 'col' ? '#86efac' : (s === 'pen' ? '#fde68a' : '#cbd5e1'));
          }
        }
      });
      window.renderDashMainContractsTable();
    };

    window.onDashMainTableSearch = function (query) {
      window.dashMainSearchQuery = (query || '').toLowerCase().trim();
      window.renderDashMainContractsTable();
    };

    window.renderDashMainContractsTable = function (periodStr, segment) {
      var period = periodStr || window.currentPeriod || '2026-09';
      var seg = segment || window.dashMainSegmentFilter || window.currentSegment || 'ALL';
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;

      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var allContracts = window.DUMMY_CONTRACTS_DATA || [];
      var effectiveMonth = (period === '2026-09-24') ? '2026-09' : period;
      var effYear = effectiveMonth.indexOf('-') !== -1 ? effectiveMonth.split('-')[0] : '2026';
      var isFutureYear = parseInt(effYear, 10) > 2026;

      var payingContracts = allContracts.filter(function (c) {
        return (typeof window.isContractPayingInMonth === 'function')
          ? window.isContractPayingInMonth(c, effectiveMonth)
          : (c.paymentMonths && c.paymentMonths.indexOf(effectiveMonth) !== -1);
      });

      payingContracts.sort(function (a, b) {
        return (a.billingDay || 0) - (b.billingDay || 0);
      });

      var totalCol = 0, totalPen = 0;
      payingContracts.forEach(function (c) {
        var isCol = (typeof window.isContractCollected === 'function')
          ? window.isContractCollected(c, effectiveMonth, period)
          : true;
        if (isCol) totalCol++;
        else totalPen++;
      });

      var elCntCol = document.getElementById('main-cnt-col');
      var elCntPen = document.getElementById('main-cnt-pen');
      if (elCntCol) elCntCol.textContent = totalCol;
      if (elCntPen) elCntPen.textContent = totalPen;

      var filtered = payingContracts.filter(function (c) {
        if (seg !== 'ALL' && c.customerType !== seg) return false;
        var isCol = (typeof window.isContractCollected === 'function')
          ? window.isContractCollected(c, effectiveMonth, period)
          : true;
        if (window.dashMainStatusFilter === 'COLLECTED' && !isCol) return false;
        if (window.dashMainStatusFilter === 'PENDING' && isCol) return false;
        return true;
      });

      var q = window.dashMainSearchQuery || '';
      var displayList = filtered.filter(function (c) {
        if (!q) return true;
        var full = (c.id + ' ' + c.customerName + ' ' + (c.contactPerson || '') + ' ' + (c.notes || '')).toLowerCase();
        return full.indexOf(q) !== -1;
      });

      var elCounter = document.getElementById('dash-main-table-counter');
      if (elCounter) {
        elCounter.textContent = 'Hiển thị ' + displayList.length + ' / ' + payingContracts.length + ' hợp đồng trong kỳ ' + effectiveMonth;
      }

      var tbody = document.getElementById('dash-main-contracts-tbody');
      if (!tbody) return;

      if (displayList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:26px;color:#94a3b8;font-size:12.5px">' +
          'Không có hợp đồng nào phù hợp với bộ lọc hiện tại' +
          '</td></tr>';
        return;
      }

      var sumColCash = 0;
      var sumMrr = 0;
      var html = '';

      displayList.forEach(function (c) {
        var isB2b = (c.customerType === 'B2B');
        var segBadge = isB2b
          ? '<span style="background:#e0f2fe;color:#0284c7;font-weight:700;padding:2px 7px;border-radius:4px;font-size:11px">🏢 B2B</span>'
          : '<span style="background:#f3e8ff;color:#7e22ce;font-weight:700;padding:2px 7px;border-radius:4px;font-size:11px">👤 B2C</span>';

        var isCol = (typeof window.isContractCollected === 'function')
          ? window.isContractCollected(c, effectiveMonth, period)
          : true;
        var isOver = (typeof window.isContractOverdue === 'function')
          ? window.isContractOverdue(c, effectiveMonth, period)
          : false;

        if (isCol) sumColCash += c.billingAmount;
        sumMrr += (c.mrrContribution || 0);

        var statusBadge = '';
        if (isCol) {
          statusBadge = '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" title="Bấm để đổi sang Chưa thu" style="cursor:pointer;background:#dcfce7;color:#15803d;padding:4px 9px;border-radius:6px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;border:1px solid #bbf7d0">🟢 ĐÃ THU 🔄</span>';
        } else if (isOver) {
          var dMonths = (typeof window.getContractDebtMonths === 'function') ? window.getContractDebtMonths(c, effectiveMonth) : 1;
          var dTag = (dMonths >= 12)
            ? '<span style="display:block;margin-top:3px;font-size:10px;font-weight:800;color:#991b1b;background:#fee2e2;padding:1px 5px;border-radius:4px;border:1px solid #f87171" title="Đã nợ đủ 12 tháng - chuẩn bị chuyển nợ xấu/hủy gói">⛔ Nợ: 12/12 thg</span>'
            : '<span style="display:block;margin-top:3px;font-size:10px;font-weight:700;color:#c2410c;background:#ffedd5;padding:1px 5px;border-radius:4px;border:1px solid #fed7aa" title="Thời gian nợ: ' + dMonths + '/12 tháng">⏱️ Nợ: ' + dMonths + '/12 thg</span>';
          statusBadge = '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" title="Bấm để xác nhận Đã thu" style="cursor:pointer;background:#fee2e2;color:#dc2626;padding:4px 9px;border-radius:6px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;border:1px solid #fca5a5">🔴 ĐANG NỢ 🔄</span>' + dTag;
        } else {
          statusBadge = '<span onclick="window.toggleContractPaymentStatus(\'' + c.id + '\')" title="Bấm để xác nhận Đã thu" style="cursor:pointer;background:#fef3c7;color:#b45309;padding:4px 9px;border-radius:6px;font-weight:700;font-size:11px;display:inline-flex;align-items:center;gap:4px;border:1px solid #fde68a">🟡 CHỜ NẠP 🔄</span>';
        }

        var dayPad = (c.billingDay < 10 ? '0' : '') + c.billingDay;
        var monthPad = effectiveMonth.split('-')[1];
        var dateText = isFutureYear ? ('Ngày ' + dayPad + '/' + monthPad + '/' + effYear) : ('Ngày ' + dayPad + '/' + monthPad);
        var rowBg = isCol ? '#ffffff' : (isOver ? '#fff5f5' : '#fffbeb');

        html += '<tr style="border-bottom:1px solid #f1f5f9;transition:background 0.15s;background:' + rowBg + '">';
        html += '<td style="padding:10px 12px;font-weight:800;color:#089490">' + c.id + '</td>';
        html += '<td style="padding:10px 12px">' +
          '<div style="font-weight:700;color:#0f172a;font-size:12.5px">' + c.customerName + '</div>' +
          '<div style="font-size:11px;color:#64748b;margin-top:1px">' + (c.contactPerson || '') + '</div>' +
          '</td>';
        html += '<td style="padding:10px 12px;text-align:center">' + segBadge + '</td>';
        html += '<td style="padding:10px 12px">' +
          '<span style="font-weight:700;color:#0f172a">' + c.planTier + '</span>' +
          '<span style="font-size:11px;color:#64748b;margin-left:4px">(' + c.seats + ' ghế)</span>' +
          '</td>';
        html += '<td style="padding:10px 12px;color:#475569">' + c.billingCycle + '</td>';
        html += '<td style="padding:10px 12px;font-weight:700;color:#0369a1">' +
          '<span style="background:#e0f2fe;padding:2px 6px;border-radius:4px">' + dateText + '</span>' +
          '</td>';
        html += '<td style="padding:10px 12px;text-align:right;font-weight:900;color:#089490;font-size:13px">' + fmt(c.billingAmount) + '</td>';
        html += '<td style="padding:10px 12px;text-align:right;font-weight:700;color:#0284c7">' + fmt(c.mrrContribution) + '</td>';
        html += '<td style="padding:10px 12px;text-align:center">' + statusBadge + '</td>';
        html += '<td style="padding:10px 12px;text-align:center">' +
          '<button type="button" class="btn btn-outline btn-sm" onclick="window.showContractDetailModal(\'' + c.id + '\')" style="padding:3px 8px;font-size:11px;border-radius:5px;color:#089490;border-color:#99f6e4;background:#f0fdfa">Chi tiết</button>' +
          '</td>';
        html += '</tr>';
      });

      tbody.innerHTML = html;

      var elFootCol = document.getElementById('dash-main-foot-col');
      var elFootMrr = document.getElementById('dash-main-foot-mrr');
      if (elFootCol) {
        if (isFutureYear) {
          var totalFuturePlan = payingContracts.reduce(function (acc, x) { return acc + (x.billingAmount || 0); }, 0);
          elFootCol.textContent = fmt(totalFuturePlan) + ' (Dự thu)';
        } else {
          elFootCol.textContent = fmt(sumColCash);
        }
      }
      if (elFootMrr) elFootMrr.textContent = fmt(sumMrr);
    };

    // Hàm bao tương thích ngược cho renderDashboardOperations
    window.renderDashboardOperations = function (periodStr, segment) {
      if (typeof window.renderNewSignupsSection === 'function') {
        window.renderNewSignupsSection(periodStr, segment);
      }
      if (typeof window.renderDashMainContractsTable === 'function') {
        window.renderDashMainContractsTable(periodStr, segment);
      }
    };

    // Modal hiển thị chi tiết hợp đồng
    window.showContractDetailModal = function (id) {
      var contract = (window.DUMMY_CONTRACTS_DATA || []).find(function (c) { return c.id === id; });
      if (!contract) return;

      var p = window.currentPeriod || '2026-09';
      var isCol = (typeof window.isContractCollected === 'function') ? window.isContractCollected(contract, p) : null;
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      function fmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var modalId = 'dash-contract-detail-modal';
      var old = document.getElementById(modalId);
      if (old) old.remove();

      var isB2b = (contract.customerType === 'B2B');
      var segColor = isB2b ? '#0284c7' : '#7e22ce';

      var statusText = (isCol === null) ? 'Đã trả trước (Không phát sinh nạp kỳ này)' : (isCol ? '🟢 ĐÃ THU TIỀN' : '🟡 CHỜ THANH TOÁN');
      var statusBg = isCol ? '#dcfce7' : '#fef3c7';
      var statusColor = isCol ? '#15803d' : '#b45309';

      var modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'modal-backdrop';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.7);backdrop-filter:blur(6px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px';
      modal.onclick = function (e) { if (e.target === modal) modal.remove(); };

      modal.innerHTML = 
        '<div style="background:#ffffff;border-radius:16px;width:100%;max-width:580px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);border:1px solid #cbd5e1;overflow:hidden">' +
          '<div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;background:#f8fafc">' +
            '<div style="display:flex;align-items:center;gap:10px">' +
              '<span style="font-size:22px">📋</span>' +
              '<div>' +
                '<h3 style="margin:0;font-size:16px;font-weight:800;color:#0f172a">' + contract.customerName + '</h3>' +
                '<div style="font-size:11.5px;color:#64748b;margin-top:2px">Mã HĐ: <strong style="color:#089490">' + contract.id + '</strong> • Người ký: ' + (contract.contactPerson || 'N/A') + '</div>' +
              '</div>' +
            '</div>' +
            '<button type="button" onclick="document.getElementById(\'' + modalId + '\').remove()" style="border:none;background:transparent;cursor:pointer;font-size:18px;color:#64748b;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:6px">✕</button>' +
          '</div>' +
          '<div style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:12.5px">' +
            '<div style="background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0">' +
              '<div style="font-size:11px;color:#64748b;font-weight:700">PHÂN KHÚC & GÓI DỊCH VỤ</div>' +
              '<div style="margin-top:4px;font-weight:800;color:' + segColor + '">' + (isB2b ? '🏢 Khối Doanh nghiệp (B2B)' : '👤 Khối Cá nhân (B2C)') + '</div>' +
              '<div style="font-size:12px;color:#334155;margin-top:2px">Gói: <strong>' + contract.planTier + '</strong> (' + contract.seats + ' ghế)</div>' +
            '</div>' +
            '<div style="background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0">' +
              '<div style="font-size:11px;color:#64748b;font-weight:700">CHU KỲ & NGÀY THU HÀNG KỲ</div>' +
              '<div style="margin-top:4px;font-weight:800;color:#0f172a">' + contract.billingCycle + '</div>' +
              '<div style="font-size:12px;color:#0284c7;margin-top:2px">Ngày thu: <strong>Ngày ' + contract.billingDay + '</strong> hàng tháng</div>' +
            '</div>' +
            '<div style="background:#f0fdfa;padding:10px 12px;border-radius:8px;border:1px solid #ccfbf1">' +
              '<div style="font-size:11px;color:#0f766e;font-weight:700">SỐ TIỀN THU KỲ NÀY</div>' +
              '<div style="font-size:18px;font-weight:900;color:#089490;margin-top:3px">' + fmt(contract.billingAmount) + '</div>' +
              '<div style="font-size:11px;color:#64748b;margin-top:1px">Chu kỳ: ' + contract.billingCycle + '</div>' +
            '</div>' +
            '<div style="background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0">' +
              '<div style="font-size:11px;color:#64748b;font-weight:700">TRẠNG THÁI THANH TOÁN (KỲ ' + p + ')</div>' +
              '<div style="margin-top:4px;display:inline-block;padding:3px 8px;border-radius:6px;background:' + statusBg + ';color:' + statusColor + ';font-weight:800;font-size:11.5px">' + statusText + '</div>' +
              '<div style="font-size:11px;color:#64748b;margin-top:3px">Phương thức: ' + (contract.paymentMethod || 'Chuyển khoản') + '</div>' +
            '</div>' +
            '<div style="grid-column:1 / -1;background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0">' +
              '<div style="font-size:11px;color:#64748b;font-weight:700">GHI CHÚ HỢP ĐỒNG</div>' +
              '<div style="font-size:12px;color:#334155;margin-top:3px;line-height:1.4">' + (contract.notes || 'Không có ghi chú thêm.') + '</div>' +
            '</div>' +
          '</div>' +
          '<div style="padding:12px 20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;background:#f8fafc">' +
            (isCol !== null ? '<button type="button" class="btn btn-sm" onclick="window.toggleContractPaymentStatus(\'' + contract.id + '\');document.getElementById(\'' + modalId + '\').remove()" style="background:#089490;color:#fff;border:none;padding:6px 12px;border-radius:6px;font-weight:700;font-size:12px">🔄 Đổi Trạng Thái Thanh Toán</button>' : '<span></span>') +
            '<button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById(\'' + modalId + '\').remove()" style="padding:6px 14px;border-radius:6px;font-size:12px">Đóng</button>' +
          '</div>' +
        '</div>';

      document.body.appendChild(modal);
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
      var btnOver = document.getElementById('btn-dash-st-over');
      var btnAll2 = document.getElementById('btn-dash-st-all-header');
      var btnCol2 = document.getElementById('btn-dash-st-col-header');
      var btnPen2 = document.getElementById('btn-dash-st-pen-header');
      var btnOver2 = document.getElementById('btn-dash-st-over-header');

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
      [btnOver, btnOver2].forEach(function (b) {
        if (b) {
          b.style.background = (status === 'OVERDUE' ? '#dc2626' : '#ffffff');
          b.style.color = (status === 'OVERDUE' ? '#ffffff' : '#dc2626');
          b.style.border = (status === 'OVERDUE' ? 'none' : '1px solid #fca5a5');
        }
      });

      // Highlight active KPI cards
      var cardCol = document.getElementById('card-kpi-collected');
      var cardPen = document.getElementById('card-kpi-pending');
      var cardOver = document.getElementById('card-kpi-overdue');
      if (cardCol) {
        cardCol.style.boxShadow = (status === 'COLLECTED') ? '0 0 0 3px rgba(22, 163, 74, 0.45), 0 4px 12px rgba(22, 163, 74, 0.15)' : 'none';
        cardCol.style.borderColor = (status === 'COLLECTED') ? '#16a34a' : '';
      }
      if (cardPen) {
        cardPen.style.boxShadow = (status === 'PENDING') ? '0 0 0 3px rgba(217, 119, 6, 0.45), 0 4px 12px rgba(217, 119, 6, 0.15)' : 'none';
        cardPen.style.borderColor = (status === 'PENDING') ? '#d97706' : '';
      }
      if (cardOver) {
        cardOver.style.boxShadow = (status === 'OVERDUE') ? '0 0 0 3px rgba(220, 38, 38, 0.45), 0 4px 12px rgba(220, 38, 38, 0.15)' : 'none';
        cardOver.style.borderColor = (status === 'OVERDUE') ? '#dc2626' : '';
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
      var dynPeriod = window.currentDashboardDailyPeriod || window.currentPeriod || '2026-10';
      var dynMetrics = window.getDynamicPeriodMetrics ? window.getDynamicPeriodMetrics(dynPeriod, window.currentSegment || 'ALL') : null;
      var isUsd = (window.currentCurrency === 'USD');
      var rate = isUsd ? (1 / 150.24) : 1;
      function dynFmt(val) {
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      var titleEl = document.getElementById('reconcile-modal-title');
      if (titleEl) {
        var pParts = dynPeriod.split('-');
        var periodText = 'Tháng ' + (pParts[1] || '10') + '/' + (pParts[0] || '2026');
        if (status === 'COLLECTED') {
          var colCount = dynMetrics ? dynMetrics.collectedCount : 0;
          titleEl.innerHTML = '🟢 SỔ DÒNG TIỀN: DANH SÁCH ' + colCount + ' HỢP ĐỒNG ĐÃ THU (' + periodText + ')';
        } else if (status === 'PENDING') {
          var penCount = dynMetrics ? dynMetrics.pendingCount : 0;
          titleEl.innerHTML = '🟡 SỔ DÒNG TIỀN: DANH SÁCH ' + penCount + ' HỢP ĐỒNG CHƯA THU (' + periodText + ')';
        } else if (status === 'OVERDUE') {
          var overCount = dynMetrics ? dynMetrics.overdueCount : 0;
          titleEl.innerHTML = '🔴 SỔ DÒNG TIỀN: DANH SÁCH ' + overCount + ' HỢP ĐỒNG ĐANG NỢ (GIỚI HẠN TỐI ĐA 12 THÁNG) (' + periodText + ')';
        } else {
          var totCount = dynMetrics ? dynMetrics.payingCount : 0;
          titleEl.innerHTML = '📅 SỔ DÒNG TIỀN: TOÀN BỘ ' + totCount + ' HỢP ĐỒNG (' + periodText + ')';
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
          var cCnt = dynMetrics ? dynMetrics.collectedCount : 0;
          var cAmt = dynMetrics ? dynFmt(dynMetrics.collectedCash) : '¥0';
          window.showAdminToast('Đang lọc ' + cCnt + ' hợp đồng ĐÃ THU TIỀN (' + cAmt + ')', 'success');
        } else if (status === 'PENDING') {
          var pCnt = dynMetrics ? dynMetrics.pendingCount : 0;
          var pAmt = dynMetrics ? dynFmt(dynMetrics.pendingCash) : '¥0';
          window.showAdminToast('Đang lọc ' + pCnt + ' hợp đồng CHƯA THU TIỀN (' + pAmt + ')', 'info');
        } else if (status === 'OVERDUE') {
          var oCnt = dynMetrics ? dynMetrics.overdueCount : 0;
          var oAmt = dynMetrics ? dynFmt(dynMetrics.overdueCash) : '¥0';
          window.showAdminToast('Đang lọc ' + oCnt + ' hợp đồng ĐANG NỢ (Tối đa 12 tháng: ' + oAmt + ')', 'warning');
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

      // Collect all transactions for targetMonth (bao gồm cả Đã thu, Chưa thu và Đang nợ)
      var allTx = [];
      var contractsSource = window.DUMMY_CONTRACTS_DATA || window.DEFAULT_DUMMY_CONTRACTS || [];
      var cp = window.currentDemoCheckpoint || 'NOW_REAL';
      var targetEvalDay = undefined;
      if (window.currentDemoDay && window.currentDemoDay !== 'ALL') {
        targetEvalDay = parseInt(window.currentDemoDay, 10);
      }

      contractsSource.forEach(function (c) {
        var isPaying = (typeof window.isContractPayingInMonth === 'function')
          ? window.isContractPayingInMonth(c, targetMonth)
          : (c.paymentMonths && c.paymentMonths.indexOf(targetMonth) !== -1);
        if (isPaying) {
          if (s === 'ALL' || c.customerType === s) {
            var bDay = c.billingDay || 1;
            var cStatus = (typeof window.getContractStatusInPeriod === 'function')
              ? window.getContractStatusInPeriod(c, targetMonth, targetEvalDay, cp)
              : ((bDay <= 24) ? 'COLLECTED' : 'PENDING');
            var isCol = (cStatus === 'COLLECTED');
            var isPen = (cStatus === 'PENDING');
            var isOver = (cStatus === 'OVERDUE');

            var dMonths = (typeof window.getContractDebtMonths === 'function')
              ? window.getContractDebtMonths(c, targetMonth)
              : 1;

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
              status: cStatus,
              isCollected: isCol,
              isPending: isPen,
              isOverdue: isOver,
              debtMonths: dMonths
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

      // Phân tách số liệu Đã Thu vs Chưa Thu vs Đang Nợ toàn tháng
      var totalMonthCash = allTx.reduce(function (acc, x) { return acc + x.amount; }, 0);
      var collectedMonthCash = allTx.filter(function (x) { return x.isCollected; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var pendingMonthCash = allTx.filter(function (x) { return x.isPending; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var overdueMonthCash = allTx.filter(function (x) { return x.isOverdue; }).reduce(function (acc, x) { return acc + x.amount; }, 0);

      var collectedCount = allTx.filter(function (x) { return x.isCollected; }).length;
      var pendingCount = allTx.filter(function (x) { return x.isPending; }).length;
      var overdueCount = allTx.filter(function (x) { return x.isOverdue; }).length;

      // Cập nhật số đếm badge ở modal header và toolbar
      var dashBadgeCol = document.getElementById('dash-badge-col-count');
      var dashBadgePen = document.getElementById('dash-badge-pen-count');
      var dashBadgeOver = document.getElementById('dash-badge-over-count');
      var dashBadgeColH = document.getElementById('dash-badge-col-count-header');
      var dashBadgePenH = document.getElementById('dash-badge-pen-count-header');
      var dashBadgeOverH = document.getElementById('dash-badge-over-count-header');

      if (dashBadgeCol) dashBadgeCol.textContent = collectedCount;
      if (dashBadgePen) dashBadgePen.textContent = pendingCount;
      if (dashBadgeOver) dashBadgeOver.textContent = overdueCount;
      if (dashBadgeColH) dashBadgeColH.textContent = collectedCount;
      if (dashBadgePenH) dashBadgePenH.textContent = pendingCount;
      if (dashBadgeOverH) dashBadgeOverH.textContent = overdueCount;

      var tabBadge = document.getElementById('tab-daily-badge');
      if (tabBadge) {
        tabBadge.textContent = collectedCount + ' Đã thu • ' + pendingCount + ' Chờ thu' + (overdueCount > 0 ? (' • ' + overdueCount + ' Đang nợ') : '');
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
            overdueSum: 0,
            b2b: 0,
            b2c: 0,
            cumulative: tx.cumulative
          };
        }
        dayMap[tx.dayNum].count++;
        dayMap[tx.dayNum].sum += tx.amount;
        if (tx.isCollected) dayMap[tx.dayNum].collectedSum += tx.amount;
        else if (tx.isOverdue) dayMap[tx.dayNum].overdueSum += tx.amount;
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

      // Cập nhật tiêu đề Modal khớp chính xác với trạng thái đang lọc
      var modalTitleEl = document.getElementById('reconcile-modal-title');
      if (modalTitleEl) {
        var pParts = targetMonth.split('-');
        var periodText = 'Tháng ' + (pParts[1] || '10') + '/' + (pParts[0] || '2026');
        if (currentStFilter === 'COLLECTED') {
          modalTitleEl.innerHTML = '🟢 SỔ DÒNG TIỀN: DANH SÁCH ' + collectedCount + ' HỢP ĐỒNG ĐÃ THU (' + periodText + ')';
        } else if (currentStFilter === 'PENDING') {
          modalTitleEl.innerHTML = '🟡 SỔ DÒNG TIỀN: DANH SÁCH ' + pendingCount + ' HỢP ĐỒNG CHƯA THU (' + periodText + ')';
        } else if (currentStFilter === 'OVERDUE') {
          modalTitleEl.innerHTML = '🔴 SỔ DÒNG TIỀN: DANH SÁCH ' + overdueCount + ' HỢP ĐỒNG ĐANG NỢ QUÁ HẠN (' + periodText + ')';
        } else {
          modalTitleEl.innerHTML = '📅 SỔ DÒNG TIỀN: TOÀN BỘ ' + allTx.length + ' HỢP ĐỒNG (' + periodText + ')';
        }
      }

      if (matrixTitleEl) matrixTitleEl.textContent = 'Mốc Ngày Thu — ' + monthName;
      if (matrixSubtitleEl) {
        if (currentStFilter === 'COLLECTED') {
          matrixSubtitleEl.textContent = 'Đang lọc ' + collectedCount + ' hợp đồng đã vào két (' + fmt(collectedMonthCash) + ')';
        } else if (currentStFilter === 'PENDING') {
          matrixSubtitleEl.textContent = 'Đang lọc ' + pendingCount + ' hợp đồng chờ nạp (' + fmt(pendingMonthCash) + ')';
        } else if (currentStFilter === 'OVERDUE') {
          matrixSubtitleEl.textContent = 'Đang lọc ' + overdueCount + ' hợp đồng đang nợ (' + fmt(overdueMonthCash) + ')';
        } else {
          matrixSubtitleEl.textContent = uniqueDays.length + ' ngày có nạp (' + collectedCount + ' đã thu • ' + pendingCount + ' chờ thu' + (overdueCount > 0 ? (' • ' + overdueCount + ' nợ') : '') + ')';
        }
      }
      if (matrixBadgeEl) matrixBadgeEl.textContent = uniqueDays.length + ' mốc ngày';
      if (allSumBadge) {
        if (currentStFilter === 'COLLECTED') allSumBadge.textContent = fmt(collectedMonthCash);
        else if (currentStFilter === 'PENDING') allSumBadge.textContent = fmt(pendingMonthCash);
        else if (currentStFilter === 'OVERDUE') allSumBadge.textContent = fmt(overdueMonthCash);
        else allSumBadge.textContent = fmt(totalMonthCash);
      }
      if (allCountSub) {
        if (currentStFilter === 'COLLECTED') allCountSub.textContent = collectedCount + ' HĐ đã vào két';
        else if (currentStFilter === 'PENDING') allCountSub.textContent = pendingCount + ' HĐ đang chờ thu';
        else if (currentStFilter === 'OVERDUE') allCountSub.textContent = overdueCount + ' HĐ đang nợ quá hạn';
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
        } else if (currentStFilter === 'OVERDUE') {
          visibleMilestones = uniqueDays.filter(function (d) { return d.overdueSum > 0; });
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
            } else if (d.overdueSum > 0) {
              badgeTag = '<span style="font-size:10px;background:#fee2e2;color:#dc2626;padding:1px 5px;border-radius:4px;font-weight:700">🔴 Nợ</span>';
            } else if (d.pendingSum === 0) {
              badgeTag = '<span style="font-size:10px;background:#dcfce7;color:#15803d;padding:1px 5px;border-radius:4px;font-weight:700">✓ Đã thu</span>';
            } else {
              badgeTag = '<span style="font-size:10px;background:#fffdf5;color:#b45309;padding:1px 5px;border-radius:4px;font-weight:700;border:1px solid #fde68a">⏳ Chờ thu</span>';
            }

            var dayAmount = (currentStFilter === 'COLLECTED') ? d.collectedSum : ((currentStFilter === 'PENDING') ? d.pendingSum : ((currentStFilter === 'OVERDUE') ? d.overdueSum : d.sum));

            mListHTML += '<div onclick="selectDailyMilestoneDay(' + d.day + ')" style="cursor:pointer;padding:9px 12px;border-radius:10px;background:' + cardBg + ';border:' + cardBorder + ';transition:all 0.15s;position:relative" title="Xem chi tiết ngày ' + d.day + '/' + monthCode + '">';
            mListHTML += '<div style="display:flex;justify-content:space-between;align-items:center">';
            mListHTML += '<div style="display:flex;align-items:center;gap:6px"><strong style="font-size:12.5px;color:' + (isSelected ? '#089490' : '#0f172a') + '">Ngày ' + (d.day < 10 ? '0' : '') + d.day + '/' + monthCode + '</strong>' + badgeTag + '</div>';
            mListHTML += '<strong style="font-size:13px;color:' + (isSelected ? '#089490' : '#0f172a') + '">' + fmt(dayAmount) + '</strong>';
            mListHTML += '</div>';

            mListHTML += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;font-size:11px;color:#64748b">';
            mListHTML += '<span>' + d.count + ' HĐ (🟢 ' + fmt(d.collectedSum) + (d.pendingSum > 0 ? (' • 🟡 ' + fmt(d.pendingSum)) : '') + (d.overdueSum > 0 ? (' • 🔴 ' + fmt(d.overdueSum)) : '') + ')</span>';
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

      // Filter by Payment Status (ĐÃ THU vs CHƯA THU vs ĐANG NỢ)
      if (currentStFilter === 'COLLECTED') {
        displayTx = displayTx.filter(function (tx) { return tx.isCollected === true; });
      } else if (currentStFilter === 'PENDING') {
        displayTx = displayTx.filter(function (tx) { return tx.isPending === true; });
      } else if (currentStFilter === 'OVERDUE') {
        displayTx = displayTx.filter(function (tx) { return tx.isOverdue === true; });
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
      var dispPending = displayTx.filter(function (x) { return x.isPending; }).reduce(function (acc, x) { return acc + x.amount; }, 0);
      var dispOverdue = displayTx.filter(function (x) { return x.isOverdue; }).reduce(function (acc, x) { return acc + x.amount; }, 0);

      // Update Search Counter Badge
      var searchCounterEl = document.getElementById('dash-daily-search-counter');
      if (searchCounterEl) {
        var dayScopeText = (activeDay === 'ALL') ? '' : ('Ngày ' + (activeDay < 10 ? '0' : '') + activeDay + ': ');
        var stLabel = (currentStFilter === 'COLLECTED') ? 'Đã thu • ' : ((currentStFilter === 'PENDING') ? 'Chờ thu • ' : ((currentStFilter === 'OVERDUE') ? 'Đang nợ • ' : ''));
        searchCounterEl.textContent = dayScopeText + stLabel + displayTx.length + ' HĐ • ' + fmt(currentDispTotal);
      }

      // Update Formulas Box Content
      var fTitleEl = document.getElementById('dash-formulas-title');
      var fCashinEl = document.getElementById('dash-formula-cashin');
      var fMrrEl = document.getElementById('dash-formula-mrr');
      var fSegEl = document.getElementById('dash-formula-seg');

      if (fTitleEl) fTitleEl.textContent = '📐 Công Thức Đối Soát — ' + monthName + (activeDay !== 'ALL' ? (' (Ngày ' + (activeDay < 10 ? '0' : '') + activeDay + ')') : '');
      if (fCashinEl) {
        fCashinEl.innerHTML = '🟢 Đã thu: <strong>' + fmt(collectedMonthCash) + '</strong> (' + collectedCount + ' HĐ)<br>🟡 Chưa thu: <strong>' + fmt(pendingMonthCash) + '</strong> (' + pendingCount + ' HĐ)<br>' + (overdueCount > 0 ? ('🔴 Đang nợ: <strong>' + fmt(overdueMonthCash) + '</strong> (' + overdueCount + ' HĐ)<br>') : '') + '💰 Tổng dự thu = <strong>' + fmt(totalMonthCash) + '</strong>';
      }
      if (fMrrEl) {
        var totalMonthVal = allTx.reduce(function (sum, tx) { return sum + tx.amount; }, 0);
        fMrrEl.innerHTML = 'Tổng giá trị hợp đồng = <strong>' + fmt(totalMonthVal) + '</strong> (' + allTx.length + ' HĐ)';
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
          if (currentStFilter === 'OVERDUE') {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:#16a34a;font-size:13px"><div style="font-size:26px;margin-bottom:6px">🎉</div><strong>Không có hợp đồng nào đang nợ quá hạn!</strong><br><span style="color:#64748b;font-size:12px">Toàn bộ các khoản thu đến kỳ hạn đã được đối soát hoàn tất 100%.</span><br><button type="button" onclick="setDashboardDailyStatusFilter(\'ALL\');" style="margin-top:10px;padding:5px 12px;background:#f0fdf4;border:1px solid #86efac;color:#15803d;font-weight:700;border-radius:6px;font-size:11.5px;cursor:pointer">Xem tất cả dòng tiền</button></td></tr>';
          } else if (currentStFilter === 'COLLECTED') {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:#64748b;font-size:12.5px"><div style="font-size:20px;margin-bottom:6px">⏳</div>Chưa có hợp đồng nào thu tiền trong mốc này.<br><button type="button" onclick="setDashboardDailyStatusFilter(\'ALL\');" style="margin-top:8px;padding:4px 10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:11.5px;cursor:pointer">Xem tất cả</button></td></tr>';
          } else {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:32px;color:#94a3b8;font-size:12.5px"><div style="font-size:20px;margin-bottom:6px">🔍</div>Không tìm thấy hợp đồng nào khớp với bộ lọc.<br><button type="button" onclick="document.getElementById(\'dash-daily-search\').value=\'\';onDashDailySearch(\'\');setDashboardDailyStatusFilter(\'ALL\');" style="margin-top:8px;padding:4px 10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;font-size:11.5px;cursor:pointer">Đặt lại bộ lọc</button></td></tr>';
          }
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

            var calcFormula = '<span style="font-family:Consolas,monospace;font-size:10.5px;color:#0f766e">' + fmt(tx.amount) + ' / ' + (tx.cycleMonths === 12 ? 'năm' : (tx.cycleMonths === 3 ? 'quý' : 'tháng')) + '</span>';

            var statusBadge = '';
            if (tx.isCollected) {
              statusBadge = '<span onclick="window.toggleContractPaymentStatus(\'' + tx.id + '\');" style="cursor:pointer;background:#dcfce7;color:#15803d;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;border:1px solid #86efac;display:inline-flex;align-items:center;gap:3px" title="Bấm vào để đổi trạng thái">🟢 Đã thu ↺</span>';
            } else if (tx.isOverdue) {
              var dM = tx.debtMonths || 1;
              var dTag = (dM >= 12)
                ? '<div style="margin-top:2px"><span style="background:#fee2e2;color:#991b1b;padding:1px 5px;border-radius:4px;font-size:9.5px;font-weight:800;border:1px solid #f87171" title="Đã nợ đủ 12 tháng - chuẩn bị chuyển nợ xấu/hủy gói">⛔ Nợ: 12/12 thg</span></div>'
                : '<div style="margin-top:2px"><span style="background:#ffedd5;color:#c2410c;padding:1px 5px;border-radius:4px;font-size:9.5px;font-weight:700;border:1px solid #fed7aa" title="Thời gian nợ: ' + dM + '/12 tháng">⏱️ Nợ: ' + dM + '/12 thg</span></div>';
              statusBadge = '<span onclick="window.toggleContractPaymentStatus(\'' + tx.id + '\');" style="cursor:pointer;background:#fee2e2;color:#dc2626;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;border:1px solid #fca5a5;display:inline-flex;align-items:center;gap:3px" title="Bấm vào để đổi trạng thái">🔴 Đang nợ ↺</span>' + dTag;
            } else {
              statusBadge = '<span onclick="window.toggleContractPaymentStatus(\'' + tx.id + '\');" style="cursor:pointer;background:#fffdf5;color:#b45309;padding:2px 7px;border-radius:6px;font-size:10px;font-weight:800;border:1px solid #fde68a;display:inline-flex;align-items:center;gap:3px" title="Bấm vào để đổi trạng thái">🟡 Chưa thu ↺</span>';
            }

            var amountColor = tx.isCollected ? '#089490' : (tx.isOverdue ? '#dc2626' : '#d97706');
            var rowBg = isToday ? ' style="background:#fffdf5"' : (tx.isOverdue ? ' style="background:#fff5f5"' : (tx.isPending ? ' style="background:#fffdfa"' : ''));

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
          sumBadgeEl.innerHTML = '<span style="color:#15803d;font-weight:700;background:#dcfce7;padding:2px 7px;border-radius:8px;font-size:11px">✓ Đã vào két: ' + fmt(collectedMonthCash) + ' (' + collectedCount + ' HĐ)</span>';
        } else if (currentStFilter === 'PENDING') {
          sumBadgeEl.innerHTML = '<span style="color:#b45309;font-weight:700;background:#fef3c7;padding:2px 7px;border-radius:8px;font-size:11px">⏳ Chờ thu nạp: ' + fmt(pendingMonthCash) + ' (' + pendingCount + ' HĐ)</span>';
        } else if (currentStFilter === 'OVERDUE') {
          sumBadgeEl.innerHTML = '<span style="color:#dc2626;font-weight:700;background:#fee2e2;padding:2px 7px;border-radius:8px;font-size:11px">🔴 Đang nợ quá hạn: ' + fmt(overdueMonthCash) + ' (' + overdueCount + ' HĐ)</span>';
        } else {
          sumBadgeEl.innerHTML = '<span style="color:#0f766e;font-weight:700;background:#ccfbf1;padding:2px 7px;border-radius:8px;font-size:11px">' + collectedCount + ' Đã thu • ' + pendingCount + ' Chờ thu' + (overdueCount > 0 ? (' • ' + overdueCount + ' Đang nợ') : '') + '</span>';
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

    // Chuyển đổi trạng thái thu tiền trực tiếp khi click (xoay vòng 3 trạng thái: ĐÃ THU -> CHỜ NẠP -> ĐANG NỢ -> ĐÃ THU)
    window.toggleContractPaymentStatus = function (id) {
      var monthFilter = document.getElementById('dd-filter-month') ? document.getElementById('dd-filter-month').value : '2026-10';
      var p = (monthFilter && monthFilter !== 'ALL') ? (monthFilter === '2026-09-24' ? '2026-09' : monthFilter) : (window.currentPeriod || '2026-10');
      if (p === '2026-09-24') p = '2026-09';

      var contract = window.DUMMY_CONTRACTS_DATA.find(function (c) { return c.id === id; });
      if (!contract) return;

      var isPaying = (typeof window.isContractPayingInMonth === 'function')
        ? window.isContractPayingInMonth(contract, p)
        : (contract.paymentMonths && contract.paymentMonths.indexOf(p) !== -1);

      if (!isPaying) {
        alert('Hợp đồng ' + contract.customerName + ' không có kỳ nạp tiền trong tháng ' + p + '.');
        return;
      }

      var currentStatus = (typeof window.getContractStatusInPeriod === 'function')
        ? window.getContractStatusInPeriod(contract, p, window.currentDemoDay, window.currentDemoCheckpoint)
        : 'COLLECTED';

      if (currentStatus === null) {
        alert('Hợp đồng ' + contract.customerName + ' là gói ' + contract.billingCycle + ' (đã thanh toán trước từ trước, tháng này không phát sinh thu thêm tiền).');
        return;
      }

      // Xoay vòng 3 trạng thái: ĐÃ THU -> CHỜ NẠP -> ĐANG NỢ -> ĐÃ THU
      var newStatus = 'collected';
      if (currentStatus === 'COLLECTED') {
        newStatus = 'pending';
      } else if (currentStatus === 'PENDING') {
        newStatus = 'overdue';
      } else {
        newStatus = 'collected';
      }

      if (!window.CONTRACT_MANUAL_STATUS) window.CONTRACT_MANUAL_STATUS = {};
      window.CONTRACT_MANUAL_STATUS[id + '_' + p] = newStatus;

      var statusLabel = (newStatus === 'collected') ? '🟢 ĐÃ THU' : (newStatus === 'overdue' ? '🔴 ĐANG NỢ' : '🟡 CHỜ NẠP');
      var toastType = (newStatus === 'collected') ? 'success' : (newStatus === 'overdue' ? 'warning' : 'info');

      if (typeof window.showAdminToast === 'function') {
        window.showAdminToast('Đã đổi HĐ ' + contract.customerName + ' (' + contract.id + ') sang trạng thái ' + statusLabel, toastType);
      }

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

      // 4. Khối tài khoản mới & Bảng đối soát chính trên Dashboard
      if (typeof window.renderNewSignupsSection === 'function') {
        window.renderNewSignupsSection();
      }
      if (typeof window.renderDashMainContractsTable === 'function') {
        window.renderDashMainContractsTable();
      }
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
        if (!val) return isUsd ? '$0' : '¥0';
        if (isUsd) return '$' + Math.round(val * rate).toLocaleString('en-US');
        return '¥' + val.toLocaleString('ja-JP');
      }

      // Also refresh the daily matrix data
      // Đã lược bỏ renderDailyMatrixData theo yêu cầu tinh gọn tab data dummy

      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curRealMonth = rt ? rt.currentMonthStr : '2026-10';
      var todayStr = rt ? rt.todayStr : '2026-10-01';

      var statusFilter = window.currentDummyStatusFilter || 'ALL';
      var rawMonthFilter = window.currentDummyMonthFilter || (document.getElementById('dd-filter-month') ? document.getElementById('dd-filter-month').value : 'ALL');
      var monthFilter = rawMonthFilter;
      if (rawMonthFilter === 'TODAY') monthFilter = todayStr;
      else if (rawMonthFilter === 'CURRENT_MONTH') monthFilter = curRealMonth;
      else if (rawMonthFilter === 'NEXT_MONTH') monthFilter = rt ? rt.nextMonthStr : '2026-11';

      var isDayMode = (monthFilter && monthFilter.length === 10);
      var checkMonth = isDayMode ? monthFilter.slice(0, 7) : ((monthFilter === 'ALL') ? curRealMonth : monthFilter);
      var targetDay = isDayMode ? parseInt(monthFilter.slice(8, 10), 10) : 99;

      var filtered = window.DUMMY_CONTRACTS_DATA.filter(function (c) {
        if (segFilter !== 'ALL' && c.customerType !== segFilter) return false;
        if (cycleFilter !== 'ALL' && String(c.cycleMonths) !== String(cycleFilter)) return false;
        if (dayFilter !== 'ALL' && String(c.billingDay) !== String(dayFilter)) return false;

        // Month / Timeline filter
        if (isDayMode) {
          if (c.billingDay !== targetDay && c.startDate > monthFilter) return false;
        } else if (monthFilter !== 'ALL') {
          // Phải bắt đầu trước hoặc trong tháng này
          if (c.startDate > monthFilter + '-31') return false;
        }

        // BỘ LỌC PHÂN BIỆT ĐÃ THU VÀ CHƯA THU
        var isPayingInPeriod = (c.paymentMonths && c.paymentMonths.indexOf(checkMonth) !== -1);
        if (isDayMode) {
          isPayingInPeriod = (isPayingInPeriod && c.billingDay === targetDay);
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
      var monthMetrics = window.getDynamicPeriodMetrics(monthFilter === 'ALL' ? curRealMonth : monthFilter, segFilter);

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

      if (isDayMode) {
        if (statPeriod) statPeriod.textContent = (rt ? rt.dd + '/' + rt.mm + '/' + rt.year : '01/10/2026') + ' (Hôm nay)';
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
        if (statCashLabel) statCashLabel.textContent = '🟢 ĐÃ THU HIỆN TẠI';
        if (statCash) statCash.textContent = fmt(monthMetrics.collectedCash);
        if (statCashSub) statCashSub.textContent = monthMetrics.collectedCount + ' HĐ hoàn tất nạp';
        if (statPendingLabel) statPendingLabel.textContent = '🟡 CHƯA THU KỲ NÀY';
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
              '<span style="font-size:10px;color:#0284c7">Đang hoạt động</span>' +
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
            calcDetail = '<div style="font-family:monospace;font-size:11px;color:#0369a1;background:#f0f9ff;padding:3px 6px;border-radius:4px;border:1px solid #bae6fd">' + fmt(c.billingAmount) + ' ÷ 12 thg = <strong>' + fmt(c.mrrContribution) + '/tháng</strong></div><div style="font-size:10px;color:#64748b;margin-top:1px">Nạp 1 lần/năm (ngày ' + (c.billingDay || 1) + ')</div>';
          } else if (c.cycleMonths === 3) {
            calcDetail = '<div style="font-family:monospace;font-size:11px;color:#047857;background:#f0fdfa;padding:3px 6px;border-radius:4px;border:1px solid #99f6e4">' + fmt(c.billingAmount) + ' ÷ 3 thg = <strong>' + fmt(c.mrrContribution) + '/tháng</strong></div><div style="font-size:10px;color:#64748b;margin-top:1px">Tái nạp theo quý (ngày ' + (c.billingDay || 1) + ')</div>';
          } else {
            calcDetail = '<div style="font-family:monospace;font-size:11px;color:#b45309;background:#fffbeb;padding:3px 6px;border-radius:4px;border:1px solid #fde68a">' + fmt(c.billingAmount) + ' = <strong>' + fmt(c.mrrContribution) + '/tháng</strong></div><div style="font-size:10px;color:#64748b;margin-top:1px">Thu đều hàng tháng (ngày ' + (c.billingDay || 1) + ')</div>';
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
      window.currentDummyMonthFilter = filterVal;
      var sel = document.getElementById('dd-filter-month');
      if (sel) sel.value = filterVal;

      var btnAll = document.getElementById('dd-btn-tl-all');
      var btnToday = document.getElementById('dd-btn-tl-today');
      var btnT9 = document.getElementById('dd-btn-tl-t9');
      var btnT10 = document.getElementById('dd-btn-tl-t10');

      var actStyle = 'font-size:11.5px;padding:5px 11px;font-weight:800;background:#ffffff;color:#089490;box-shadow:0 1px 2px rgba(0,0,0,0.06)';
      var inactStyle = 'font-size:11.5px;padding:5px 11px;font-weight:600;background:transparent;color:#475569;border:none';

      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var todayStr = rt ? rt.todayStr : '2026-10-01';
      var curMonthStr = rt ? rt.currentMonthStr : '2026-10';
      var nextMonthStr = rt ? rt.nextMonthStr : '2026-11';

      var isAll = (filterVal === 'ALL');
      var isToday = (filterVal === 'TODAY' || filterVal === todayStr || filterVal === '2026-09-24');
      var isCur = (filterVal === 'CURRENT_MONTH' || filterVal === curMonthStr || filterVal === '2026-09');
      var isNext = (filterVal === 'NEXT_MONTH' || filterVal === nextMonthStr || filterVal === '2026-10');

      if (btnAll) btnAll.style.cssText = isAll ? actStyle : inactStyle;
      if (btnToday) btnToday.style.cssText = isToday ? actStyle : inactStyle;
      if (btnT9) btnT9.style.cssText = isCur ? actStyle : inactStyle;
      if (btnT10) btnT10.style.cssText = isNext ? actStyle : inactStyle;

      var hint = document.getElementById('dd-timeline-status-hint');
      if (hint) {
        if (isToday) hint.innerHTML = 'Đang đối chiếu: <strong>Hôm nay (' + (rt ? rt.dd + '/' + rt.mm + '/' + rt.year : '01/10/2026') + ' - LIVE)</strong>';
        else if (isCur) hint.innerHTML = 'Đang đối chiếu: <strong>Tháng ' + (rt ? rt.mm + '/' + rt.year : '10/2026') + ' (LIVE Hiện Tại)</strong>';
        else if (isNext) hint.innerHTML = 'Đang đối chiếu: <strong>Tháng ' + (rt ? ((parseInt(rt.mm, 10) % 12 + 1 < 10 ? '0' : '') + (parseInt(rt.mm, 10) % 12 + 1)) : '11') + ' (Dự Báo Tiếp Theo)</strong>';
        else hint.innerHTML = 'Đang hiển thị: <strong>Toàn bộ 52 hợp đồng</strong>';
      }

      renderDummyContractsTable();
    };

    window.showTimelineInDashboard = function () {
      var sel = document.getElementById('dd-filter-month');
      var m = sel ? sel.value : 'TODAY';
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
      window.setDummyTimelineFilter('TODAY');
    };

    window.showContractOnDashboard = function (contractId) {
      var contract = window.DUMMY_CONTRACTS_DATA.find(function (c) { return c.id === contractId; });
      if (!contract) return;

      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var curM = rt ? rt.currentMonthStr : '2026-10';
      var targetMonth = curM;
      if (contract.paymentMonths && contract.paymentMonths.length > 0) {
        if (contract.paymentMonths.indexOf(curM) !== -1) targetMonth = curM;
        else if (rt && contract.paymentMonths.indexOf(rt.nextMonthStr) !== -1) targetMonth = rt.nextMonthStr;
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
      var rt = (typeof window.getRealTimeContext === 'function') ? window.getRealTimeContext() : null;
      var startInput = document.getElementById('new-c-start');
      if (startInput && rt) startInput.value = rt.todayStr;
      var dayInput = document.getElementById('new-c-day');
      if (dayInput && rt) dayInput.value = Math.min(28, Math.max(1, parseInt(rt.dd, 10)));
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
      var csv = '\uFEFFMa_HD,Ten_Khach_Hang,Phan_Khuc,Nguoi_Lien_He,Goi_Cuoc,So_Ghe,Ky_Thanh_Toan,Ngay_Dang_Ky,Ngay_Thu,Phuong_Thuc,So_Tien_Ky (' + curr + '),Doanh_Thu_Thang (' + curr + '),Ghi_Chu\n';

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
      if (typeof window.renderNewSignupsSection === 'function') window.renderNewSignupsSection();
      if (typeof window.renderDashMainContractsTable === 'function') window.renderDashMainContractsTable();
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
      csvContent += '"Tong The","Doanh Thu Thang",' + (isUsd ? '"$3,115"' : '"¥468,000"') + ',"ARR: ' + (isUsd ? '$37.4k' : '¥5.61M') + '"\n';
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


    // ===== BỘ ĐIỀU KHIỂN & CẤU HÌNH GIAO DIỆN TỰ ĐỘNG HÓA CÔNG NỢ =====
    window.openAutomationRulesModal = function () {
      var m = document.getElementById('modal-billing-automation');
      if (!m) return;
      var cfg = window.BILLING_AUTOMATION_CONFIG || {
        autoPilot: true,
        gracePeriodBankTransfer: 3,
        gracePeriodCard: 1
      };
      var chk = document.getElementById('auto-config-autopilot');
      if (chk) chk.checked = !!cfg.autoPilot;
      var selBank = document.getElementById('auto-config-grace-bank');
      if (selBank) selBank.value = String(cfg.gracePeriodBankTransfer || 3);
      var selCard = document.getElementById('auto-config-grace-card');
      if (selCard) selCard.value = String(cfg.gracePeriodCard || 1);

      window.updateAutomationUIIndicator();
      m.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    window.closeAutomationRulesModal = function () {
      var m = document.getElementById('modal-billing-automation');
      if (m) m.style.display = 'none';
      document.body.style.overflow = '';
    };

    window.toggleAutoPilotMode = function (enabled) {
      if (!window.BILLING_AUTOMATION_CONFIG) window.BILLING_AUTOMATION_CONFIG = {};
      window.BILLING_AUTOMATION_CONFIG.autoPilot = !!enabled;
      window.updateAutomationUIIndicator();
      window.applyAndRecalculateAutomation(true);
    };

    window.updateAutomationParams = function () {
      if (!window.BILLING_AUTOMATION_CONFIG) window.BILLING_AUTOMATION_CONFIG = {};
      var selBank = document.getElementById('auto-config-grace-bank');
      if (selBank) window.BILLING_AUTOMATION_CONFIG.gracePeriodBankTransfer = parseInt(selBank.value, 10);
      var selCard = document.getElementById('auto-config-grace-card');
      if (selCard) window.BILLING_AUTOMATION_CONFIG.gracePeriodCard = parseInt(selCard.value, 10);
      window.updateAutomationUIIndicator();
    };

    window.updateAutomationUIIndicator = function () {
      var cfg = window.BILLING_AUTOMATION_CONFIG || { autoPilot: true, gracePeriodBankTransfer: 3 };
      var btnTxt = document.getElementById('auto-pilot-status-text');
      var dot = document.getElementById('auto-pilot-indicator');
      var btn = document.getElementById('btn-toggle-automation-policy');
      var slider = document.getElementById('auto-pilot-slider');
      var knob = document.getElementById('auto-pilot-knob');

      if (slider && knob) {
        slider.style.background = cfg.autoPilot ? '#22c55e' : '#cbd5e1';
        knob.style.left = cfg.autoPilot ? '22px' : '3px';
      }

      if (btnTxt) {
        btnTxt.textContent = cfg.autoPilot
          ? ('BẬT (Net-' + (cfg.gracePeriodBankTransfer || 3) + ')')
          : 'TẮT (Cố định)';
      }
      if (dot) {
        dot.style.background = cfg.autoPilot ? '#22c55e' : '#94a3b8';
        dot.style.boxShadow = cfg.autoPilot ? '0 0 6px #22c55e' : 'none';
      }
      if (btn) {
        btn.style.background = cfg.autoPilot ? '#f0fdf4' : '#f8fafc';
        btn.style.borderColor = cfg.autoPilot ? '#bbf7d0' : '#cbd5e1';
        btn.style.color = cfg.autoPilot ? '#166534' : '#64748b';
      }
    };

    window.applyAndRecalculateAutomation = function (silent) {
      window.updateAutomationParams();
      if (!silent) window.closeAutomationRulesModal();

      var cfg = window.BILLING_AUTOMATION_CONFIG;
      if (typeof window.applyDashboardMetrics === 'function') window.applyDashboardMetrics();
      if (typeof window.renderInteractiveRevenueChart === 'function') window.renderInteractiveRevenueChart();
      if (typeof window.renderDailyCashflowDashboard === 'function') window.renderDailyCashflowDashboard();
      if (typeof window.renderDashMainContractsTable === 'function') window.renderDashMainContractsTable();
      if (typeof window.renderDummyContractsTable === 'function') window.renderDummyContractsTable();

      if (!silent && typeof window.showAdminToast === 'function') {
        window.showAdminToast('Đã kích hoạt hệ thống tự động hóa: Ân hạn Chuyển khoản Net-' + (cfg.gracePeriodBankTransfer || 3) + ' ngày!', 'success');
      }
    };

    function initDashboardLogic() {
      if (typeof window.initRealTimeDashboard === 'function') {
        window.initRealTimeDashboard();
      }
      if (typeof window.updateAutomationUIIndicator === 'function') {
        window.updateAutomationUIIndicator();
      }
      var periodSelect = document.getElementById('vb-period-select');
      if (periodSelect) {
        periodSelect.addEventListener('change', function (e) {
          changeDashboardPeriod(e.target.value);
        });
      }
      var demoDaySelect = document.getElementById('vb-demo-day-select');
      if (demoDaySelect && window.currentDemoCheckpoint) {
        demoDaySelect.value = window.currentDemoCheckpoint;
      }
      if (typeof window.applyDashboardMetrics === "function") window.applyDashboardMetrics();
      if (typeof window.renderDailyCashflowDashboard === "function") window.renderDailyCashflowDashboard();
      if (typeof window.renderInteractiveRevenueChart === "function") window.renderInteractiveRevenueChart();
      if (typeof window.renderNewSignupsSection === "function") window.renderNewSignupsSection();
      if (typeof window.renderDashMainContractsTable === "function") window.renderDashMainContractsTable();
      if (typeof window.renderDashboardOperations === "function") window.renderDashboardOperations();
      if (typeof window.renderDummyContractsTable === "function") window.renderDummyContractsTable();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDashboardLogic);
    } else {
      initDashboardLogic();
    }
