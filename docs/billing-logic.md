# Logic thanh toán (Billing) — E-Mind Platform

Tài liệu mô tả cách tính tiền, chu kỳ chốt sổ, dùng thử, giảm giá và
quy tắc thêm/xóa/thay thành viên. Mục tiêu: ai đọc cũng hình dung được
tiền bị trừ **khi nào** và **bao nhiêu**.

---

## 1. Các khái niệm cốt lõi

| Khái niệm | Ý nghĩa |
|---|---|
| **Ngày đăng ký** | Ngày user bắt đầu bản dùng thử. |
| **Dùng thử (Trial)** | **14 ngày** miễn phí, cố định cho mọi user. |
| **Ngày neo (Anchor day)** | Ngày kết thúc trial + 1. Đây là ngày chốt hóa đơn & trừ tiền, **lặp lại hàng tháng**. |
| **Chu kỳ (Billing cycle)** | Một tháng dịch vụ, chạy từ ngày neo tháng này → (ngày neo tháng sau − 1). |
| **Ghế (Seat)** | Đơn vị tính phí. Công ty trả tiền theo **số ghế**, không theo từng người cụ thể. Một ghế có thể đổi người ngồi. |
| **Discount tháng đầu** | Giảm giá **chỉ áp cho tháng tính phí đầu tiên** (tháng ngay sau trial). |
| **Kỳ thanh toán (支払いサイクル)** | Khách chọn trả trước theo **tháng / 6 tháng / 1 năm**. Kỳ càng dài, đơn giá càng rẻ. |
| **Ưu đãi kỳ hạn (期間割引)** | % giảm trên đơn giá/ghế/tháng khi trả trước dài hạn. Mặc định 6 tháng **6%**, năm **15%** — **cấu hình được** trong プランマスタ. |
| **Đơn giá hiệu dụng** | = đơn giá tháng gốc × (1 − ưu đãi kỳ hạn). Là đơn giá thực tế dùng để tính tiền cho gói trả trước. |
| **カタログ単価 (giá catalog)** | Giá niêm yết của plan trong プランマスタ. |
| **契約単価 (giá hợp đồng)** | Giá thực đang tính cho **từng công ty/user**; chốt lúc đăng ký, có thể **override** để cho giá nego riêng. Mọi ưu đãi tính trên giá này. |

> **Nguyên tắc vàng:** ngày neo cố định theo **hợp đồng / tài khoản thanh
> toán** (công ty với gói doanh nghiệp, hoặc cá nhân với gói cá nhân) —
> **không** phải theo từng member. Trong một công ty, tất cả member/ghế
> dùng **chung một** ngày neo. Mỗi hợp đồng có "ngày trừ tiền" riêng, không
> dồn về cuối tháng. Nhờ vậy **không bao giờ phát sinh khoảng ngày lẻ** ở
> tháng đầu → không cần prorate cho discount.

### Ba mốc ngày trong một chu kỳ

Ví dụ ngày neo = 24, chu kỳ 24/6 → 23/7:

| Thuật ngữ (JP) | Là ngày nào | Ý nghĩa |
|---|---|---|
| **締め日** (ngày chốt sổ) | **23** (cuối chu kỳ) | Khóa mọi thay đổi add/remove/đổi ghế trong tháng. |
| **請求確定日** (ngày chốt hóa đơn) | **24** (= ngày neo) | Số tiền được xác định xong (gồm cả phần lẻ trả sau) → hóa đơn "確定". |
| **引き落とし日** (ngày trừ thẻ) | **24** | Trừ tiền vào thẻ. Mặc định trùng với 請求確定日. |

> Nếu sau này muốn tách **引き落とし日** ra trễ hơn (VD chốt hóa đơn ngày
> 24 nhưng ngày 27 mới trừ thẻ), chỉ cần thêm độ trễ N ngày sau 請求確定日.

---

## 2. Vòng đời một tài khoản mới

**Ví dụ:** đăng ký ngày **10/6**.

```
   6月                               7月                          8月
   │                                 │                            │
10/6 ─────────── 23/6 │ 24/6 ─────────────── 23/7 │ 24/7 ───────────── 23/8 │ ...
   ▲                ▲   │        ▲                   │        ▲                │
   │                │   │        │                   │        │                │
 Đăng ký       Trial hết │  ⭐ THÁNG 1 (DISCOUNT)     │   THÁNG 2 (giá full)     │
 Bắt đầu       (14 ngày) │  Trừ tiền: 24/6           │   Trừ tiền: 24/7         │
 trial                   │                           │                          │
                     ▲ Ngày neo = 24 (lặp lại mỗi tháng)
```

| Mốc | Ngày | Ghi chú |
|---|---|---|
| Đăng ký (bắt đầu trial) | 10/6 | Miễn phí |
| Trial kết thúc | 23/6 | Đủ 14 ngày |
| **Ngày neo (請求確定日)** | **24** | Ngày chốt hóa đơn & trừ tiền hàng tháng |
| Tháng 1 (có discount) | 24/6 → 23/7 | Trừ tiền vào **24/6** |
| Tháng 2 (giá full) | 24/7 → 23/8 | Trừ tiền vào **24/7** |
| Tháng 3, 4, … | lặp lại | Trừ tiền vào **24** hàng tháng |

---

## 3. Trial + Discount kết hợp thế nào

- Trong 14 ngày trial: **miễn phí hoàn toàn** (0đ). Không áp discount ở
  đây vì đang free rồi.
- Discount **chỉ rơi vào Tháng 1** (tháng tính phí đầu tiên, ngay sau
  trial), và Tháng 1 luôn là **một tháng trọn vẹn** → discount áp trên
  số tiền tròn, không dính ngày lẻ.
- Từ Tháng 2 trở đi: tính giá đầy đủ.

> Đây là lý do chọn "ngày neo = ngày kết thúc trial" thay vì chốt sổ cuối
> tháng: nếu chốt cuối tháng thì Tháng 1 sẽ có một khúc ngày lẻ, phải vừa
> prorate vừa discount cùng lúc — rắc rối và dễ sai.

---

## 4. Kỳ thanh toán trả trước (6 tháng / 1 năm) & ưu đãi kỳ hạn

Ngoài trả **hàng tháng**, khách có thể **trả trước một lần** cho **6 tháng** hoặc
**1 năm** để hưởng **giá ưu đãi hơn**. Ưu đãi giảm thẳng vào **đơn giá/ghế/tháng**.

### 4.1. Các lựa chọn & mức ưu đãi (cấu hình được)

| Kỳ thanh toán (JP) | Số tháng | Ưu đãi mặc định | Ghi chú |
|---|---|---|---|
| 月払い (hàng tháng) | 1 | 0% | Như hiện tại, trừ tiền mỗi ngày neo hàng tháng. |
| 半年払い (6 tháng) | 6 | **6%** | Trả trước 1 lần cho 6 tháng. |
| 年払い (1 năm) | 12 | **15%** | Trả trước 1 lần cho 12 tháng. |

> ⚙️ **Mức ưu đãi là tham số cấu hình** trong **プランマスタ (Plan Master)**, chỉnh
> được theo từng plan (giống ô 初月割引率 hiện có). Con số 6% / 15% chỉ là mặc định
> gợi ý — admin đổi lúc nào cũng được.

### 4.2. Công thức giá & ví dụ

```
đơn giá hiệu dụng = đơn giá tháng gốc × (1 − ưu đãi kỳ hạn)
tổng trả trước    = đơn giá hiệu dụng × số ghế × số tháng của kỳ
```

Ví dụ **¥3.000/ghế/tháng**, **10 ghế**:

| Kỳ | Đơn giá hiệu dụng | Cách tính | Trả 1 lần |
|---|---|---|---|
| Hàng tháng | ¥3.000 | 3.000 × 10 | **¥30.000 / tháng** |
| 6 tháng (−6%) | ¥2.820 | 2.820 × 10 × 6 | **¥169.200** |
| 1 năm (−15%) | ¥2.550 | 2.550 × 10 × 12 | **¥306.000** |

> So với trả tháng suốt 1 năm (¥360.000), gói năm tiết kiệm **¥54.000**.

### 4.3. Ngày neo & chu kỳ khi trả trước

- **Ngày neo (請求確定日) giữ nguyên** = ngày kết thúc trial + 1.
- **Độ dài chu kỳ = độ dài kỳ đã chọn** (1 / 6 / 12 tháng). Ngày trừ tiền kế tiếp
  (gia hạn) = ngày neo + N tháng; 締め日 = hôm trước.
- Quy ước ngày 29/30/31 → lùi cuối tháng vẫn áp dụng khi cộng N tháng (xem mục 10).

Ví dụ đăng ký 10/6, gói **năm**, ngày neo = 24:

```
24/6/2026 ───────────────── 23/6/2027 │ 24/6/2027 ── ...
   ▲ trả trước trọn 1 năm (¥306.000)      ▲ gia hạn (nếu auto-renew ON)
   │←──────── 1 chu kỳ = 12 tháng ───────→│
```

### 4.4. Thêm ghế giữa kỳ — thu ngay, prorate đến hết kỳ

Vì kỳ có thể dài tới 1 năm, ghế thêm **không đợi tới ngày neo** mà **thu ngay** phần
còn lại của kỳ:

```
đơn giá 1 ngày (theo kỳ) = (đơn giá hiệu dụng × số tháng kỳ) ÷ tổng số ngày thực tế của kỳ
tiền ghế thêm            = đơn giá 1 ngày × số ngày còn lại (ngày thêm → hết kỳ) × số ghế thêm
```

- Ghế mới **đồng bộ ngày hết hạn** với kỳ hiện tại (cùng gia hạn 1 lần).
- Dùng đơn giá **đã giảm của kỳ** (ghế thêm cũng hưởng ưu đãi kỳ hạn).
- Nếu vừa vô hiệu 1 ghế khác → ghế trống dùng lại **miễn phí**, chỉ phần ghế **vượt
  P** mới bị tính (giữ nguyên triết lý seat-based ở mục 5).

**Ví dụ:** gói năm, đơn giá hiệu dụng ¥2.550/ghế/tháng, kỳ 24/6/2026→23/6/2027
(365 ngày). Thêm **1 ghế** khi còn **273 ngày**:

- Tiền 1 ghế/kỳ = 2.550 × 12 = ¥30.600
- Đơn giá ngày = 30.600 ÷ 365 ≈ ¥83,8
- Thu ngay = 83,8 × 273 ≈ **¥22.887** (làm tròn xuống)

### 4.5. Bớt ghế / thay người giữa kỳ

- **Không hoàn tiền** (như cũ). Ghế đã trả **dùng/tái sử dụng miễn phí đến hết kỳ**
  — với gói năm là tới cả năm.
- **Thay người (swap)** số ghế không đổi → **không phát sinh phí**; người mới ngồi
  ghế đã trả tới hết kỳ.
- Kỳ **gia hạn** mới giảm số ghế theo thực tế.

### 4.6. Đổi plan / đổi kỳ giữa chừng

- **Nâng plan (VD Standard→Pro), giữ nguyên kỳ:** thu **chênh lệch** đơn giá,
  prorate cho số ngày còn lại của kỳ (theo đơn giá hiệu dụng của kỳ), áp dụng ngay;
  ngày hết hạn kỳ **không đổi**.
- **Hạ plan / đổi sang kỳ ngắn hơn:** áp dụng **từ kỳ kế tiếp** (không hoàn tiền
  phần đang chạy).
- **Đổi sang kỳ dài hơn (VD tháng→năm) giữa chừng:** coi như **bắt đầu kỳ mới** từ
  ngày đổi (mua trọn kỳ mới); ngày neo mới = ngày đổi.

### 4.7. Gia hạn cuối kỳ

- **Auto-renew ON:** đến ngày neo cuối kỳ, tự thu **trọn kỳ kế tiếp** (cùng độ dài)
  theo **giá kỳ hiện hành**. **Không** áp lại discount đăng ký/tháng đầu.
- **Auto-renew OFF:** hết kỳ → chuyển **Free** (giữ data), khôi phục bằng cách mua
  lại kỳ mới.

### 4.8. Hủy gói trả trước

- **Không hoàn tiền.** Khách vẫn dùng **đến hết kỳ đã trả** (có thể còn nhiều tháng),
  sau đó tự chuyển **Free**.

### 4.9. Quan hệ với discount tháng đầu (初月割引)

- Gói trả trước **chỉ dùng ưu đãi kỳ hạn**, **không cộng dồn** với discount tháng
  đầu → tránh giảm giá chồng chéo và tính toán rối.
- Discount tháng đầu vẫn áp cho **gói trả hàng tháng** như hiện tại.

### 4.10. Thanh toán thất bại ở kỳ gia hạn

- Trong kỳ đã trả trước **không có** trừ tiền định kỳ → **không phát sinh dunning
  giữa kỳ** (trừ khoản add-on thu ngay khi thêm ghế).
- Ở **kỳ gia hạn**, nếu thẻ bị từ chối → áp dụng grace 7 ngày → hạ Free như mục 13.

---

## 5. Mô hình tính phí theo GHẾ (seat), không theo người

Đây là nguyên tắc nền cho toàn bộ phần thêm/xóa/thay thành viên.

- Công ty trả tiền cho **N ghế** mỗi chu kỳ (trả trước vào ngày neo).
- Gọi **P = số ghế đã trả tiền** cho chu kỳ hiện tại.
- **Chỉ tính thêm tiền khi số ghế active vượt quá P.** Phần vượt được
  prorate theo ngày.
- Vô hiệu hóa (disable) một người = **ghế đó vẫn còn (đã trả rồi)** →
  ghế trống này được **tái sử dụng miễn phí đến hết chu kỳ**.
- Việc "ai ngồi ghế nào" do công ty tự quản lý, **không ảnh hưởng tới
  số tiền** miễn là tổng số ghế active không vượt P.

> Đây cũng là cách đa số SaaS seat-based (GitHub, Figma…) áp dụng: bán
> **"ghế"** chứ không phải "người có tên" → xử lý gọn việc thay người.

---

## 6. Thêm thành viên (Add member) — làm **tăng** số ghế

**Quy tắc:** khi thêm người làm **số ghế active vượt P**, phần ghế tăng
thêm **chưa trừ tiền ngay**. Đến ngày neo kế tiếp mới gộp trừ, gồm 2 phần:

1. **Phần lẻ của tháng đang chạy** (từ ngày thêm → hết chu kỳ) — tính theo
   ngày, **trả sau**.
2. **Trọn tháng kế tiếp** — **trả trước**.

**Ví dụ:** giá **¥3.000/ghế/tháng**. Ngày neo = 24. Chu kỳ hiện tại
24/6 → 23/7 (**30 ngày**) → đơn giá lẻ = 3.000 ÷ 30 = **¥100/ngày**.
Thêm **1 ghế mới** (tăng thật, không ai bị disable) vào **4/7**.

```
24/6 ───────────── 4/7 ─────────── 23/7 │ 24/7 ─────────────── 23/8
                     ▲                    │
              Thêm 1 ghế mới          Ngày neo 24/7
              (dùng ngay,            → GỘP TRỪ tại đây
               chưa trừ tiền)
              │←── 20 ngày lẻ ──→│←──── trọn tháng kế ────→│
                 (trả sau)              (trả trước)
```

| Khoản | Cách tính | Tiền |
|---|---|---|
| Phần lẻ 4/7 → 23/7 (20 ngày) — trả sau | 20 × ¥100 | ¥2.000 |
| Trọn tháng kế 24/7 → 23/8 — trả trước | 1 tháng | ¥3.000 |
| **Trừ vào ngày 24/7** | | **¥5.000** |

Từ tháng sau nữa, ghế này chỉ còn **¥3.000/tháng** như bình thường.

---

## 7. Xóa / vô hiệu hóa thành viên (Remove) — làm **giảm** số ghế

**Quy tắc:** **không hoàn tiền**. Ghế vẫn dùng được đến **hết chu kỳ
hiện tại**, sau đó không tính phí nữa (chu kỳ sau giảm số ghế).

**Ví dụ:** xóa 1 ghế vào **10/7** (đang trong chu kỳ 24/6 → 23/7, đã
trả trước tới 23/7 từ ngày 24/6).

```
24/6 ─────────── 10/7 ─────────── 23/7 │ 24/7 ──────────────
                   ▲                    │
              Xóa ghế              Ngày neo 24/7
              (vẫn dùng tới 23/7)  → chu kỳ sau KHÔNG tính ghế này
              │← đã trả, không hoàn →│
```

- Không có dòng hoàn tiền cho khoảng 10/7 → 23/7 (đã trả, coi như dùng hết).
- Từ 24/7, số ghế tính phí giảm đi tương ứng.

---

## 8. Thay người giữa kỳ (Swap) — disable người cũ + add người mới

Đây là tình huống hay gặp: giữa chừng chu kỳ, công ty **vô hiệu hóa
người cũ** và **thêm người mới**. Vì tính theo **ghế**, ta so sánh
**tổng số ghế active** trước/sau, **không** tính riêng từng người.

**Nguyên tắc:** chỉ phần **ghế vượt P** mới bị tính thêm. Ghế do người
cũ để trống (đã trả) được người mới dùng lại **miễn phí đến hết chu kỳ**.

| Tình huống | Thay đổi số ghế | Ngày neo kế tiếp tính gì |
|---|---|---|
| Disable 1 + add 1 | **Không đổi** | **Không tính thêm** đồng nào chu kỳ này. Người mới ngồi ghế đã trả. Chu kỳ sau giữ nguyên. |
| Disable 1 + add 2 | **+1 ghế** | 1 người ngồi ghế trống (miễn phí phần còn lại); **chỉ 1 ghế dôi ra** bị prorate (ngày dùng) + trọn tháng kế. |
| Disable 2 + add 1 | **−1 ghế** | Không hoàn tiền chu kỳ này; **chu kỳ sau** giảm 1 ghế. |

**Ví dụ (swap 1-1):** ¥3.000/ghế, ngày neo 24, chu kỳ 24/6→23/7. Ngày
**4/7** disable A, add B.

```
24/6 ───────────── 4/7 ─────────── 23/7 │ 24/7 ──────────
                     ▲                    │
            Disable A + Add B         Ngày neo 24/7
            (số ghế KHÔNG đổi)        → KHÔNG tính thêm.
            B dùng lại ghế đã trả của A     Chu kỳ sau như cũ.
            (miễn phí tới 23/7)
```

→ **Không** áp máy móc "A không hoàn + B prorate" (sẽ khiến công ty trả
trùng 20 ngày cho cùng một ghế). Vì số ghế không tăng nên **không phát
sinh phí mới**.

> **Thời điểm đánh giá:** chốt ở **締め日 (ngày 23)**, tính prorate cho
> **phần ghế vượt P trong chu kỳ**. Nếu add trước rồi vài ngày sau mới
> disable, vẫn coi là swap (không phạt thao tác trung gian) — đo theo
> **net cuối chu kỳ**.

---

## 9. Công thức prorate (tính theo ngày)

```
đơn giá lẻ 1 ngày = giá tháng ÷ (số ngày thực tế của ĐÚNG chu kỳ đó)

tiền phần lẻ = đơn giá lẻ × số ngày sử dụng thực tế trong chu kỳ
```

⚠️ **Quan trọng:** số ngày mỗi chu kỳ **thay đổi theo tháng**:

| Chu kỳ | Số ngày |
|---|---|
| 24/6 → 23/7 | 30 |
| 24/7 → 23/8 | 31 |
| 24/1 → 23/2 | 30 (hoặc 31 tùy năm nhuận) |

→ Luôn lấy **số ngày thực tế của chính chu kỳ đang tính**, không hardcode 30.

---

## 10. Trường hợp đặc biệt: ngày neo là 29 / 30 / 31

Nếu trial kết thúc khiến ngày neo rơi vào 29, 30 hoặc 31, sẽ có tháng
không tồn tại ngày đó (VD: neo 31 thì tháng 2 không có ngày 31).

**Quy ước:** lùi về **ngày cuối cùng của tháng đó**.

| Ngày neo | Tháng 2 (28 ngày) | Tháng 4 (30 ngày) |
|---|---|---|
| 31 | chốt 28/2 | chốt 30/4 |
| 30 | chốt 28/2 | chốt 30/4 |

---

## 11. TRường hợp thêm , huỷ gói

**❓ Khi hủy gói**
- Bạn vẫn dùng được dịch vụ **đến hết chu kỳ đã thanh toán**.
- **Không hoàn lại** phí cho phần thời gian chưa dùng.
- Sau khi hết chu kỳ, gói tự động dừng, **không bị trừ thêm**.

**➕ Khi thêm thành viên**
- Thành viên mới **dùng được ngay**.
- **Không bị trừ tiền ngay lúc thêm.** Vào kỳ thanh toán kế tiếp mới tính
  gộp: phí **số ngày đã dùng** của tháng hiện tại (chia theo ngày)
  **+ phí trọn tháng tiếp theo**.
- Nếu bạn vừa vô hiệu hóa một thành viên khác, **ghế trống đó được dùng
  lại miễn phí** — chỉ khi tổng số ghế tăng lên mới phát sinh phí.

**➖ Khi bớt thành viên**
- **Không hoàn tiền.**
- Thành viên đó vẫn **dùng được đến hết chu kỳ hiện tại**.
- **Từ kỳ sau** không tính phí cho thành viên này nữa.

---

## 12. Đổi giá plan (料金改定) — quản lý & áp dụng

Tách rõ **2 loại giá** (xem mục 1):

- **カタログ単価 (giá catalog):** giá niêm yết của plan trong プランマスタ.
- **契約単価 (giá hợp đồng):** giá thực đang tính cho từng công ty/user; **chốt tại
  lúc đăng ký** = giá catalog thời điểm đó, có thể **override** để cho giá nego riêng.
  Ưu đãi kỳ hạn & discount tháng đầu đều tính trên **契約単価**, không phải catalog.

> **Đổi giá catalog KHÔNG tự động sửa 契約単価 của khách đang dùng.** Việc chuyển sang
> giá mới đi theo quy tắc dưới đây → tránh vô tình tăng giá hàng loạt gây khiếu nại.

### 12.1. Phiên bản hóa & lịch sử (料金改定履歴)

Mỗi lần đổi giá tạo 1 phiên bản: `{đơn giá mới, ngày hiệu lực (適用日), lý do, người
sửa, thời điểm}`; giá cũ được giữ trong lịch sử. Dùng chung mô hình **編集 (sửa nhầm,
không lưu lịch sử) vs 改定/更新 (đổi giá thật, lưu lịch sử)** như phần ライセンス.

### 12.2. Ngày hiệu lực (適用日)

- Admin đặt **適用日** khi tạo lần đổi giá; giá mới chỉ kích hoạt vào ngày đó (đặt
  lịch trước được).
- 適用日 tách rời ngày thao tác sửa.

### 12.3. TĂNG giá — migrate từ kỳ kế + thông báo 30 ngày

- **Thông báo trước ≥ 30 ngày** (email + banner) trước 適用日 cho mọi khách bị ảnh hưởng.
- Áp theo **kỳ kế tiếp** của từng hợp đồng, **không đổi giá giữa kỳ**:
  - **Trả tháng:** từ ngày neo kế tiếp sau 適用日 (và sau khi đủ 30 ngày thông báo).
  - **Trả trước 6th/năm:** giữ giá cũ đến hết kỳ đã trả, áp giá mới **khi gia hạn**.
- Khách đăng ký mới từ 適用日: dùng giá mới ngay.

### 12.4. GIẢM giá — cũng áp từ kỳ kế tiếp

- Xử lý **giống tăng giá về thời điểm**: chỉ áp từ **chu kỳ/gia hạn kế tiếp**, không
  đổi giữa kỳ (nhất quán kỹ thuật, tránh prorate ngược giữa chừng).
- Không bắt buộc 30 ngày thông báo (giảm giá không bất lợi cho khách), nhưng nên báo.

### 12.5. Ai áp giá mới, khi nào (tổng hợp)

| Đối tượng | Thời điểm áp giá mới |
|---|---|
| Đăng ký mới | Ngay từ 適用日 |
| Đang trial | Khi bắt đầu tính phí (sau trial), theo giá hiệu lực lúc đó |
| Trả hàng tháng | Ngày neo kế tiếp sau 適用日 (+ đủ 30 ngày thông báo nếu tăng) |
| Trả trước 6th/năm | Khi gia hạn (khóa giá đến hết kỳ đã trả) |
| Free / đang nợ | Khi quay lại Paid = giá hiện hành |
| Có 契約単価 nego riêng | **Không đổi** — phải sửa thủ công từng hợp đồng |

> Hợp đồng đang gán **giá nego riêng (契約単価 override)** không bị cuốn theo đổi giá
> catalog; muốn đổi thì admin sửa riêng hợp đồng đó.

### 12.6. Tương tác với ưu đãi

- **Ưu đãi kỳ hạn (6%/15%)** và **discount tháng đầu** luôn tính trên **契約単価 đang
  áp tại kỳ đó**. Sang kỳ mới đổi giá → ưu đãi kỳ hạn tính lại trên giá mới.

### 12.7. Ghi chú triển khai

- **Stripe:** mỗi mức giá = 1 **Price** mới trên cùng **Product**; đổi giá = tạo Price
  mới + đặt lịch áp ở kỳ gia hạn (subscription schedule), giữ Price cũ cho khách chưa
  tới kỳ.
- **Prototype hiện tại:** プランマスタ đang cho sửa trực tiếp ô giá (ghi đè, không lịch
  sử) → cần thêm **適用日 + lý do + lịch sử改定** để khớp logic này.

---

## 13. Thanh toán thất bại (dunning) → hạ Free → khôi phục

Khi thẻ bị từ chối vào **ngày neo (請求確定日)**, hệ thống **không khóa
ngay**: retry + nhắc trong thời gian ân hạn; hết ân hạn vẫn chưa trả thì
**hạ xuống Free** (giữ nguyên data), chỉ khôi phục bản Paid khi user
thanh toán khoản nợ.

### Các mốc & trạng thái

```
 24        26    28    31 (24+7)
 │─────────│─────│──────│──────────────────────────────
 ▲         ▲     ▲      ▲
Lần 1 fail retry  retry  Hết ân hạn → HẠ FREE (giữ data)
│←── Grace 7 ngày: vẫn dùng Paid, banner + email nhắc ──→│
```

| Trạng thái (JP) | Khi nào | Dịch vụ |
|---|---|---|
| **正常 (active)** | Thanh toán OK | Bình thường |
| **支払い遅延 (past due)** | Fail, trong ân hạn **7 ngày** | Vẫn dùng Paid đầy đủ + banner/email nhắc |
| **Free (降格)** | Hết ân hạn chưa trả | Hạ Free, **giữ data**; ghế/data vượt hạn mức Free bị **khóa read-only** |

Retry tự động: lần 1 vào ngày neo, sau đó +2, +4, +7 ngày (hoặc để
Stripe **Smart Retries** tự tối ưu).

### Khoản nợ (未払い)

- = **số ngày đã thực dùng Paid trong grace mà chưa trả**, prorate theo
  ngày (không tính trọn tháng, vì sau khi hạ Free không còn dùng Paid).
- Nợ chỉ được **thu khi user quay lại Paid**. Nếu ở Free luôn → nợ treo,
  **không đòi độc lập**.

### Khôi phục — đi qua luồng プラン変更 (đổi gói)

1. Ở Free, user bấm **プラン変更**, chọn gói Paid muốn dùng.
2. Màn thanh toán hiện **itemize**: nợ kỳ trước **+** gói mới tháng đầu → tổng.
3. Khoản nợ là **dòng bắt buộc** — không hoàn tất đổi gói nếu chưa gồm nợ.
4. Trả **một lần** (nhập/đổi thẻ ngay tại màn này) → **xóa nợ + kích hoạt
   Paid ngay + data khôi phục nguyên vẹn**.
5. **Ngày neo mới = ngày thanh toán** (bắt đầu chu kỳ mới, thu trọn 1
   tháng trả trước).
6. **Discount tháng đầu KHÔNG áp lại** (đã dùng ở lần đăng ký đầu) → giá full.
7. Thông báo: email + banner「お支払いを確認しました。プランを再開しました。次回請求日は ○/○ です。」

### Ví dụ số

Fail **24/7** → grace 7 ngày → hạ Free **31/7**, nợ = 7 ngày (24/7–30/7)
× ¥100 = **¥700**. Ngày **10/8** user vào プラン変更 chọn lại Pro:

| Dòng trong checkout | Tiền |
|---|---|
| 未払い分 (24/7–30/7, 7 ngày) | ¥700 |
| プロプラン tháng đầu (10/8 → 9/9) | ¥3.000 |
| **合計 (trả một lần)** | **¥3.700** |

→ Mở lại Pro ngay, **ngày neo mới = 10**, kỳ kế tiếp **10/9**.

### Ghi chú triển khai

- Với Stripe: trạng thái `past_due` → `unpaid`; Smart Retries + email
  nhắc tự động; hóa đơn nợ giữ dạng **open**, gộp vào checkout khi đổi gói.
- Cần định nghĩa **hạn mức ghế / project của bản Free** (prototype chưa rõ).

---

## 14. Tóm tắt nhanh

- Trial **14 ngày** cố định, công bằng cho mọi user.
- **Ngày neo (請求確定日)** = ngày kết thúc trial + 1 → chốt hóa đơn &
  trừ tiền vào ngày này **hàng tháng**. 締め日 = hôm trước (ngày neo − 1).
- **Discount** chỉ áp Tháng 1 (luôn là tháng trọn) → không dính ngày lẻ.
- **Trả trước 6 tháng / 1 năm** → **ưu đãi kỳ hạn** (mặc định 6% / 15%, cấu hình
  trong プランマスタ), giảm thẳng đơn giá/ghế/tháng; **không cộng dồn** discount tháng đầu.
- **Gói trả trước:** thêm ghế = **thu ngay** prorate đến hết kỳ; bớt ghế/hủy =
  **không hoàn tiền**, dùng đến hết kỳ; gia hạn thu trọn kỳ kế theo giá hiện hành.
- **Đổi giá plan:** tách **カタログ単価** vs **契約単価** (nego riêng chốt theo hợp
  đồng); tăng & giảm giá đều áp **từ kỳ kế tiếp**, tăng giá **báo trước 30 ngày**;
  gói trả trước khóa giá đến hết kỳ. Mỗi lần đổi lưu **lịch sử改定 + 適用日**.
- **Tính theo GHẾ, không theo người.** Chỉ tính thêm khi số ghế active
  vượt số ghế đã trả (P).
- **Add (tăng ghế):** trả sau phần lẻ tháng đang chạy + trả trước tháng
  kế, gộp trừ vào ngày neo.
- **Remove (giảm ghế):** không hoàn tiền, dùng hết chu kỳ; chu kỳ sau
  giảm ghế.
- **Swap (thay người, ghế không đổi):** không phát sinh phí mới.
- **Thanh toán thất bại:** grace 7 ngày (vẫn Paid) → hạ **Free** (giữ
  data) → khôi phục bằng cách **đổi gói + trả gộp nợ** trong một lần
  checkout; ngày neo mới = ngày trả.
- **Prorate:** chia theo số ngày thực tế của chính chu kỳ đó.
