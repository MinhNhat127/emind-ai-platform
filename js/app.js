// ===== CHAT DATA (per-project) =====
    const avatarColors = ['', 'green', 'purple', 'orange', 'blue'];
    const projectMembers = {
      'PRJ-001': [
        { id: 'm1', name: '田中 一郎', short: '田中', color: '' },
        { id: 'm2', name: '山田 次郎', short: '山田', color: 'green' },
        { id: 'm3', name: '佐藤 花子', short: '佐藤', color: 'purple' },
        { id: 'm4', name: '鈴木 三郎', short: '鈴木', color: 'orange' },
        { id: 'm5', name: '伊藤 四郎', short: '伊藤', color: 'blue' },
      ],
      'PRJ-002': [
        { id: 'm6', name: '中村 五郎', short: '中村', color: '' },
        { id: 'm7', name: '小林 六子', short: '小林', color: 'green' },
        { id: 'm8', name: '加藤 七美', short: '加藤', color: 'purple' },
      ],
      'PRJ-003': [
        { id: 'm9', name: '渡辺 八郎', short: '渡辺', color: '' },
        { id: 'm10', name: '松本 九子', short: '松本', color: 'green' },
        { id: 'm11', name: '木村 十郎', short: '木村', color: 'orange' },
        { id: 'm12', name: '林 一美', short: '林', color: 'blue' },
      ],
      'PRJ-004': [
        { id: 'm13', name: '斎藤 二郎', short: '斎藤', color: '' },
        { id: 'm14', name: '清水 三子', short: '清水', color: 'purple' },
      ],
      'PRJ-005': [
        { id: 'm15', name: '山口 四郎', short: '山口', color: '' },
        { id: 'm16', name: '池田 五子', short: '池田', color: 'green' },
        { id: 'm17', name: '橋本 六郎', short: '橋本', color: 'orange' },
      ],
    };

    const chatData = {
      'PRJ-001': {
        rooms: [
          {
            id: 'PRJ-001-r1', name: '全体連絡', type: 'public', desc: '案件全体の連絡事項',
            unread: 2,
            members: ['m1', 'm2', 'm3', 'm4', 'm5'],
            messages: [
              { sender: 'm3', text: '部品が無事入庫しました。検品作業を開始します。', time: '09:15' },
              { sender: 'm2', text: '設置作業は予定通り進んでいます。午後から配線に入ります！', time: '10:32' },
              { sender: 'm4', text: '検査シートを共有しました。📎 検査チェックシート_v2.pdf', time: '11:05' },
              { sender: 'me', text: 'ありがとうございます！確認しました。引き続きよろしくお願いします。', time: '11:20' },
              { sender: 'm2', text: '配線完了しました。動作確認をお願いできますか？', time: '14:48' },
            ]
          },
          {
            id: 'PRJ-001-r2', name: '設計チーム', type: 'private', desc: '設計担当者専用',
            unread: 3,
            members: ['m1', 'm2', 'm3'],
            messages: [
              { sender: 'm2', text: '図面のv3を共有しました。変更点を確認してください。', time: '08:30' },
              { sender: 'me', text: '確認します。レビュー後にコメントします。', time: '08:45' },
              { sender: 'm3', text: '部品リストとの整合性もチェックしましょう。', time: '09:00' },
            ]
          },
          {
            id: 'PRJ-001-r3', name: '調達・納期管理', type: 'private', desc: '調達担当者専用グループ',
            unread: 0,
            members: ['m1', 'm3', 'm4'],
            messages: [
              { sender: 'm3', text: '納期変更の件、メーカーから連絡が来ました。', time: '13:00' },
              { sender: 'm4', text: '詳細を共有してください。', time: '13:10' },
            ]
          },
        ]
      },
      'PRJ-002': {
        rooms: [
          {
            id: 'PRJ-002-r1', name: '全体連絡', type: 'public', desc: '案件全体の連絡事項',
            unread: 1,
            members: ['m6', 'm7', 'm8'],
            messages: [
              { sender: 'm6', text: 'B社設備導入のキックオフ資料を共有しました。', time: '10:00' },
              { sender: 'm7', text: 'ありがとうございます。確認しました。', time: '10:15' },
              { sender: 'me', text: 'スケジュールについて明日の打ち合わせで確認しましょう。', time: '10:30' },
            ]
          },
          {
            id: 'PRJ-002-r2', name: '設備担当', type: 'private', desc: '設備担当者のみ',
            unread: 4,
            members: ['m6', 'm8'],
            messages: [
              { sender: 'm8', text: '設備仕様書の最新版を送ります。', time: '09:00' },
            ]
          },
        ]
      },
      'PRJ-003': {
        rooms: [
          {
            id: 'PRJ-003-r1', name: '全体連絡', type: 'public', desc: '案件全体の連絡事項',
            unread: 0,
            members: ['m9', 'm10', 'm11', 'm12'],
            messages: [
              { sender: 'm9', text: '品質改善の最終報告書が完成しました。', time: '16:00' },
              { sender: 'm10', text: 'お疲れ様でした！プロジェクト完了ですね。', time: '16:10' },
            ]
          },
        ]
      },
      'PRJ-004': {
        rooms: [
          {
            id: 'PRJ-004-r1', name: '全体連絡', type: 'public', desc: '案件全体の連絡事項',
            unread: 0,
            members: ['m13', 'm14'],
            messages: [
              { sender: 'm13', text: 'プロジェクトは現在保留中です。再開時は連絡します。', time: '09:00' },
            ]
          },
        ]
      },
      'PRJ-005': {
        rooms: [
          {
            id: 'PRJ-005-r1', name: '全体連絡', type: 'public', desc: '案件全体の連絡事項',
            unread: 2,
            members: ['m15', 'm16', 'm17'],
            messages: [
              { sender: 'm15', text: 'プロジェクトは停止中です。クライアントからの連絡待ちです。', time: '11:00' },
            ]
          },
        ]
      },
    };

    let currentProjectId = null;
    let currentRoomId = null;
    let newRoomType = 'public';
    let chatViewMode = 'project'; // 'global' | 'project'

    const projectNames = {
      'PRJ-001': 'A社 製造ライン改修',
      'PRJ-002': 'B社 設備導入',
      'PRJ-003': 'C社 品質改善プロジェクト',
      'PRJ-004': 'D社 PLCシステム更新',
      'PRJ-005': 'E社 倉庫管理システム導入',
    };

    // ===== CHAT NAV (Level 1 — global view) =====
    function navigateChatGlobal(navEl) {
      chatViewMode = 'global';
      navigate('chat', navEl);
    }

    // ===== CHAT RENDER =====
    function renderChatPage() {
      const list = document.getElementById('chat-room-list');

      // Update sidebar header title + button visibility
      const titleEl = document.querySelector('.chat-sidebar-title span');
      if (titleEl) {
        titleEl.textContent = chatViewMode === 'global' ? '💬 全プロジェクト チャット' : '💬 グループ一覧';
      }
      updateCreateRoomBtn();
      resetRoomSearch();

      if (chatViewMode === 'global') {
        renderChatGlobal(list);
      } else {
        renderChatProject(list);
      }

      updateAllUnreadBadges();
    }

    function renderChatGlobal(list) {
      const projectIds = Object.keys(chatData);
      if (projectIds.length === 0) {
        list.innerHTML = '<div class="chat-empty-rooms">参加中のプロジェクトがありません。</div>';
        return;
      }

      list.innerHTML = '<div class="chat-global-hint">💡 参加しているすべてのプロジェクトのグループが表示されています</div>' +
        projectIds.map(pid => {
          const rooms = chatData[pid].rooms;
          const name = projectNames[pid] || pid;
          const projUnread = rooms.reduce((sum, r) => sum + (r.unread || 0), 0);
          const unreadBadge = projUnread > 0
            ? `<span class="notif">${projUnread > 99 ? '99+' : projUnread}</span>`
            : `<span class="prj-badge">${rooms.length}グループ</span>`;
          const roomsHtml = rooms.length === 0
            ? '<div class="chat-empty-rooms" style="padding:10px 16px">グループなし</div>'
            : rooms.map(r => roomCardHtml(r, pid)).join('');
          return `<div class="chat-project-group">
        <div class="chat-project-header open" id="hdr-${pid}" onclick="toggleProjectGroup('${pid}')">
          <span class="prj-chevron">▶</span>
          <span class="prj-name">📁 ${name}</span>
          ${unreadBadge}
        </div>
        <div class="chat-project-rooms" id="prj-rooms-${pid}">${roomsHtml}</div>
      </div>`;
        }).join('');
    }

    function renderChatProject(list) {
      const data = chatData[currentProjectId];
      const rooms = data ? data.rooms : [];

      if (rooms.length === 0) {
        list.innerHTML = '<div class="chat-empty-rooms">グループがありません。<br>「+ 新規グループ」から作成してください。</div>';
        showChatNoRoom();
        return;
      }
      list.innerHTML = rooms.map(r => roomCardHtml(r, currentProjectId)).join('');
    }

    function roomCardHtml(r, pid) {
      const lastMsg = r.messages.length ? r.messages[r.messages.length - 1] : null;
      const memberCount = r.type === 'public'
        ? (projectMembers[pid] || []).length
        : r.members.length;
      const lastText = lastMsg
        ? (lastMsg.sender === 'me' ? 'あなた: ' : '') + lastMsg.text
        : 'まだメッセージはありません';
      const unread = r.unread || 0;
      const unreadHtml = unread > 0
        ? `<span class="notif" style="margin-left:auto;flex-shrink:0">${unread > 99 ? '99+' : unread}</span>`
        : '';
      return `<div class="chat-room${r.id === currentRoomId ? ' active' : ''}" onclick="openChatRoom('${r.id}','${pid}')">
    <div class="chat-room-header">
      <span class="chat-room-name">${r.name}</span>
      <span style="font-size:12px;flex-shrink:0">${r.type === 'public' ? '🌐' : '🔒'}</span>
      ${unreadHtml}
    </div>
    <div class="chat-room-last" style="font-weight:${unread > 0 ? '600' : '400'};color:${unread > 0 ? '#374151' : '#9ca3af'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${lastText}</div>
    <div class="chat-room-meta">👥 ${memberCount}名</div>
  </div>`;
    }

    function toggleProjectGroup(pid) {
      const rooms = document.getElementById('prj-rooms-' + pid);
      const hdr = document.getElementById('hdr-' + pid);
      if (rooms) rooms.classList.toggle('collapsed');
      if (hdr) hdr.classList.toggle('open');
    }

    // ===== UNREAD BADGES =====
    function updateAllUnreadBadges() {
      // Total across ALL projects → Level 1 nav badge
      const total = Object.values(chatData).reduce((sum, proj) =>
        sum + proj.rooms.reduce((s, r) => s + (r.unread || 0), 0), 0);
      const globalBadge = document.getElementById('chat-notif-global');
      if (globalBadge) {
        globalBadge.textContent = total > 99 ? '99+' : total;
        globalBadge.style.display = total > 0 ? '' : 'none';
      }

      // Total for current project → Level 2 nav badge
      const projBadge = document.getElementById('chat-notif-badge');
      if (projBadge && currentProjectId && chatData[currentProjectId]) {
        const projTotal = chatData[currentProjectId].rooms.reduce((s, r) => s + (r.unread || 0), 0);
        projBadge.textContent = projTotal > 99 ? '99+' : projTotal;
        projBadge.style.display = projTotal > 0 ? '' : 'none';
      } else if (projBadge) {
        projBadge.style.display = 'none';
      }
    }

    // Update create-room button visibility depending on mode
    function updateCreateRoomBtn() {
      const btn = document.querySelector('.btn-new-room');
      if (!btn) return;
      if (chatViewMode === 'global') {
        btn.style.display = 'none';
      } else {
        btn.style.display = '';
      }
    }

    function showChatNoRoom() {
      document.getElementById('chat-no-room').style.display = 'flex';
      const panel = document.getElementById('chat-active-panel');
      panel.style.display = 'none';
      currentRoomId = null;
    }

    function openChatRoom(roomId, pid) {
      // pid is passed from roomCardHtml; fall back to currentProjectId
      const resolvedPid = pid || currentProjectId;
      const data = chatData[resolvedPid];
      if (!data) return;
      const room = data.rooms.find(r => r.id === roomId);
      if (!room) return;

      currentRoomId = roomId;
      // In global mode, track which project this room belongs to for sending
      if (chatViewMode === 'global') currentProjectId = resolvedPid;

      // Reset in-message search when switching rooms
      resetMsgSearch();
      // Mark room as read
      room.unread = 0;

      renderChatPage(); // refresh room list + badges

      // Hide no-room placeholder, show panel
      document.getElementById('chat-no-room').style.display = 'none';
      const panel = document.getElementById('chat-active-panel');
      panel.style.display = 'flex';
      panel.style.flexDirection = 'column';
      panel.style.overflow = 'hidden';
      panel.style.flex = '1';

      // Header
      const typeLabel = room.type === 'public' ? '🌐 パブリック' : '🔒 プライベート';
      document.getElementById('chat-room-title').textContent = room.name;
      document.getElementById('chat-room-meta').textContent = `${typeLabel}　${room.desc || ''}`;

      const allMembers = room.type === 'public'
        ? (projectMembers[currentProjectId] || [])
        : (projectMembers[currentProjectId] || []).filter(m => room.members.includes(m.id));
      document.getElementById('chat-room-members').innerHTML =
        `👥 <strong>${allMembers.length}名</strong>　` +
        allMembers.map(m => `<span style="background:#f1f5f9;border-radius:12px;padding:2px 8px;font-size:11px">${m.name}</span>`).join(' ');

      renderMessages(room);

      document.getElementById('chat-input').focus();
    }

    function renderMessages(room) {
      const members = projectMembers[currentProjectId] || [];
      const msgs = document.getElementById('chat-messages');
      msgs.innerHTML = room.messages.map(msg => {
        if (msg.sender === 'me') {
          return `<div class="msg me">
        <div class="msg-avatar">私</div>
        <div>
          <div class="msg-bubble">${msg.text}</div>
          <div class="msg-time" style="text-align:right">${msg.time}</div>
        </div>
      </div>`;
        }
        const member = members.find(m => m.id === msg.sender) || { name: msg.sender, short: msg.sender.slice(0, 2), color: '' };
        return `<div class="msg">
      <div class="msg-avatar ${member.color}">${member.short}</div>
      <div>
        <div class="msg-name">${member.name}</div>
        <div class="msg-bubble">${msg.text}</div>
        <div class="msg-time">${msg.time}</div>
      </div>
    </div>`;
      }).join('');
      msgs.scrollTop = msgs.scrollHeight;
    }

    // ===== IN-MESSAGE SEARCH =====
    let msgSearchMatches = [];
    let msgSearchIdx = -1;

    // ===== CHAT ROOM SEARCH (sidebar filter) =====
    function filterRoomList(kw) {
      const clearBtn = document.getElementById('room-search-clear');
      clearBtn.classList.toggle('visible', kw.trim().length > 0);

      const kwLow = kw.trim().toLowerCase();
      const allRooms = document.querySelectorAll('#chat-room-list .chat-room');
      let visibleCount = 0;

      allRooms.forEach(el => {
        const nameEl = el.querySelector('.chat-room-name');
        const name = nameEl ? nameEl.textContent.toLowerCase() : '';
        const show = !kwLow || name.includes(kwLow);
        el.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      // Show/hide project group headers in global mode
      document.querySelectorAll('#chat-room-list .chat-project-group').forEach(grp => {
        const visible = grp.querySelectorAll('.chat-room:not([style*="display: none"])').length;
        grp.style.display = visible > 0 ? '' : 'none';
      });

      // Show empty state
      let emptyEl = document.getElementById('room-search-empty');
      if (!kwLow) {
        if (emptyEl) emptyEl.remove();
        return;
      }
      if (visibleCount === 0) {
        if (!emptyEl) {
          emptyEl = document.createElement('div');
          emptyEl.id = 'room-search-empty';
          emptyEl.className = 'chat-room-empty-search';
          emptyEl.textContent = `「${kw}」に一致するグループが見つかりません`;
          document.getElementById('chat-room-list').appendChild(emptyEl);
        }
      } else {
        if (emptyEl) emptyEl.remove();
      }
    }

    function clearRoomSearch() {
      const inp = document.getElementById('room-search-input');
      inp.value = '';
      filterRoomList('');
      inp.focus();
    }

    // ===== GLOBAL CHAT SEARCH =====
    function openGlobalSearch() {
      const overlay = document.getElementById('global-search-overlay');
      overlay.classList.add('open');
      document.getElementById('global-search-input').focus();
    }

    function closeGlobalSearch() {
      document.getElementById('global-search-overlay').classList.remove('open');
      document.getElementById('global-search-input').value = '';
      document.getElementById('global-search-results').innerHTML = `
    <div class="global-search-empty">
      <div class="global-search-empty-icon">🔍</div>
      <div style="font-size:13px;font-weight:600;color:#374151">キーワードで検索</div>
      <div style="font-size:12px;margin-top:4px">全グループのメッセージを横断検索できます</div>
    </div>`;
    }

    function execGlobalSearch() {
      const kw = document.getElementById('global-search-input').value.trim();
      const kwLow = kw.toLowerCase();
      const resultsEl = document.getElementById('global-search-results');

      if (!kwLow) {
        closeGlobalSearch();
        document.getElementById('global-search-overlay').classList.add('open');
        document.getElementById('global-search-input').focus();
        return;
      }

      // Collect all matching messages across all projects & rooms
      const groups = []; // { projectName, roomName, roomId, pid, matches: [{sender, text, time, idx}] }
      let totalMatches = 0;

      const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(' + escape(kwLow) + ')', 'gi');

      Object.keys(chatData).forEach(pid => {
        const projName = projectNames[pid] || pid;
        chatData[pid].rooms.forEach(room => {
          const matched = [];
          room.messages.forEach((msg, idx) => {
            if (msg.text.toLowerCase().includes(kwLow)) {
              matched.push({ ...msg, idx });
            }
          });
          if (matched.length > 0) {
            groups.push({ pid, projName, roomName: room.name, roomId: room.id, roomType: room.type, matches: matched });
            totalMatches += matched.length;
          }
        });
      });

      if (totalMatches === 0) {
        resultsEl.innerHTML = `
      <div class="global-search-empty">
        <div class="global-search-empty-icon">😶</div>
        <div style="font-size:13px;font-weight:600;color:#374151">「${kw}」の結果が見つかりませんでした</div>
        <div style="font-size:12px;margin-top:4px;color:#9ca3af">別のキーワードで試してください</div>
      </div>`;
        return;
      }

      const highlight = text => text.replace(re, '<mark>$1</mark>');

      resultsEl.innerHTML =
        `<div class="global-search-summary">「${kw}」で <strong>${totalMatches}件</strong> のメッセージが見つかりました（${groups.length}グループ）</div>` +
        groups.map(g => `
      <div class="global-search-group">
        <div class="global-search-group-hdr" onclick="globalSearchJumpToRoom('${g.roomId}','${g.pid}')">
          <span>${g.roomType === 'public' ? '🌐' : '🔒'}</span>
          <span>${g.roomName}</span>
          <span style="color:#9ca3af;font-weight:400;margin-left:auto">${g.projName} • ${g.matches.length}件</span>
        </div>
        ${g.matches.map(m => `
          <div class="global-search-item" onclick="globalSearchJumpToRoom('${g.roomId}','${g.pid}')">
            <div class="global-search-item-room">${g.roomName}</div>
            <div class="global-search-item-text">${highlight(m.text)}</div>
            <div class="global-search-item-meta">${m.sender === 'me' ? 'あなた' : m.sender} • ${m.time || ''}</div>
          </div>`).join('')}
      </div>`).join('');
    }

    function globalSearchJumpToRoom(roomId, pid) {
      closeGlobalSearch();
      // Switch to the correct project if needed
      if (pid !== currentProjectId) {
        currentProjectId = pid;
        chatViewMode = 'project';
        showNavLevel(2);
        document.getElementById('selected-project-name').textContent = projectNames[pid] || pid;
      }
      openChatRoom(roomId, pid);
    }

    // Reset room search when chat page is re-rendered
    function resetRoomSearch() {
      const inp = document.getElementById('room-search-input');
      if (inp) { inp.value = ''; }
      const clearBtn = document.getElementById('room-search-clear');
      if (clearBtn) clearBtn.classList.remove('visible');
      const emptyEl = document.getElementById('room-search-empty');
      if (emptyEl) emptyEl.remove();
    }

    function toggleMsgSearch() {
      const bar = document.getElementById('chat-msg-search');
      const btn = document.getElementById('chat-search-toggle');
      const isOpen = bar.classList.contains('open');
      if (isOpen) {
        closeMsgSearch();
      } else {
        bar.classList.add('open');
        btn.classList.add('active');
        document.getElementById('chat-msg-search-input').focus();
      }
    }

    function closeMsgSearch() {
      document.getElementById('chat-msg-search').classList.remove('open');
      document.getElementById('chat-search-toggle').classList.remove('active');
      document.getElementById('chat-msg-search-input').value = '';
      clearMsgSearchHighlights();
      msgSearchMatches = [];
      msgSearchIdx = -1;
      document.getElementById('chat-msg-search-count').textContent = '—';
    }

    function execMsgSearch() {
      const kw = document.getElementById('chat-msg-search-input').value.trim().toLowerCase();
      clearMsgSearchHighlights();
      msgSearchMatches = [];
      msgSearchIdx = -1;

      if (!kw) {
        document.getElementById('chat-msg-search-count').textContent = '—';
        updateMsgSearchNav();
        return;
      }

      // Find all bubble elements containing keyword
      document.querySelectorAll('#chat-messages .msg-bubble').forEach(bubble => {
        if (bubble.textContent.toLowerCase().includes(kw)) {
          // Highlight inside bubble
          bubble.innerHTML = bubble.innerHTML.replace(
            new RegExp('(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'),
            '<mark>$1</mark>'
          );
          msgSearchMatches.push(bubble);
        }
      });

      const total = msgSearchMatches.length;
      if (total === 0) {
        document.getElementById('chat-msg-search-count').textContent = '0件';
      } else {
        msgSearchIdx = 0;
        scrollToMatch(0);
      }
      updateMsgSearchNav();
    }

    function stepMsgSearch(dir) {
      if (msgSearchMatches.length === 0) return;
      msgSearchMatches[msgSearchIdx].classList.remove('search-current');
      msgSearchIdx = (msgSearchIdx + dir + msgSearchMatches.length) % msgSearchMatches.length;
      scrollToMatch(msgSearchIdx);
    }

    function scrollToMatch(idx) {
      msgSearchMatches.forEach(b => b.classList.remove('search-current'));
      const target = msgSearchMatches[idx];
      target.classList.add('search-current');
      target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      document.getElementById('chat-msg-search-count').textContent =
        `${idx + 1}/${msgSearchMatches.length}`;
      updateMsgSearchNav();
    }

    function clearMsgSearchHighlights() {
      document.querySelectorAll('#chat-messages .msg-bubble').forEach(bubble => {
        bubble.classList.remove('search-current');
        bubble.innerHTML = bubble.innerHTML.replace(/<mark>(.*?)<\/mark>/gi, '$1');
      });
    }

    function updateMsgSearchNav() {
      const total = msgSearchMatches.length;
      document.getElementById('msg-search-prev').disabled = total === 0;
      document.getElementById('msg-search-next').disabled = total === 0;
    }

    // Close search when switching rooms
    function resetMsgSearch() {
      closeMsgSearch();
      document.getElementById('chat-msg-search').classList.remove('open');
      document.getElementById('chat-search-toggle').classList.remove('active');
    }

    function sendChatMessage() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text || !currentRoomId) return;

      const data = chatData[currentProjectId];
      const room = data && data.rooms.find(r => r.id === currentRoomId);
      if (!room) return;

      const now = new Date();
      const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      room.messages.push({ sender: 'me', text, time });
      input.value = '';
      renderMessages(room);
      renderChatPage();
    }

    // ===== CREATE ROOM MODAL =====
    function openCreateRoomModal() {
      if (!currentProjectId) { alert('先に案件を選択してください。'); return; }
      document.getElementById('new-room-name').value = '';
      document.getElementById('new-room-desc').value = '';
      document.getElementById('new-room-type').value = 'public';
      newRoomType = 'public';
      document.getElementById('btn-type-public').className = 'room-type-btn selected-public';
      document.getElementById('btn-type-private').className = 'room-type-btn';
      renderMemberCheckList();
      updateMemberSelectVisibility();
      document.getElementById('modal-create-room').classList.add('open');
    }

    function selectRoomType(type) {
      newRoomType = type;
      document.getElementById('new-room-type').value = type;
      document.getElementById('btn-type-public').className = 'room-type-btn' + (type === 'public' ? ' selected-public' : '');
      document.getElementById('btn-type-private').className = 'room-type-btn' + (type === 'private' ? ' selected-private' : '');
      updateMemberSelectVisibility();
    }

    function updateMemberSelectVisibility() {
      document.getElementById('member-select-group').style.display = newRoomType === 'private' ? 'block' : 'none';
    }

    function renderMemberCheckList() {
      const members = projectMembers[currentProjectId] || [];
      document.getElementById('new-room-members').innerHTML = members.map(m =>
        `<label class="member-check">
      <input type="checkbox" value="${m.id}" checked>
      <span class="msg-avatar ${m.color}" style="width:24px;height:24px;font-size:10px;flex-shrink:0">${m.short}</span>
      ${m.name}
    </label>`
      ).join('');
    }

    function submitCreateRoom() {
      const name = document.getElementById('new-room-name').value.trim();
      if (!name) { alert('グループ名を入力してください。'); return; }

      const type = document.getElementById('new-room-type').value;
      const desc = document.getElementById('new-room-desc').value.trim();

      let members = [];
      if (type === 'public') {
        members = (projectMembers[currentProjectId] || []).map(m => m.id);
      } else {
        members = [...document.querySelectorAll('#new-room-members input:checked')].map(cb => cb.value);
        if (members.length === 0) { alert('プライベートグループには少なくとも1名選択してください。'); return; }
      }

      const roomId = currentProjectId + '-r' + Date.now();
      if (!chatData[currentProjectId]) chatData[currentProjectId] = { rooms: [] };
      chatData[currentProjectId].rooms.push({ id: roomId, name, type, desc, members, messages: [] });

      document.getElementById('modal-create-room').classList.remove('open');
      renderChatPage();
      openChatRoom(roomId);
    }

    // ===== COMPANY DETAIL DRAWER =====
    const personalDetailData = {
      u001: {
        name: '山田 花子', email: 'hanako@example.com', registered: '2026-03-15',
        status: '<span class="badge-active">Active</span>',
        plan: '<span class="badge-pro">Professional</span>',
        price: '¥1,500 / 月', nextBilling: '2026-06-30', estimate: '¥1,500',
        discount: 0,
        paymentMethod: 'Visa **** 4242',
        billingRows: [
          { period: '6/01〜6/30', plan: '<span class="badge-pro">Professional</span>', days: '30日', sub: '¥1,500' }
        ],
        billingTotal: '¥1,500',
        events: [
          { date: '2026-05-01', desc: 'Standard → Professional へアップグレード', sub: '翌月から適用', dot: 'dot-plan', by: '本人' },
          { date: '2026-03-15', desc: '契約開始（Standardプラン）', sub: 'トライアル14日間', dot: 'dot-start', by: 'システム' },
        ]
      },
      u002: {
        name: '鈴木 一郎', email: 'ichiro@example.com', registered: '2026-05-01',
        status: '<span class="badge-trial">Trial</span>',
        plan: '<span class="badge-std">Standard</span>',
        price: '¥1,000 / 月', nextBilling: '2026-06-30', estimate: '¥677',
        discount: 50,
        paymentMethod: 'Mastercard **** 1111',
        billingRows: [
          { period: '6/10〜6/30', plan: '<span class="badge-std">Standard</span>', days: '21日', sub: '¥677' }
        ],
        billingTotal: '¥677',
        events: [
          { date: '2026-06-10', desc: 'トライアル終了 → Standardプランへ移行', sub: '月額 ¥1,000', dot: 'dot-plan', by: 'システム' },
          { date: '2026-05-01', desc: '契約開始（トライアル）', sub: 'トライアル40日間', dot: 'dot-start', by: 'システム' },
        ]
      },
      u003: {
        name: '佐藤 健', email: 'ken@example.com', registered: '2026-06-10',
        status: '<span class="badge-str">Free</span>',
        plan: '<span class="badge-str">Free</span>',
        price: '¥0 / 月', nextBilling: '—', estimate: '¥0',
        discount: 0,
        paymentMethod: '未登録',
        billingRows: [],
        billingTotal: '¥0',
        events: [
          { date: '2026-06-10', desc: '新規登録（Freeプラン）', sub: '', dot: 'dot-start', by: 'システム' },
        ]
      }
    };

    const companyDetailData = {
      abc: {
        name: 'ABC株式会社',
        contact: '田中太郎',
        email: 'tanaka@abc.co.jp',
        tel: '03-XXXX-XXXX',
        registered: '2026-04-01',
        status: '<span class="badge-active">Active</span>',
        plan: '<span class="badge-pro">Professional</span>',
        price: '¥1,500 / 人 / 月',
        members: '10名',
        nextBilling: '2026-06-30',
        estimate: '¥11,516',
        discount: 50,
        billingRows: [
          { period: '6/01〜6/09', plan: '<span class="badge-std">Standard</span>', members: '8名', price: '¥1,000', days: '9日', sub: '¥2,400' },
          { period: '6/10〜6/14', plan: '<span class="badge-std">Standard</span>', members: '10名', price: '¥1,000', days: '5日', sub: '¥1,666' },
          { period: '6/15〜6/19', plan: '<span class="badge-pro">Professional</span>', members: '10名', price: '¥1,500', days: '5日', sub: '¥2,500' },
          { period: '6/20〜6/30', plan: '<span class="badge-pro">Professional</span>', members: '9名', price: '¥1,500', days: '11日', sub: '¥4,950' },
        ],
        billingTotal: '¥11,516',
        events: [
          { dot: 'dot-member', date: '2026-06-20 11:00', desc: 'メンバー退会', sub: '10名 → 9名 / Professional ¥1,500/人', by: 'システム' },
          { dot: 'dot-plan', date: '2026-06-15 14:00', desc: 'プランアップグレード', sub: 'Standard → Professional / 10名', by: '田中太郎' },
          { dot: 'dot-member', date: '2026-06-10 10:00', desc: 'メンバー追加', sub: '8名 → 10名 / Standard ¥1,000/人', by: '田中太郎' },
          { dot: 'dot-start', date: '2026-06-01 09:00', desc: '契約開始', sub: 'Standard / 8名 / ¥1,000/人', by: 'システム' },
        ]
      },
      xyz: {
        name: 'XYZ合同会社',
        contact: '山田花子',
        email: 'yamada@xyz.co.jp',
        tel: '06-XXXX-XXXX',
        registered: '2026-06-01',
        status: '<span class="badge-trial">Trial 残7日</span>',
        plan: '<span class="badge-std">Standard</span>',
        price: '¥1,000 / 人 / 月',
        members: '5名',
        nextBilling: '—',
        estimate: '¥833',
        discount: 0,
        billingRows: [
          { period: '6/01〜6/30', plan: '<span class="badge-std">Standard</span>', members: '5名', price: '¥1,000', days: '30日', sub: '¥833' },
        ],
        billingTotal: '¥833',
        events: [
          { dot: 'dot-start', date: '2026-06-01 10:00', desc: 'トライアル開始', sub: 'Standard / 5名', by: 'システム' },
        ]
      },
      test: {
        name: 'テスト会社',
        contact: '佐藤次郎',
        email: 'sato@test.co.jp',
        tel: '—',
        registered: '2026-05-01',
        status: '<span class="badge-suspended">停止</span>',
        plan: '<span class="badge-str">Starter</span>',
        price: '¥0',
        members: '2名',
        nextBilling: '—',
        estimate: '¥0',
        discount: 0,
        billingRows: [],
        billingTotal: '¥0',
        events: [
          { dot: 'dot-start', date: '2026-05-01 09:00', desc: '契約開始', sub: 'Starter / 2名', by: 'システム' },
        ]
      }
    };

    function openCompanyDetail(code) {
      const d = companyDetailData[code] || companyDetailData['abc'];
      if (!d) return;

      // Header
      document.getElementById('cd-company-name').textContent = d.name;
      document.getElementById('cd-company-status').innerHTML = d.status;

      // Tab 1: 基本情報・プラン
      document.getElementById('cd-info-basic').innerHTML = `
    <div class="drawer-info-row"><span class="lbl">担当者</span><span class="val">${d.contact}</span></div>
    <div class="drawer-info-row"><span class="lbl">メール</span><span class="val" style="color:#0ABAB5">${d.email}</span></div>
    <div class="drawer-info-row"><span class="lbl">電話番号</span><span class="val">${d.tel}</span></div>
    <div class="drawer-info-row"><span class="lbl">登録日</span><span class="val">${d.registered}</span></div>
  `;
      document.getElementById('cd-info-plan').innerHTML = `
    <div class="drawer-info-row"><span class="lbl">プラン</span><span>${d.plan}</span></div>
    <div class="drawer-info-row"><span class="lbl">単価</span><span class="val">${d.price}</span></div>
    <div class="drawer-info-row"><span class="lbl">メンバー数</span><span class="val">${d.members}</span></div>
    <div class="drawer-info-row"><span class="lbl">次回請求日</span><span class="val">${d.nextBilling}</span></div>
    <div class="drawer-info-row"><span class="lbl">今月予定額</span><span class="val" style="color:#059669;font-weight:700">${d.estimate}</span></div>
    <div class="drawer-info-row">
      <span class="lbl">初月割引率</span>
      <span style="display:flex;align-items:center;gap:6px">
        ${d.discount > 0
          ? `<span style="color:#d97706;font-weight:700">${d.discount}% OFF</span>`
          : `<span style="color:#9ca3af">なし</span>`
        }
        <input type="number" value="${d.discount}" min="0" max="100"
          style="width:56px;padding:2px 6px;border:1px solid #d1d5db;border-radius:6px;font-size:12px;text-align:right"
          onchange="this.previousElementSibling.innerHTML = this.value > 0 ? '<span style=color:#d97706;font-weight:700>' + this.value + '% OFF</span>' : '<span style=color:#9ca3af>なし</span>'">
        <span style="font-size:12px;color:#6b7280">%</span>
      </span>
    </div>
  `;

      // Tab 2: 今月の請求詳細
      document.getElementById('cd-billing-body').innerHTML = d.billingRows.length > 0 ? `
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="color:#9ca3af;border-bottom:1px solid #e5e7eb">
          <th style="padding:8px 0;text-align:left;font-weight:500">期間</th>
          <th style="padding:8px 0;text-align:left;font-weight:500">プラン</th>
          <th style="padding:8px 0;text-align:right;font-weight:500">人数</th>
          <th style="padding:8px 0;text-align:right;font-weight:500">単価</th>
          <th style="padding:8px 0;text-align:right;font-weight:500">小計</th>
        </tr>
      </thead>
      <tbody>
        ${d.billingRows.map(r => `
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="padding:10px 0">${r.period}</td>
            <td style="padding:10px 0">${r.plan}</td>
            <td style="padding:10px 0;text-align:right">${r.members}</td>
            <td style="padding:10px 0;text-align:right">${r.price}</td>
            <td style="padding:10px 0;text-align:right;font-weight:600">${r.sub}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    ${d.discount > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px">
      <span style="color:#d97706">🎉 初月割引 (${d.discount}% OFF)</span>
      <span style="color:#d97706;font-weight:600">- ¥${Math.floor(parseInt(d.billingTotal.replace(/[¥,]/g, '')) * d.discount / 100).toLocaleString()}</span>
    </div>
    ` : ''}
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:14px;margin-top:4px;border-top:2px solid #e5e7eb">
      <div>
        <div style="font-size:11px;color:#9ca3af">日割り基準: 当月実日数 ／ 端数: 切り捨て ／ 確定日: ${d.nextBilling}</div>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="display:flex;gap:6px">
          <button class="btn btn-sm">PDF出力</button>
          <button class="btn btn-sm">CSV</button>
        </div>
        <div style="font-size:16px;font-weight:700">合計 <span style="color:#059669">${d.discount > 0
          ? '¥' + Math.floor(parseInt(d.billingTotal.replace(/[¥,]/g, '')) * (1 - d.discount / 100)).toLocaleString()
          : d.billingTotal}</span>
          ${d.discount > 0 ? `<span style="font-size:12px;color:#9ca3af;text-decoration:line-through;margin-left:6px">${d.billingTotal}</span>` : ''}
        </div>
      </div>
    </div>
  ` : `<div style="color:#9ca3af;font-size:14px;padding:20px 0">今月の請求はありません</div>`;

      // Tab 3: 変更履歴
      document.getElementById('cd-history-body').innerHTML = d.events.map(e => `
    <div class="event-list-item">
      <div class="event-dot ${e.dot}"></div>
      <div class="event-date-col">${e.date}</div>
      <div class="event-desc-col">
        <div style="font-weight:600">${e.desc}</div>
        <div style="color:#6b7280;font-size:12px;margin-top:2px">${e.sub}</div>
      </div>
      <div class="event-by">${e.by}</div>
    </div>
  `).join('');

      // Reset tabs to first tab then navigate
      ['cd-panel-info', 'cd-panel-billing', 'cd-panel-history'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });
      ['cd-tab-info', 'cd-tab-billing', 'cd-tab-history'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });
      document.getElementById('cd-panel-info').classList.add('active');
      document.getElementById('cd-tab-info').classList.add('active');

      navigate('company-detail', null);
    }

    function openPersonalDetail(code) {
      const d = personalDetailData[code];
      if (!d) return;

      document.getElementById('pd-user-name').textContent = d.name;
      document.getElementById('pd-user-status').innerHTML = d.status;

      document.getElementById('pd-info-basic').innerHTML = `
    <div class="drawer-info-row"><span class="lbl">メール</span><span class="val" style="color:#0ABAB5">${d.email}</span></div>
    <div class="drawer-info-row"><span class="lbl">登録日</span><span class="val">${d.registered}</span></div>
    <div class="drawer-info-row"><span class="lbl">支払い方法</span><span class="val">${d.paymentMethod}</span></div>
  `;
      document.getElementById('pd-info-plan').innerHTML = `
    <div class="drawer-info-row"><span class="lbl">プラン</span><span>${d.plan}</span></div>
    <div class="drawer-info-row"><span class="lbl">月額</span><span class="val">${d.price}</span></div>
    <div class="drawer-info-row"><span class="lbl">次回請求日</span><span class="val">${d.nextBilling}</span></div>
    <div class="drawer-info-row"><span class="lbl">今月予定額</span><span class="val" style="color:#059669;font-weight:700">${d.estimate}</span></div>
    <div class="drawer-info-row">
      <span class="lbl">初月割引率</span>
      <span style="display:flex;align-items:center;gap:6px">
        ${d.discount > 0
          ? `<span style="color:#d97706;font-weight:700">${d.discount}% OFF</span>`
          : `<span style="color:#9ca3af">なし</span>`
        }
        <input type="number" value="${d.discount}" min="0" max="100"
          style="width:56px;padding:2px 6px;border:1px solid #d1d5db;border-radius:6px;font-size:12px;text-align:right"
          onchange="this.previousElementSibling.innerHTML = this.value > 0 ? '<span style=color:#d97706;font-weight:700>' + this.value + '% OFF</span>' : '<span style=color:#9ca3af>なし</span>'">
        <span style="font-size:12px;color:#6b7280">%</span>
      </span>
    </div>
  `;

      document.getElementById('pd-billing-body').innerHTML = d.billingRows.length > 0 ? `
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="color:#9ca3af;border-bottom:1px solid #e5e7eb">
          <th style="padding:8px 0;text-align:left;font-weight:500">期間</th>
          <th style="padding:8px 0;text-align:left;font-weight:500">プラン</th>
          <th style="padding:8px 0;text-align:right;font-weight:500">日数</th>
          <th style="padding:8px 0;text-align:right;font-weight:500">小計</th>
        </tr>
      </thead>
      <tbody>
        ${d.billingRows.map(r => `
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="padding:10px 0">${r.period}</td>
            <td style="padding:10px 0">${r.plan}</td>
            <td style="padding:10px 0;text-align:right">${r.days}</td>
            <td style="padding:10px 0;text-align:right;font-weight:600">${r.sub}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    ${d.discount > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:13px">
      <span style="color:#d97706">🎉 初月割引 (${d.discount}% OFF)</span>
      <span style="color:#d97706;font-weight:600">- ¥${Math.floor(parseInt(d.billingTotal.replace(/[¥,]/g, '')) * d.discount / 100).toLocaleString()}</span>
    </div>
    ` : ''}
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:14px;margin-top:4px;border-top:2px solid #e5e7eb">
      <div style="font-size:11px;color:#9ca3af">日割り基準: 当月実日数 ／ 端数: 切り捨て ／ 確定日: ${d.nextBilling}</div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="display:flex;gap:6px">
          <button class="btn btn-sm">PDF出力</button>
          <button class="btn btn-sm">CSV</button>
        </div>
        <div style="font-size:16px;font-weight:700">合計 <span style="color:#059669">${d.discount > 0
          ? '¥' + Math.floor(parseInt(d.billingTotal.replace(/[¥,]/g, '')) * (1 - d.discount / 100)).toLocaleString()
          : d.billingTotal}</span>
          ${d.discount > 0 ? `<span style="font-size:12px;color:#9ca3af;text-decoration:line-through;margin-left:6px">${d.billingTotal}</span>` : ''}
        </div>
      </div>
    </div>
  ` : `<div style="color:#9ca3af;font-size:14px;padding:20px 0">今月の請求はありません</div>`;

      document.getElementById('pd-history-body').innerHTML = d.events.map(e => `
    <div class="event-list-item">
      <div class="event-dot ${e.dot}"></div>
      <div class="event-date-col">${e.date}</div>
      <div class="event-desc-col">
        <div style="font-weight:600">${e.desc}</div>
        <div style="color:#6b7280;font-size:12px;margin-top:2px">${e.sub}</div>
      </div>
      <div class="event-by">${e.by}</div>
    </div>
  `).join('');

      ['pd-panel-info', 'pd-panel-billing', 'pd-panel-history'].forEach(id => document.getElementById(id).classList.remove('active'));
      ['pd-tab-info', 'pd-tab-billing', 'pd-tab-history'].forEach(id => document.getElementById(id).classList.remove('active'));
      document.getElementById('pd-panel-info').classList.add('active');
      document.getElementById('pd-tab-info').classList.add('active');

      navigate('personal-detail', null);
    }

    function switchPersonalDetailTab(panelId, clickedEl) {
      ['pd-panel-info', 'pd-panel-billing', 'pd-panel-history'].forEach(id => document.getElementById(id).classList.remove('active'));
      ['pd-tab-info', 'pd-tab-billing', 'pd-tab-history'].forEach(id => document.getElementById(id).classList.remove('active'));
      document.getElementById(panelId).classList.add('active');
      if (clickedEl) clickedEl.classList.add('active');
    }

    function openCancelPlanModal(type) {
      const overlay = document.getElementById('cancel-plan-overlay');
      overlay.style.display = 'flex';
    }

    function closeCancelPlanModal() {
      document.getElementById('cancel-plan-overlay').style.display = 'none';
    }

    function confirmCancelPlan() {
      closeCancelPlanModal();
      alert('解約申請を受け付けました。\n2026年6月30日まで現在のプランをご利用いただけます。\n翌月1日よりFreeプランに移行します。');
    }

    function switchCompanyDetailTab(panelId, clickedEl) {
      ['cd-panel-info', 'cd-panel-billing', 'cd-panel-history'].forEach(id => {
        document.getElementById(id).classList.remove('active');
      });
      ['cd-tab-info', 'cd-tab-billing', 'cd-tab-history'].forEach(id => {
        document.getElementById(id).classList.remove('active');
      });
      document.getElementById(panelId).classList.add('active');
      if (clickedEl) clickedEl.classList.add('active');
    }

    // ===== ADMIN PLAN NAVIGATION =====
    function navigateAdminPlan(tabId, navEl) {
      navigate('admin-plan', navEl);
      const page = document.getElementById('page-admin-plan');
      page.querySelectorAll('.plan-tab-panel').forEach(p => p.classList.remove('active'));
      page.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
      const panel = document.getElementById(tabId);
      if (panel) panel.classList.add('active');
      page.querySelectorAll('.plan-tab').forEach(t => {
        if (t.getAttribute('onclick') && t.getAttribute('onclick').includes(tabId)) t.classList.add('active');
      });
    }

    // ===== PLAN TABS =====
    function switchPlanTab(pageId, tabId, clickedEl) {
      const page = document.getElementById('page-' + pageId);
      if (!page) return;
      page.querySelectorAll('.plan-tab-panel').forEach(p => p.classList.remove('active'));
      page.querySelectorAll('.plan-tab, .modern-pill-tab').forEach(t => t.classList.remove('active'));
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) targetPanel.classList.add('active');
      if (clickedEl) clickedEl.classList.add('active');
      else {
        page.querySelectorAll('.plan-tab, .modern-pill-tab').forEach(t => {
          if (t.getAttribute('onclick') && t.getAttribute('onclick').includes(tabId)) t.classList.add('active');
        });
      }
    }

    function toggleBillingDetail(rowId) {
      const row = document.getElementById(rowId);
      if (!row) return;
      row.style.display = row.style.display === 'none' ? '' : 'none';
    }

    // ===== PAGE CONFIG =====
    const pages = {
      // Admin
      'admin-dashboard': { id: 'page-admin-dashboard', title: 'Bàn Điều Hành Quản Trị Doanh Nghiệp (Executive Dashboard)' },
      'admin-dummy-data': { id: 'page-admin-dummy-data', title: 'Bảng Dữ Liệu Hợp Đồng Mẫu (Dummy Contracts Dataset)' },
      licenses: { id: 'page-licenses', title: '会社ライセンス一覧' },
      'personal-licenses': { id: 'page-personal-licenses', title: '個人ライセンス一覧' },
      adminusers: { id: 'page-adminusers', title: 'ユーザー一覧' },
      // Company level-1
      projects: { id: 'page-projects', title: '案件管理' },
      'project-overview': { id: 'page-project-overview', title: 'プロジェクト一覧' },
      users: { id: 'page-users', title: '会社メンバー一覧' },
      companyinfo: { id: 'page-company-info', title: '会社管理' },
      chat: { id: 'page-chat', title: 'チャット' },
      'my-plan': { id: 'page-my-plan', title: 'Quản lý gói công ty' },
      'personal-plan': { id: 'page-personal-plan', title: 'Quản lý gói cá nhân' },
      'admin-plan': { id: 'page-admin-plan', title: 'プラン管理（システム管理者）' },
      'admin-master': { id: 'page-admin-master', title: 'Cấu hình gói dịch vụ' },
      'company-detail': { id: 'page-company-detail', title: '会社詳細' },
      'admin-personal': { id: 'page-admin-personal', title: '個人ユーザー管理' },
      'personal-detail': { id: 'page-personal-detail', title: 'ユーザー詳細' },
      help: { id: 'page-help', title: 'ヘルプ' },
      // Company level-2 (project-specific)
      schedule: { id: 'page-schedule', title: 'スケジュール管理' },
      progress: { id: 'page-progress', title: 'タスク管理' },
      resource: { id: 'page-resource', title: 'リソース管理' },
      qa: { id: 'page-qa', title: '質問管理' },
      issues: { id: 'page-issues', title: '課題管理' },
      report: { id: 'page-report', title: '報告書作成' },
      files: { id: 'page-files', title: 'ファイル共有' },
    };

    // ===== USERS =====
    const COMMON_PASSWORD = '1234';
    const users = {
      'admin': { name: 'Admin', role: 'admin', avatar: 'AD', password: COMMON_PASSWORD },
      'company': { name: 'Company', role: 'company', avatar: '会社', companyName: 'E-Mind株式会社', password: COMMON_PASSWORD },
      'emind': { name: 'E-Mind', role: 'both', avatar: 'EM', companyName: 'E-Mind株式会社', roles: ['システム管理者', '会社管理者', '案件管理者'], password: COMMON_PASSWORD },
      'company2': {
        name: 'Company2', role: 'multi-company', avatar: 'C2', password: COMMON_PASSWORD,
        companies: [
          {
            code: 'abc', name: 'ABC Manufacturing Vietnam', flag: '🇻🇳', projects: ['PRJ-001', 'PRJ-003'],
            logo: { initials: 'ABC', color: '#e67e22', textColor: '#fff', shape: 'rounded' }
          },
          {
            code: 'techno', name: 'Techno Solutions', flag: '🇯🇵', projects: ['PRJ-002'],
            logo: { initials: 'TS', color: '#2563eb', textColor: '#fff', shape: 'circle' }
          },
          {
            code: 'devstar', name: 'DevStar Co., Ltd.', flag: '🇻🇳', projects: ['PRJ-004', 'PRJ-005'],
            logo: { initials: 'DS', color: '#7c3aed', textColor: '#fff', shape: 'rounded' }
          },
        ]
      },
    };

    let currentUser = null;

    // ===== AUTO-LOGIN from login.html =====
    (function () {
      const storedId = sessionStorage.getItem('emind_user_id');
      const storedUser = sessionStorage.getItem('emind_user');
      if (storedId && storedUser) {
        sessionStorage.removeItem('emind_user_id');
        sessionStorage.removeItem('emind_user');
        document.addEventListener('DOMContentLoaded', function () {
          document.getElementById('login-id').value = storedId;
          document.getElementById('login-pass').value = JSON.parse(storedUser).password;
          doLogin();
        });
      }
    })();

    // ===== LOGIN =====
    function doLogin() {
      const id = document.getElementById('login-id').value.trim().toLowerCase();
      const pass = document.getElementById('login-pass').value;
      const user = users[id];
      if (!user || pass !== user.password) {
        document.getElementById('login-error').style.display = 'block';
        return;
      }
      document.getElementById('login-error').style.display = 'none';
      currentUser = user;

      document.getElementById('login-screen').classList.add('hidden');

      // Multi-company: show company selector first
      if (user.role === 'multi-company') {
        openCompanySelector();
        return;
      }

      // Show app
      document.getElementById('main-app').style.display = 'flex';

      // Setup role UI
      document.getElementById('user-avatar').textContent = user.avatar;
      if (user.role === 'admin') {
        document.getElementById('sidebar-admin').style.display = 'flex';
        document.getElementById('sidebar-company').style.display = 'none';
        document.getElementById('project-select').style.display = 'none';
        document.getElementById('role-switcher').style.display = 'none';
        navigate('admin-dashboard', document.querySelector('#sidebar-admin .nav-item'));
      } else if (user.role === 'both') {
        document.getElementById('sidebar-admin').style.display = 'none';
        document.getElementById('sidebar-company').style.display = 'flex';
        document.getElementById('project-select').style.display = 'none';
        document.getElementById('role-switcher').style.display = 'inline-flex';
        document.getElementById('role-switcher-label').textContent = '🔑 Adminモードへ';
        document.getElementById('nav-admin-tools').style.display = 'block';
        document.getElementById('nav-admin-plan-group').style.display = 'block';
        if (user.companyName) document.getElementById('sidebar-company-name').textContent = user.companyName;
        currentMode = 'company';
        showNavLevel(1);
        navigate('projects', document.querySelector('#nav-level1 .nav-item[onclick*="projects"]'));
        updateAllUnreadBadges();
      } else {
        document.getElementById('sidebar-admin').style.display = 'none';
        document.getElementById('sidebar-company').style.display = 'flex';
        document.getElementById('project-select').style.display = 'none';
        document.getElementById('role-switcher').style.display = 'none';
        if (user.companyName) document.getElementById('sidebar-company-name').textContent = user.companyName;
        // Show level-1 nav, navigate to project list
        showNavLevel(1);
        navigate('projects', document.querySelector('#nav-level1 .nav-item[onclick*="projects"]'));
        updateAllUnreadBadges();
      }
    }

    // ===== COMPANY SELECTOR (for 'multi-company' role) =====
    function renderCompanyLogo(logo, flag) {
      const radius = logo.shape === 'circle' ? '50%' : '10px';
      return `<div style="position:relative;width:52px;height:52px;flex-shrink:0">
    <div style="width:52px;height:52px;border-radius:${radius};background:${logo.color};
      display:flex;align-items:center;justify-content:center;
      font-size:14px;font-weight:800;color:${logo.textColor};letter-spacing:-0.5px">
      ${logo.initials}
    </div>
    <span style="position:absolute;bottom:-4px;right:-4px;font-size:14px;line-height:1;
      background:#fff;border-radius:50%;padding:1px">${flag}</span>
  </div>`;
    }

    function openCompanySelector() {
      const companies = currentUser.companies;

      // Header: all company logos side by side
      document.getElementById('company-select-logos').innerHTML = companies.map(c => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
      ${renderCompanyLogo(c.logo, c.flag)}
      <span style="font-size:10px;color:#9ca3af;max-width:60px;text-align:center;line-height:1.3">${c.logo.initials}</span>
    </div>
  `).join('');

      // List items
      const list = document.getElementById('company-select-list');
      list.innerHTML = companies.map(c => `
    <div class="company-select-item" onclick="selectCompany('${c.code}','${c.name}','${c.flag}')">
      ${renderCompanyLogo(c.logo, c.flag)}
      <div>
        <div class="company-select-item-name">${c.name}</div>
        <div class="company-select-item-sub">担当案件: ${c.projects.join(', ')}</div>
      </div>
    </div>
  `).join('');

      document.getElementById('company-select-screen').classList.remove('hidden');
    }

    function selectCompany(code, name, flag) {
      document.getElementById('company-select-screen').classList.add('hidden');
      currentUser.companyName = name;

      // Find logo data for selected company
      const companyObj = currentUser.companies.find(c => c.code === code);
      const logo = companyObj ? companyObj.logo : null;
      const logoArea = document.getElementById('sidebar-logo-area');
      if (logo) {
        const radius = logo.shape === 'circle' ? '50%' : '8px';
        logoArea.innerHTML = `<div style="display:flex;align-items:center;gap:10px">
      <div style="width:40px;height:40px;border-radius:${radius};background:${logo.color};
        display:flex;align-items:center;justify-content:center;
        font-size:13px;font-weight:800;color:${logo.textColor};flex-shrink:0">
        ${logo.initials}
      </div>
      <span style="font-size:13px;font-weight:700;color:#fff;opacity:0.9;line-height:1.3">${name}</span>
    </div>`;
      }

      document.getElementById('main-app').style.display = 'flex';
      document.getElementById('user-avatar').textContent = currentUser.avatar;
      document.getElementById('sidebar-admin').style.display = 'none';
      document.getElementById('sidebar-company').style.display = 'flex';
      document.getElementById('project-select').style.display = 'none';
      document.getElementById('role-switcher').style.display = 'none';
      document.getElementById('nav-admin-tools').style.display = 'none';
      document.getElementById('sidebar-company-name').textContent = flag + ' ' + name;
      document.getElementById('btn-switch-company').style.display = 'block';
      showNavLevel(1);
      navigate('projects', document.querySelector('#nav-level1 .nav-item[onclick*="projects"]'));
      updateAllUnreadBadges();
    }

    // ===== ROLE SWITCHER (for 'both' role) =====
    let currentMode = 'admin'; // 'admin' or 'company'
    function switchRole() {
      if (!currentUser || currentUser.role !== 'both') return;
      if (currentMode === 'company') {
        // Switch to Admin mode
        currentMode = 'admin';
        document.getElementById('sidebar-company').style.display = 'none';
        document.getElementById('sidebar-admin').style.display = 'flex';
        document.getElementById('role-switcher-label').textContent = '🏢 Projectモードへ';
        navigate('admin-dashboard', document.querySelector('#sidebar-admin .nav-item'));
      } else {
        // Switch to Company/Project mode
        currentMode = 'company';
        document.getElementById('sidebar-admin').style.display = 'none';
        document.getElementById('sidebar-company').style.display = 'flex';
        document.getElementById('role-switcher-label').textContent = '🔑 Adminモードへ';
        document.getElementById('nav-admin-tools').style.display = 'block';
        if (currentUser.companyName) document.getElementById('sidebar-company-name').textContent = currentUser.companyName;
        showNavLevel(1);
        navigate('projects', document.querySelector('#nav-level1 .nav-item[onclick*="projects"]'));
        updateAllUnreadBadges();
      }
    }

    // ===== LOGOUT =====
    function doLogout() {
      currentUser = null;
      currentMode = 'admin';
      document.getElementById('login-screen').classList.remove('hidden');
      document.getElementById('company-select-screen').classList.add('hidden');
      document.getElementById('main-app').style.display = 'none';
      document.getElementById('login-id').value = '';
      document.getElementById('login-pass').value = '';
      document.getElementById('sidebar-admin').style.display = 'none';
      document.getElementById('sidebar-company').style.display = 'none';
      document.getElementById('btn-switch-company').style.display = 'none';
      document.getElementById('sidebar-logo-area').innerHTML =
        '<img src="https://e-mind.ltd/wp-content/uploads/2022/08/500_120_emaind_logo_horizontal_simple.png" alt="E-Mind" style="width:120px;height:auto;filter:brightness(0) invert(1);opacity:0.9">';
    }

    // ===== NAV LEVEL SWITCH =====
    function showNavLevel(level) {
      document.getElementById('nav-level1').style.display = level === 1 ? 'block' : 'none';
      document.getElementById('nav-level2').style.display = level === 2 ? 'block' : 'none';
      // Level 1 global badge only visible when no project is open
      const g = document.getElementById('chat-notif-global');
      if (g) g.style.visibility = level === 1 ? 'visible' : 'hidden';
    }

    // ===== OPEN PROJECT =====
    function openProject(code, name) {
      currentProjectId = code;
      currentRoomId = null;
      document.getElementById('selected-project-name').textContent = name;
      showNavLevel(2);
      navigate('schedule', document.querySelector('#nav-level2 .nav-item[onclick*="schedule"]'));
      ganttRender();
      updateAllUnreadBadges();
    }

    // ===== BACK TO PROJECTS =====
    function backToProjects() {
      showNavLevel(1);
      navigate('projects', document.querySelector('#nav-level1 .nav-item'));
    }

    // ===== NAVIGATE =====
    function navigate(key, navEl) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

      const p = pages[key];
      if (!p) return;
      document.getElementById(p.id).classList.add('active');
      document.getElementById('page-title').textContent = p.title;
      if (navEl) navEl.classList.add('active');
      else if (event && event.currentTarget) event.currentTarget.classList.add('active');

      if (key === 'chat') {
        // Level 2 nav always means project-scoped chat; Level 1 nav sets global via navigateChatGlobal()
        if (document.getElementById('nav-level2').style.display !== 'none') chatViewMode = 'project';
        showChatNoRoom();
        renderChatPage();
        updateCreateRoomBtn();
      }
      if (key === 'progress') {
        taskTableRender();
      }
      if (key === 'project-overview') {
        initProjectOverview();
      }
      if (key === 'my-plan') {
        initMyPlan();
      }
      if (key === 'personal-plan') {
        initPersonalPlan();
      }
      if (key === 'admin-master') {
        renderPlanMaster();
      }
      if (key === 'admin-dummy-data') {
        renderDummyContractsTable();
      }
      if (key === 'admin-dashboard') {
        applyDashboardMetrics();
        renderInteractiveRevenueChart();
        if (typeof window.renderDailyCashflowDashboard === 'function') {
          window.renderDailyCashflowDashboard();
        }
      }
    }

    // Enter key to send chat message
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'chat-input') {
        sendChatMessage();
      }
      // Ctrl+K / Cmd+K → open global chat search (when on chat page)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        const chatPage = document.getElementById('page-chat');
        if (chatPage && chatPage.classList.contains('active')) {
          e.preventDefault();
          openGlobalSearch();
        }
      }
      // Escape → close global search or message search
      if (e.key === 'Escape') {
        const overlay = document.getElementById('global-search-overlay');
        if (overlay && overlay.classList.contains('open')) { closeGlobalSearch(); return; }
        const msgBar = document.getElementById('chat-msg-search');
        if (msgBar && msgBar.classList.contains('open')) { closeMsgSearch(); }
      }
    });

    // ===== COMPANY MANAGEMENT =====
    function openAddCompany() {
      document.getElementById('modal-company-title').textContent = '🏢 会社登録';
      document.getElementById('company-code').value = 'COMP-005（自動発行）';
      document.getElementById('company-name').value = '';
      document.getElementById('company-address').value = '';
      document.getElementById('company-country').selectedIndex = 0;
      document.getElementById('modal-company').classList.add('open');
    }

    function openEditCompany(code, name) {
      document.getElementById('modal-company-title').textContent = '🏢 会社編集';
      document.getElementById('company-code').value = code;
      document.getElementById('company-name').value = name;
      document.getElementById('modal-company').classList.add('open');
    }

    function confirmToggleCompany(code, action) {
      if (confirm(code + ' を' + action + 'してもよいですか？')) {
        alert('会社ステータスを変更しました：' + action);
      }
    }

    function saveCompany() {
      const name = document.getElementById('company-name').value.trim();
      if (!name) { alert('会社名を入力してください。'); return; }
      document.getElementById('modal-company').classList.remove('open');
      alert('保存しました：' + name);
    }

    // ===== LICENSE MANAGEMENT =====
    const licenseData = {
      'COMP-001': {
        name: 'E-Mind株式会社',
        country: '🇯🇵 日本', address: '東京都渋谷区...',
        info: {
          nameJa: 'E-Mind株式会社', nameEn: 'E-Mind Co., Ltd.',
          country: '日本', zip: '150-0001', address: '東京都渋谷区神宮前1-1-1',
          tel: '03-1234-5678', email: 'info@e-mind.co.jp',
          contact: '田中 太郎', website: 'https://e-mind.co.jp',
          industry: 'IT・ソフトウェア', note: '',
          registeredAt: '2025/01/01'
        },
        current: { start: '2025-01-01', end: '', users: '', status: '有効', note: 'デフォルトライセンス', reason: '初期設定', updatedAt: '2025/01/01' },
        history: []
      },
      'COMP-002': {
        name: 'ABC Manufacturing Vietnam',
        country: '🇻🇳 ベトナム', address: 'ホーチミン市...',
        info: {
          nameJa: 'ABCマニュファクチャリング ベトナム', nameEn: 'ABC Manufacturing Vietnam',
          country: 'ベトナム', zip: '700000', address: 'ホーチミン市ビンタン区...',
          tel: '+84-28-1234-5678', email: 'contact@abc-mfg.vn',
          contact: 'Nguyen Van A', website: 'https://abc-mfg.vn',
          industry: '製造業', note: '',
          registeredAt: '2025/03/15'
        },
        current: { start: '2025-03-15', end: '2026-06-30', users: '50', status: '有効', note: '年間ライセンス', reason: '年間契約更新', updatedAt: '2025/03/15' },
        history: [
          { start: '2024-03-15', end: '2025-03-14', users: '30', status: '無効', note: '前年ライセンス', reason: '初回契約', updatedAt: '2024/03/15' }
        ]
      },
      'COMP-003': {
        name: 'Techno Solutions',
        country: '🇯🇵 日本', address: '大阪府大阪市...',
        info: {
          nameJa: 'テクノソリューションズ株式会社', nameEn: 'Techno Solutions Co., Ltd.',
          country: '日本', zip: '530-0001', address: '大阪府大阪市北区梅田2-2-2',
          tel: '06-9876-5432', email: 'info@techno-sol.co.jp',
          contact: '鈴木 次郎', website: '',
          industry: 'IT・コンサルティング', note: 'ライセンス期限切れ要対応',
          registeredAt: '2024/10/01'
        },
        current: { start: '2024-10-01', end: '2025-03-31', users: '20', status: '無効', note: '期限切れ（要更新）', reason: '初回契約', updatedAt: '2024/10/01' },
        history: []
      },
      'COMP-004': {
        name: 'DevStar Co., Ltd.',
        country: '🇻🇳 ベトナム', address: 'ハノイ市...',
        info: {
          nameJa: 'デブスター', nameEn: 'DevStar Co., Ltd.',
          country: 'ベトナム', zip: '100000', address: 'ハノイ市ホアンキエム区...',
          tel: '+84-24-3456-7890', email: 'hello@devstar.vn',
          contact: 'Tran Thi B', website: 'https://devstar.vn',
          industry: 'IT・開発', note: '',
          registeredAt: '2025/04/01'
        },
        current: { start: '2025-04-01', end: '2026-09-30', users: '30', status: '有効', note: '', reason: '新規契約', updatedAt: '2025/04/01' },
        history: []
      }
    };

    function calcDaysLeft(endStr) {
      if (!endStr) return null;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const end = new Date(endStr);
      return Math.round((end - today) / 86400000);
    }

    function renderLicenseTable() {
      const tbody = document.getElementById('license-tbody');
      if (!tbody) return;
      tbody.innerHTML = Object.entries(licenseData).map(([code, d]) => {
        const c = d.current;
        const days = calcDaysLeft(c.end);
        let daysHtml, statusHtml;
        if (!c.end) {
          daysHtml = '<span style="color:#16a34a;font-weight:600">∞</span>';
          statusHtml = '<span class="status-active">● 有効</span>';
        } else if (days < 0) {
          daysHtml = '<span style="color:#991b1b;font-weight:600">期限切れ</span>';
          statusHtml = '<span class="status-inactive">○ 無効</span>';
        } else if (days <= 180) {
          daysHtml = `<span style="color:#f59e0b;font-weight:600">+${days}日</span>`;
          statusHtml = c.status === '有効' ? '<span class="status-active">● 有効</span>' : '<span class="status-inactive">○ 無効</span>';
        } else {
          daysHtml = `<span style="color:#16a34a;font-weight:600">+${days}日</span>`;
          statusHtml = c.status === '有効' ? '<span class="status-active">● 有効</span>' : '<span class="status-inactive">○ 無効</span>';
        }
        const histCount = d.history.length;
        const nameExtra = code === 'COMP-001' ? ' <span style="font-size:10px;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:10px">デフォルト</span>' : '';
        return `<tr>
      <td><a href="javascript:void(0)" onclick="openCompanyInfo('${code}')" style="font-family:monospace;font-size:12px;background:#f1f5f9;color:#0ABAB5;padding:2px 8px;border-radius:4px;border:1px solid #e2e8f0;text-decoration:none;font-weight:600;white-space:nowrap" title="会社情報を見る">${code}</a></td>
      <td><strong>${d.name}</strong>${nameExtra}</td>
      <td>${d.country || '—'}</td>
      <td style="font-size:12px">${d.address || '—'}</td>
      <td>${c.start ? c.start.replace(/-/g, '/') : '—'}</td>
      <td>${c.end ? c.end.replace(/-/g, '/') : '—（無期限）'}</td>
      <td>${c.users ? c.users + '名' : '無制限'}</td>
      <td>${daysHtml}</td>
      <td>${statusHtml}</td>
      <td style="font-size:12px;color:#6b7280">${c.updatedAt}<br><span style="font-size:11px">${c.reason || ''}</span></td>
      <td style="white-space:nowrap;display:flex;flex-wrap:wrap;gap:4px;padding:10px 8px">
        <button class="btn btn-outline btn-sm" onclick="openEditLicense('${code}')" title="現在の情報を修正（履歴に残らない）">✏️ 編集</button>
        <button class="btn btn-sm" style="background:#0ABAB5;color:#fff" onclick="openRenewLicense('${code}')" title="ライセンスを更新（履歴に保存される）">🔄 更新</button>
        <button class="btn btn-outline btn-sm" style="color:#0ABAB5;border-color:#0ABAB5" onclick="openLicenseHistory('${code}')">📋 履歴${histCount > 0 ? ` (${histCount})` : ''}</button>
      </td>
    </tr>`;
      }).join('');
    }

    function openNewLicense() {
      document.getElementById('modal-license-title').textContent = '🔐 ライセンス登録';
      document.getElementById('license-mode').value = 'new';
      document.getElementById('license-edit-code').value = '';
      document.getElementById('license-company').value = '';
      document.getElementById('license-company').disabled = false;
      document.getElementById('license-users').value = '';
      document.getElementById('license-start').value = '';
      document.getElementById('license-end').value = '';
      document.getElementById('license-status').value = '有効';
      document.getElementById('license-note').value = '';
      document.getElementById('license-reason').value = '';
      document.getElementById('license-current-info').style.display = 'none';
      document.getElementById('license-reason-group').style.display = 'none';
      document.getElementById('license-save-btn').textContent = '登録';
      document.getElementById('modal-license').classList.add('open');
    }

    function openEditLicense(code) {
      const d = licenseData[code];
      if (!d) return;
      const c = d.current;
      document.getElementById('modal-license-title').textContent = '✏️ ライセンス編集 — ' + d.name;
      document.getElementById('license-mode').value = 'edit';
      document.getElementById('license-edit-code').value = code;
      document.getElementById('license-company').value = code;
      document.getElementById('license-company').disabled = true;
      document.getElementById('license-users').value = c.users || '';
      document.getElementById('license-start').value = c.start || '';
      document.getElementById('license-end').value = c.end || '';
      document.getElementById('license-status').value = c.status || '有効';
      document.getElementById('license-note').value = c.note || '';
      document.getElementById('license-reason').value = '';
      document.getElementById('license-current-info').style.display = 'none';
      document.getElementById('license-reason-group').style.display = 'none';
      document.getElementById('license-save-btn').textContent = '保存';
      document.getElementById('modal-license').classList.add('open');
    }

    function openRenewLicense(code) {
      const d = licenseData[code];
      if (!d) return;
      const c = d.current;
      document.getElementById('modal-license-title').textContent = '🔄 ライセンス更新 — ' + d.name;
      document.getElementById('license-mode').value = 'renew';
      document.getElementById('license-edit-code').value = code;
      document.getElementById('license-company').value = code;
      document.getElementById('license-company').disabled = true;
      document.getElementById('license-users').value = c.users || '';
      document.getElementById('license-start').value = '';
      document.getElementById('license-end').value = '';
      document.getElementById('license-status').value = '有効';
      document.getElementById('license-note').value = c.note || '';
      document.getElementById('license-reason').value = '';
      // 現在情報を表示
      const fmt = v => v ? v.replace(/-/g, '/') : '無期限';
      document.getElementById('license-current-summary').innerHTML =
        `${fmt(c.start)} 〜 ${fmt(c.end)}&nbsp;&nbsp;|&nbsp;&nbsp;${c.users ? c.users + '名' : '無制限'}&nbsp;&nbsp;|&nbsp;&nbsp;${c.status}`;
      document.getElementById('license-current-info').style.display = 'block';
      document.getElementById('license-reason-group').style.display = 'block';
      document.getElementById('license-save-btn').textContent = '更新して履歴に保存';
      document.getElementById('modal-license').classList.add('open');
    }

    function saveLicense() {
      const mode = document.getElementById('license-mode').value;
      const editCode = document.getElementById('license-edit-code').value;
      const company = editCode || document.getElementById('license-company').value;
      const start = document.getElementById('license-start').value;
      if (!company) { alert('会社を選択してください。'); return; }
      if (!start && mode !== 'edit') { alert('ライセンス開始日を入力してください。'); return; }
      if (mode === 'renew' && !document.getElementById('license-reason').value.trim()) {
        alert('更新理由を入力してください。'); return;
      }

      const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/');

      if (mode === 'edit') {
        // 編集: 現在データを上書きするだけ、履歴は作らない
        const c = licenseData[editCode].current;
        licenseData[editCode].current = {
          start: document.getElementById('license-start').value || c.start,
          end: document.getElementById('license-end').value || c.end,
          users: document.getElementById('license-users').value || c.users,
          status: document.getElementById('license-status').value,
          note: document.getElementById('license-note').value,
          reason: c.reason,
          updatedAt: today
        };
        document.getElementById('license-company').disabled = false;
        document.getElementById('modal-license').classList.remove('open');
        renderLicenseTable(); updateLicenseCount();
        alert('ライセンス情報を修正しました。');

      } else if (mode === 'renew') {
        // 更新: 現在データを履歴に追加し、新データをcurrentに
        const old = Object.assign({}, licenseData[editCode].current);
        old.updatedAt = today;
        licenseData[editCode].history.unshift(old);
        licenseData[editCode].current = {
          start: start,
          end: document.getElementById('license-end').value,
          users: document.getElementById('license-users').value,
          status: document.getElementById('license-status').value,
          note: document.getElementById('license-note').value,
          reason: document.getElementById('license-reason').value,
          updatedAt: today
        };
        document.getElementById('license-company').disabled = false;
        document.getElementById('modal-license').classList.remove('open');
        renderLicenseTable(); updateLicenseCount();
        alert('ライセンスを更新しました。更新前の情報は履歴に保存されました。');

      } else {
        // 新規登録
        if (licenseData[company]) {
          licenseData[company].current = {
            start, end: document.getElementById('license-end').value,
            users: document.getElementById('license-users').value,
            status: document.getElementById('license-status').value,
            note: document.getElementById('license-note').value,
            reason: '新規登録', updatedAt: today
          };
        }
        document.getElementById('modal-license').classList.remove('open');
        renderLicenseTable(); updateLicenseCount();
        alert('ライセンスを登録しました。');
      }
    }

    function openLicenseHistory(code) {
      const d = licenseData[code];
      if (!d) return;
      document.getElementById('modal-history-title').textContent = '📋 ライセンス履歴 — ' + d.name + ' (' + code + ')';
      const rows = d.history.length === 0
        ? '<div style="color:#9ca3af;font-size:13px;padding:16px 0">変更履歴はありません。</div>'
        : `<table class="data-table" style="min-width:400px;width:100%"><thead><tr>
        <th style="white-space:nowrap">開始日</th>
        <th style="white-space:nowrap">終了日</th>
        <th style="white-space:nowrap">ユーザー数</th>
        <th style="white-space:nowrap">更新日</th>
      </tr></thead><tbody>` +
        d.history.map(h => `<tr>
        <td style="white-space:nowrap">${h.start ? h.start.replace(/-/g, '/') : '—'}</td>
        <td style="white-space:nowrap">${h.end ? h.end.replace(/-/g, '/') : '無期限'}</td>
        <td style="white-space:nowrap;text-align:center">${h.users ? h.users + '名' : '無制限'}</td>
        <td style="font-size:12px;white-space:nowrap">${h.updatedAt}</td>
      </tr>`).join('') + '</tbody></table>';

      document.getElementById('modal-history-content').innerHTML =
        `<div style="margin-bottom:12px;font-size:13px;color:#374151">
       <strong>現在のライセンス:</strong> ${d.current.start ? d.current.start.replace(/-/g, '/') : '—'} 〜 ${d.current.end ? d.current.end.replace(/-/g, '/') : '無期限'}
       &nbsp;/&nbsp; ${d.current.users ? d.current.users + '名' : '無制限'}
       &nbsp;/&nbsp; ${d.current.status}
     </div>
     <div class="card-title" style="margin-bottom:8px">過去の履歴</div>
     ${rows}`;
      document.getElementById('modal-license-history').classList.add('open');
    }

    // ===== 会社情報 =====
    function openCompanyInfo(code) {
      const d = licenseData[code];
      if (!d) return;
      const i = d.info || {};
      document.getElementById('ci-edit-code').value = code;
      document.getElementById('ci-modal-title').textContent = d.name;
      document.getElementById('ci-modal-code').textContent = code;
      document.getElementById('ci-name-ja').value = i.nameJa || d.name || '';
      document.getElementById('ci-name-en').value = i.nameEn || '';
      document.getElementById('ci-country').value = i.country || '日本';
      document.getElementById('ci-zip').value = i.zip || '';
      document.getElementById('ci-address').value = i.address || d.address || '';
      document.getElementById('ci-tel').value = i.tel || '';
      document.getElementById('ci-email').value = i.email || '';
      document.getElementById('ci-contact').value = i.contact || '';
      document.getElementById('ci-industry').value = i.industry || '';
      document.getElementById('ci-website').value = i.website || '';
      document.getElementById('ci-note').value = i.note || '';
      document.getElementById('ci-registered-at').textContent = i.registeredAt || '—';
      document.getElementById('modal-company-info').classList.add('open');
    }

    function saveCompanyInfo() {
      const code = document.getElementById('ci-edit-code').value;
      if (!code || !licenseData[code]) return;
      const nameJa = document.getElementById('ci-name-ja').value.trim();
      if (!nameJa) { alert('会社名（日本語）を入力してください。'); return; }
      const country = document.getElementById('ci-country').value;
      const flagMap = { '日本': '🇯🇵 日本', 'ベトナム': '🇻🇳 ベトナム', 'その他': '🌐 その他' };
      licenseData[code].name = nameJa;
      licenseData[code].country = flagMap[country] || country;
      licenseData[code].address = document.getElementById('ci-address').value.trim();
      licenseData[code].info = {
        nameJa,
        nameEn: document.getElementById('ci-name-en').value.trim(),
        country,
        zip: document.getElementById('ci-zip').value.trim(),
        address: document.getElementById('ci-address').value.trim(),
        tel: document.getElementById('ci-tel').value.trim(),
        email: document.getElementById('ci-email').value.trim(),
        contact: document.getElementById('ci-contact').value.trim(),
        industry: document.getElementById('ci-industry').value.trim(),
        website: document.getElementById('ci-website').value.trim(),
        note: document.getElementById('ci-note').value.trim(),
        registeredAt: document.getElementById('ci-registered-at').textContent
      };
      document.getElementById('modal-company-info').classList.remove('open');
      renderLicenseTable(); updateLicenseCount();
      alert('会社情報を保存しました。');
    }

    // 会社ライセンス件数表示
    function updateLicenseCount() {
      const el = document.getElementById('license-count');
      if (!el) return;
      const total = Object.keys(licenseData).length;
      const active = Object.values(licenseData).filter(d => d.current.status === '有効').length;
      el.textContent = `全${total}件 / うち有効${active}件`;
    }

    // 初期テーブル描画
    document.addEventListener('DOMContentLoaded', () => {
      renderLicenseTable();
      updateLicenseCount();
      renderPersonalLicenseTable();
      renderAdminUserTable(adminUserData);
      renderPlanMaster();
    });

    // ===== 個人ライセンス一覧 =====
    const personalLicenseData = {
      'USR-001': {
        name: '山田 花子', email: 'yamada@example.com',
        current: { plan: 'Pro', start: '2025-06-01', end: '2026-06-30', status: '有効', note: '年間プロプラン', reason: '新規登録', updatedAt: '2025/06/01' },
        history: []
      },
      'USR-002': {
        name: '鈴木 一郎', email: 'suzuki@example.com',
        current: { plan: 'Free', start: '', end: '', status: '有効', note: '', reason: '新規登録', updatedAt: '2025/01/15' },
        history: []
      },
      'USR-003': {
        name: '田中 次郎', email: 'tanaka2@example.com',
        current: { plan: 'Basic', start: '2025-04-01', end: '2026-03-31', status: '有効', note: '月次更新中', reason: '新規登録', updatedAt: '2025/04/01' },
        history: []
      },
      'USR-004': {
        name: 'Nguyen Van A', email: 'nguyenvana@example.com',
        current: { plan: 'Pro', start: '2024-11-01', end: '2025-04-30', status: '無効', note: '期限切れ', reason: '初回契約', updatedAt: '2024/11/01' },
        history: [
          { plan: 'Basic', start: '2024-05-01', end: '2024-10-31', status: '無効', note: '', reason: '初回Basic契約', updatedAt: '2024/05/01' }
        ]
      }
    };

    let _plFilteredKeys = null; // for filtered render

    function renderPersonalLicenseTable(filteredKeys) {
      const tbody = document.getElementById('personal-license-tbody');
      if (!tbody) return;
      const keys = filteredKeys || Object.keys(personalLicenseData);
      _plFilteredKeys = filteredKeys || null;

      tbody.innerHTML = keys.map(uid => {
        const d = personalLicenseData[uid];
        if (!d) return '';
        const c = d.current;
        const isFree = c.plan === 'Free';
        const days = isFree ? null : calcDaysLeft(c.end);

        let daysHtml, statusHtml;
        if (isFree) {
          daysHtml = '<span style="color:#6b7280;font-weight:600">—</span>';
          statusHtml = '<span class="badge badge-blue">🆓 Free</span>';
        } else if (!c.end) {
          daysHtml = '<span style="color:#16a34a;font-weight:600">∞</span>';
          statusHtml = c.status === '有効' ? '<span class="status-active">● 有効</span>' : '<span class="status-inactive">○ 無効</span>';
        } else if (days < 0) {
          daysHtml = '<span style="color:#991b1b;font-weight:600">期限切れ</span>';
          statusHtml = '<span class="status-inactive">○ 無効</span>';
        } else if (days <= 60) {
          daysHtml = `<span style="color:#f59e0b;font-weight:600">+${days}日</span>`;
          statusHtml = c.status === '有効' ? '<span class="status-active">● 有効</span>' : '<span class="status-inactive">○ 無効</span>';
        } else {
          daysHtml = `<span style="color:#16a34a;font-weight:600">+${days}日</span>`;
          statusHtml = c.status === '有効' ? '<span class="status-active">● 有効</span>' : '<span class="status-inactive">○ 無効</span>';
        }

        const planBadge = {
          'Free': '<span class="badge badge-gray">Free</span>',
          'Basic': '<span class="badge badge-blue">Basic</span>',
          'Pro': '<span class="badge badge-purple">Pro</span>'
        }[c.plan] || c.plan;

        const histCount = d.history.length;
        return `<tr>
      <td><span class="tag">${uid}</span></td>
      <td><strong>${d.name}</strong></td>
      <td style="font-size:12px;color:#6b7280">${d.email}</td>
      <td>${planBadge}</td>
      <td>${c.start ? c.start.replace(/-/g, '/') : '—'}</td>
      <td>${c.end ? c.end.replace(/-/g, '/') : (isFree ? '無期限' : '—')}</td>
      <td>${daysHtml}</td>
      <td>${statusHtml}</td>
      <td style="font-size:12px;color:#6b7280">${c.updatedAt}<br><span style="font-size:11px">${c.reason || ''}</span></td>
      <td style="white-space:nowrap;display:flex;flex-wrap:wrap;gap:4px;padding:10px 8px">
        <button class="btn btn-outline btn-sm" onclick="openEditPersonalLicense('${uid}')">✏️ 編集</button>
        <button class="btn btn-sm" style="background:#0ABAB5;color:#fff" onclick="openRenewPersonalLicense('${uid}')">🔄 更新</button>
        <button class="btn btn-outline btn-sm" style="color:#0ABAB5;border-color:#0ABAB5" onclick="openPersonalLicenseHistory('${uid}')">📋 履歴${histCount > 0 ? ` (${histCount})` : ''}</button>
      </td>
    </tr>`;
      }).join('');

      const countEl = document.getElementById('personal-license-count');
      if (countEl) {
        const total = Object.keys(personalLicenseData).length;
        const active = Object.values(personalLicenseData).filter(d => d.current.status === '有効').length;
        const shown = keys.length;
        countEl.textContent = filteredKeys
          ? `${shown}件表示 / 全${total}件（有効${active}件）`
          : `全${total}件 / うち有効${active}件`;
      }
    }

    function filterPersonalLicenseTable(q) {
      const plan = document.getElementById('pl-filter-plan')?.value || '';
      const status = document.getElementById('pl-filter-status')?.value || '';
      const lq = q.toLowerCase();
      const keys = Object.keys(personalLicenseData).filter(uid => {
        const d = personalLicenseData[uid];
        const matchText = !lq || d.name.toLowerCase().includes(lq) || d.email.toLowerCase().includes(lq) || uid.toLowerCase().includes(lq);
        const matchPlan = !plan || d.current.plan === plan;
        const matchStatus = !status || d.current.status === status;
        return matchText && matchPlan && matchStatus;
      });
      renderPersonalLicenseTable(keys);
    }

    function _plNextId() {
      const nums = Object.keys(personalLicenseData).map(k => parseInt(k.replace('USR-', '')) || 0);
      return 'USR-' + String(Math.max(0, ...nums) + 1).padStart(3, '0');
    }

    function openNewPersonalLicense() {
      document.getElementById('modal-pl-title').textContent = '👤 個人ライセンス登録';
      document.getElementById('pl-mode').value = 'new';
      document.getElementById('pl-edit-code').value = '';
      document.getElementById('pl-name').value = '';
      document.getElementById('pl-email').value = '';
      document.getElementById('pl-plan').value = 'Basic';
      document.getElementById('pl-start').value = '';
      document.getElementById('pl-end').value = '';
      document.getElementById('pl-status').value = '有効';
      document.getElementById('pl-note').value = '';
      document.getElementById('pl-reason').value = '';
      document.getElementById('pl-current-info').style.display = 'none';
      document.getElementById('pl-reason-group').style.display = 'none';
      document.getElementById('pl-save-btn').textContent = '登録';
      document.getElementById('pl-name').disabled = false;
      document.getElementById('pl-email').disabled = false;
      document.getElementById('modal-personal-license').classList.add('open');
    }

    function openEditPersonalLicense(uid) {
      const d = personalLicenseData[uid]; if (!d) return;
      const c = d.current;
      document.getElementById('modal-pl-title').textContent = '✏️ 個人ライセンス編集 — ' + d.name;
      document.getElementById('pl-mode').value = 'edit';
      document.getElementById('pl-edit-code').value = uid;
      document.getElementById('pl-name').value = d.name;
      document.getElementById('pl-name').disabled = false;
      document.getElementById('pl-email').value = d.email;
      document.getElementById('pl-email').disabled = false;
      document.getElementById('pl-plan').value = c.plan || 'Basic';
      document.getElementById('pl-start').value = c.start || '';
      document.getElementById('pl-end').value = c.end || '';
      document.getElementById('pl-status').value = c.status || '有効';
      document.getElementById('pl-note').value = c.note || '';
      document.getElementById('pl-reason').value = '';
      document.getElementById('pl-current-info').style.display = 'none';
      document.getElementById('pl-reason-group').style.display = 'none';
      document.getElementById('pl-save-btn').textContent = '保存';
      document.getElementById('modal-personal-license').classList.add('open');
    }

    function openRenewPersonalLicense(uid) {
      const d = personalLicenseData[uid]; if (!d) return;
      const c = d.current;
      document.getElementById('modal-pl-title').textContent = '🔄 個人ライセンス更新 — ' + d.name;
      document.getElementById('pl-mode').value = 'renew';
      document.getElementById('pl-edit-code').value = uid;
      document.getElementById('pl-name').value = d.name;
      document.getElementById('pl-name').disabled = true;
      document.getElementById('pl-email').value = d.email;
      document.getElementById('pl-email').disabled = true;
      document.getElementById('pl-plan').value = c.plan || 'Basic';
      document.getElementById('pl-start').value = '';
      document.getElementById('pl-end').value = '';
      document.getElementById('pl-status').value = '有効';
      document.getElementById('pl-note').value = c.note || '';
      document.getElementById('pl-reason').value = '';
      const fmt = v => v ? v.replace(/-/g, '/') : '—';
      document.getElementById('pl-current-summary').innerHTML =
        `プラン: ${c.plan} &nbsp;|&nbsp; ${fmt(c.start)} 〜 ${fmt(c.end)} &nbsp;|&nbsp; ${c.status}`;
      document.getElementById('pl-current-info').style.display = 'block';
      document.getElementById('pl-reason-group').style.display = 'block';
      document.getElementById('pl-save-btn').textContent = '更新して履歴に保存';
      document.getElementById('modal-personal-license').classList.add('open');
    }

    function savePersonalLicense() {
      const mode = document.getElementById('pl-mode').value;
      const editUid = document.getElementById('pl-edit-code').value;
      const name = document.getElementById('pl-name').value.trim();
      const email = document.getElementById('pl-email').value.trim();
      const plan = document.getElementById('pl-plan').value;
      const start = document.getElementById('pl-start').value;
      const end = document.getElementById('pl-end').value;
      const status = document.getElementById('pl-status').value;
      const note = document.getElementById('pl-note').value.trim();
      const reason = document.getElementById('pl-reason').value.trim();

      if (!name) { alert('氏名を入力してください。'); return; }
      if (!email) { alert('メールアドレスを入力してください。'); return; }
      if (mode === 'renew' && !reason) { alert('更新理由を入力してください。'); return; }
      if (mode !== 'edit' && plan !== 'Free' && !start) { alert('ライセンス開始日を入力してください。'); return; }

      const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });

      if (mode === 'edit') {
        const c = personalLicenseData[editUid].current;
        personalLicenseData[editUid].name = name;
        personalLicenseData[editUid].email = email;
        personalLicenseData[editUid].current = { ...c, plan, start: start || c.start, end: end || c.end, status, note, updatedAt: today };
        document.getElementById('modal-personal-license').classList.remove('open');
        renderPersonalLicenseTable(_plFilteredKeys || undefined);
        alert('個人ライセンス情報を修正しました。');

      } else if (mode === 'renew') {
        const old = Object.assign({}, personalLicenseData[editUid].current);
        old.updatedAt = today;
        personalLicenseData[editUid].history.unshift(old);
        personalLicenseData[editUid].current = { plan, start, end, status, note, reason, updatedAt: today };
        document.getElementById('modal-personal-license').classList.remove('open');
        renderPersonalLicenseTable(_plFilteredKeys || undefined);
        alert('個人ライセンスを更新しました。更新前の情報は履歴に保存されました。');

      } else {
        const uid = _plNextId();
        personalLicenseData[uid] = {
          name, email,
          current: { plan, start: plan === 'Free' ? '' : start, end: plan === 'Free' ? '' : end, status, note, reason: '新規登録', updatedAt: today },
          history: []
        };
        document.getElementById('modal-personal-license').classList.remove('open');
        renderPersonalLicenseTable();
        alert(`個人ライセンスを登録しました。（${uid}）`);
      }
    }

    function openPersonalLicenseHistory(uid) {
      const d = personalLicenseData[uid]; if (!d) return;
      document.getElementById('modal-pl-history-title').textContent = '📋 個人ライセンス履歴 — ' + d.name + ' (' + uid + ')';
      const rows = d.history.length === 0
        ? '<div style="color:#9ca3af;font-size:13px;padding:16px 0">変更履歴はありません。</div>'
        : `<table class="data-table" style="min-width:400px;width:100%"><thead><tr>
        <th>プラン</th><th>開始日</th><th>終了日</th><th>更新日</th>
      </tr></thead><tbody>` +
        d.history.map(h => `<tr>
        <td>${h.plan || '—'}</td>
        <td>${h.start ? h.start.replace(/-/g, '/') : '—'}</td>
        <td>${h.end ? h.end.replace(/-/g, '/') : '無期限'}</td>
        <td style="font-size:12px;white-space:nowrap">${h.updatedAt || '—'}</td>
      </tr>`).join('') + '</tbody></table>';
      document.getElementById('modal-pl-history-content').innerHTML =
        `<div style="margin-bottom:12px;font-size:13px;color:#374151">
       <strong>現在:</strong> ${d.current.plan} &nbsp;/&nbsp; ${d.current.start ? d.current.start.replace(/-/g, '/') : '—'} 〜 ${d.current.end ? d.current.end.replace(/-/g, '/') : '無期限'} &nbsp;/&nbsp; ${d.current.status}
     </div>
     <div class="card-title" style="margin-bottom:8px">過去の履歴</div>${rows}`;
      document.getElementById('modal-pl-history').classList.add('open');
    }

    // 初期テーブル描画 (旧 DOMContentLoaded は上に移動済み)

    // ===== COMPANY USER MANAGEMENT =====
    const companyUserData = {
      'tanaka@emind.co.jp': { name: '田中 一郎', kubun: '社内', admin: true, active: true, note: '', invitedAt: '2025/01/01 09:00', joinedAt: '2025/01/05 14:30' },
      'sato@emind.co.jp': { name: '佐藤 花子', kubun: '社内', admin: false, active: true, note: '', invitedAt: '2025/01/15 10:00', joinedAt: '2025/01/20 09:15' },
      'yamada@emind.co.jp': { name: '山田 次郎', kubun: '社内', admin: false, active: true, note: '', invitedAt: '2025/02/01 09:00', joinedAt: '2025/02/03 11:00' },
      'linh@emind.co.jp': { name: 'LINH Nguyen', kubun: '社外', admin: false, active: true, note: '', invitedAt: '2025/02/15 14:00', joinedAt: '2025/02/17 10:30' },
      'suzuki@emind.co.jp': { name: null, kubun: '社外', admin: false, active: false, note: '', invitedAt: '2025/05/24 10:00', joinedAt: null },
    };

    function updateKubunStyle() {
      const isShaunai = document.getElementById('u-kubun-shaunai').checked;
      document.getElementById('label-shaunai').style.borderColor = isShaunai ? '#3c8b86' : '#d1d5db';
      document.getElementById('label-shaunai').style.background = isShaunai ? '#eff6ff' : '';
      document.getElementById('label-shagaisoc').style.borderColor = isShaunai ? '#d1d5db' : '#3c8b86';
      document.getElementById('label-shagaisoc').style.background = isShaunai ? '' : '#fffbeb';
    }

    function resetKubunStyle() {
      ['label-shaunai', 'label-shagaisoc'].forEach(id => {
        document.getElementById(id).style.borderColor = '#d1d5db';
        document.getElementById(id).style.background = '';
      });
    }

    function openAddUser() {
      document.getElementById('modal-user-title').textContent = '👤 会社メンバー追加';
      document.getElementById('u-email').value = '';
      document.getElementById('u-email').readOnly = false;
      document.getElementById('u-note').value = '';
      document.getElementById('u-admin').checked = false;
      document.getElementById('u-kubun-shaunai').checked = false;
      document.getElementById('u-kubun-shagai').checked = false;
      resetKubunStyle();
      document.getElementById('u-name-row').style.display = 'none';
      document.getElementById('u-info-section').style.display = 'none';
      document.getElementById('u-resend-btn').style.display = 'none';
      document.getElementById('u-submit-btn').textContent = '招待メール送信';
      document.getElementById('modal-user').classList.add('open');
    }

    function openEditUser(email) {
      const u = companyUserData[email];
      const isActive = u && u.active;

      document.getElementById('modal-user-title').textContent = '👤 会社メンバー編集';
      document.getElementById('u-email').value = email;
      document.getElementById('u-email').readOnly = true;
      document.getElementById('u-note').value = u ? u.note : '';
      document.getElementById('u-admin').checked = u ? !!u.admin : false;
      document.getElementById('u-kubun-shaunai').checked = u ? u.kubun === '社内' : false;
      document.getElementById('u-kubun-shagai').checked = u ? u.kubun === '社外' : false;
      updateKubunStyle();

      // 名前表示（アクティブのみ）
      document.getElementById('u-name-row').style.display = isActive ? '' : 'none';
      if (isActive) document.getElementById('u-name-display').textContent = u.name || '';

      // 招待・参加情報
      document.getElementById('u-info-section').style.display = '';
      document.getElementById('u-invited-at').textContent = u ? (u.invitedAt || '—') : '—';
      const joinedEl = document.getElementById('u-joined-at');
      if (isActive) {
        joinedEl.textContent = u.joinedAt || '—';
        joinedEl.style.color = '#374151';
        joinedEl.style.fontStyle = '';
      } else {
        joinedEl.textContent = '未参加';
        joinedEl.style.color = '#9ca3af';
        joinedEl.style.fontStyle = 'italic';
      }

      // フッターボタン
      document.getElementById('u-resend-btn').style.display = isActive ? 'none' : '';
      document.getElementById('u-submit-btn').textContent = '保存';
      document.getElementById('modal-user').classList.add('open');
    }

    function resendInvite() {
      const email = document.getElementById('u-email').value;
      alert('招待メールを ' + email + ' に再送信しました。');
    }

    function saveUser() {
      const email = document.getElementById('u-email').value.trim();
      const kubun = document.querySelector('input[name="u-kubun"]:checked')?.value || '';
      const admin = document.getElementById('u-admin').checked;
      const note = document.getElementById('u-note').value;
      const isEdit = document.getElementById('u-email').readOnly;
      if (!email) { alert('メールアドレスを入力してください。'); return; }
      if (!kubun) { alert('社員区分（社内／社外）を選択してください。'); return; }
      if (isEdit && companyUserData[email]) {
        const u = companyUserData[email];
        companyUserData[email] = { ...u, kubun, admin, note };
      } else {
        const now = new Date().toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '/');
        companyUserData[email] = { name: null, kubun, admin, active: false, note, invitedAt: now, joinedAt: null };
      }
      document.getElementById('modal-user').classList.remove('open');
      alert(isEdit ? '会社メンバー情報を更新しました。' : '招待メールを ' + email + ' に送信しました。');
    }

    // ===== ADMIN USER MANAGEMENT =====
    const adminUserData = {
      'emind@emind.co.jp': {
        last: 'E-Mind', first: 'emind', avatarBg: '#089490', avatarText: 'EM',
        registered: '2026/04/01', locked: true,
        companies: [
          { name: 'E-Mind株式会社', flag: '🏢', role: 'システム管理者', lastLogin: '2026/04/01', status: '有効' }
        ]
      },
      'admin@emind.co.jp': {
        last: 'Admin', first: 'User', avatarBg: '#0ABAB5', avatarText: 'AD',
        registered: '2025/01/01', locked: true,
        companies: [
          { name: 'E-Mind株式会社', flag: '🏢', role: 'システム管理者', lastLogin: '2026/03/30', status: '有効' }
        ]
      },
      'tanaka@abc-vn.com': {
        last: '田中', first: '一郎', avatarBg: '#0ABAB5', avatarText: '田中',
        registered: '2025/03/15', locked: false,
        companies: [
          { name: 'ABC Manufacturing Vietnam', flag: '🇻🇳', role: '会社管理者', lastLogin: '2026/03/28', status: '有効' },
          { name: 'Techno Solutions', flag: '🇯🇵', role: 'メンバー', lastLogin: '2026/01/10', status: '有効' }
        ]
      },
      'sato@devstar.vn': {
        last: '佐藤', first: '花子', avatarBg: '#10b981', avatarText: '佐藤',
        registered: '2025/04/01', locked: false,
        companies: [
          { name: 'DevStar Co., Ltd.', flag: '🇻🇳', role: '会社管理者', lastLogin: '2026/03/25', status: '有効' }
        ]
      },
      'yamada@techno-sol.jp': {
        last: '山田', first: '次郎', avatarBg: '#f59e0b', avatarText: '山田',
        registered: '2025/10/01', locked: false,
        companies: [
          { name: 'Techno Solutions', flag: '🇯🇵', role: 'メンバー', lastLogin: null, status: '認証待ち' }
        ]
      }
    };

    let currentPanelEmail = null;

    function renderAdminUserTable(data) {
      const tbody = document.getElementById('au-tbody');
      if (!tbody) return;
      const entries = Object.entries(data);
      tbody.innerHTML = entries.map(([email, u]) => {
        const name = u.last + ' ' + u.first;
        const count = u.companies.length;
        const countLabel = count > 0 ? count + '社' : '─';
        return `<tr class="clickable-row" onclick="openUserPanel('${email}')">
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="avatar" style="width:30px;height:30px;font-size:11px;background:${u.avatarBg}">${u.avatarText}</div>
          <strong>${name}</strong>
        </div>
      </td>
      <td style="color:#6b7280">${email}</td>
      <td><span style="font-size:13px;font-weight:600;color:#374151">${countLabel}</span></td>
      <td style="color:#9ca3af">${u.registered}</td>
    </tr>`;
      }).join('');
      document.getElementById('au-count-label').textContent = '全' + entries.length + '名';
    }

    function filterAdminUserTable() {
      const kw = (document.getElementById('au-search').value || '').toLowerCase();
      const co = document.getElementById('au-filter-company').value;
      const filtered = Object.fromEntries(
        Object.entries(adminUserData).filter(([email, u]) => {
          const name = (u.last + u.first).toLowerCase();
          const matchKw = !kw || name.includes(kw) || email.includes(kw);
          const matchCo = !co || u.companies.some(c => c.name === co);
          return matchKw && matchCo;
        })
      );
      renderAdminUserTable(filtered);
    }

    function openUserPanel(email) {
      const u = adminUserData[email];
      if (!u) return;
      currentPanelEmail = email;

      document.getElementById('up-avatar').style.background = u.avatarBg;
      document.getElementById('up-avatar').textContent = u.avatarText;
      document.getElementById('up-name-text').textContent = u.last + ' ' + u.first;
      document.getElementById('up-email').textContent = email;
      document.getElementById('up-registered').textContent = '登録日: ' + u.registered;

      cancelEditName();
      const companiesEl = document.getElementById('up-companies');
      if (u.companies.length === 0) {
        companiesEl.innerHTML = '<div style="color:#9ca3af;font-size:13px">─ 未所属</div>';
      } else {
        companiesEl.innerHTML = u.companies.map((c, i) => {
          const loginText = c.lastLogin ? c.lastLogin : '─ (未ログイン)';
          const isActive = c.status === '有効';
          const statusDot = isActive
            ? '<span class="status-active">● 有効</span>'
            : '<span style="font-size:12px;color:#ef4444;font-weight:600">● 無効</span>';
          const toggleBtn = u.locked ? ''
            : isActive
              ? `<button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;font-size:11px" onclick="showStatusConfirm('${email}',${i})">無効化</button>`
              : `<button class="btn btn-sm" style="background:#d1fae5;color:#065f46;font-size:11px" onclick="showStatusConfirm('${email}',${i})">有効化</button>`;
          return `
        <div class="up-company-block" id="up-co-block-${i}">
          <div style="font-size:13px;font-weight:600;color:#111827;margin-bottom:10px">${c.flag} ${c.name}</div>
          <div style="display:grid;grid-template-columns:80px 1fr;gap:6px 0;font-size:12px">
            <span style="color:#9ca3af">役割</span>
            <span style="font-weight:500">${c.role}</span>
            <span style="color:#9ca3af">最終ログイン</span>
            <span>${loginText}</span>
            <span style="color:#9ca3af">ステータス</span>
            <div style="display:flex;align-items:center;gap:8px">${statusDot} ${toggleBtn}</div>
          </div>
          <div class="up-company-confirm" id="up-confirm-${i}">
            <div style="font-size:12px;font-weight:600;color:#92400e;margin-bottom:8px">
              ⚠️ ${c.name} でのアクセスを${isActive ? '無効化' : '有効化'}しますか？
            </div>
            <div style="display:flex;gap:8px;justify-content:flex-end">
              <button class="btn btn-outline btn-sm" onclick="hideStatusConfirm(${i})">キャンセル</button>
              <button class="btn btn-sm" style="${isActive ? 'background:#ef4444;color:#fff' : 'background:#10b981;color:#fff'}"
                onclick="applyStatusChange('${email}',${i})">
                ${isActive ? '無効化する' : '有効化する'}
              </button>
            </div>
          </div>
        </div>`;
        }).join('');
      }

      document.getElementById('modal-user-detail').classList.add('open');
    }

    function closeUserPanel() {
      document.getElementById('modal-user-detail').classList.remove('open');
      currentPanelEmail = null;
    }

    function startEditName() {
      const u = adminUserData[currentPanelEmail];
      document.getElementById('up-edit-last').value = u.last;
      document.getElementById('up-edit-first').value = u.first;
      document.getElementById('up-name-view').style.display = 'none';
      document.getElementById('up-name-edit').style.display = 'block';
    }

    function cancelEditName() {
      document.getElementById('up-name-view').style.display = 'flex';
      document.getElementById('up-name-edit').style.display = 'none';
    }

    function saveNameEdit() {
      const last = document.getElementById('up-edit-last').value.trim();
      const first = document.getElementById('up-edit-first').value.trim();
      if (!last || !first) { alert('姓・名を入力してください。'); return; }
      adminUserData[currentPanelEmail].last = last;
      adminUserData[currentPanelEmail].first = first;
      const u = adminUserData[currentPanelEmail];
      u.avatarText = last.slice(0, 2);
      document.getElementById('up-name-text').textContent = last + ' ' + first;
      cancelEditName();
      renderAdminUserTable(adminUserData);
    }

    function showStatusConfirm(email, idx) {
      document.getElementById('up-confirm-' + idx).classList.add('show');
    }

    function hideStatusConfirm(idx) {
      document.getElementById('up-confirm-' + idx).classList.remove('show');
    }

    function applyStatusChange(email, idx) {
      const u = adminUserData[email];
      const c = u.companies[idx];
      c.status = c.status === '有効' ? '無効' : '有効';
      renderAdminUserTable(adminUserData);
      openUserPanel(email);
    }

    function sendPasswordResetPanel() {
      if (!currentPanelEmail) return;
      if (confirm(currentPanelEmail + ' 宛にパスワード再設定リンクを送信しますか？')) {
        alert('パスワード再設定リンクを ' + currentPanelEmail + ' に送信しました。');
      }
    }

    function resendVerification(email) {
      if (confirm(email + ' へ認証メールを再送信しますか？')) {
        alert('認証メールを再送信しました。');
      }
    }

    function sendPasswordReset() {
      const email = document.getElementById('reset-email') ? document.getElementById('reset-email').value.trim() : '';
      if (!email) { alert('メールアドレスを入力してください。'); return; }
      alert('パスワード再設定リンクを ' + email + ' に送信しました。');
    }

    function filterCompanyTable() { /* フィルター処理（実装時にDB連携） */ }

    function filterCompanyInfo(keyword) {
      const kw = (keyword || '').toLowerCase();
      const country = document.getElementById('ci-country').value;
      const rows = document.querySelectorAll('#ci-table-body tr');
      let count = 0;
      rows.forEach(row => {
        const code = row.cells[0].textContent.toLowerCase();
        const name = row.cells[1].textContent.toLowerCase();
        const rowCountry = row.cells[2].textContent;
        const matchKw = !kw || code.includes(kw) || name.includes(kw);
        const matchCountry = !country || rowCountry.includes(country);
        const show = matchKw && matchCountry;
        row.style.display = show ? '' : 'none';
        if (show) count++;
      });
      document.getElementById('ci-count').textContent = `全${count}件`;
    }

    // ===== プロジェクト一覧 =====
    const povProjects = [
      {
        code: 'PRJ-001', name: 'A社 製造ライン改修', status: '進行中', type: '外注',
        start: '2025-10-01', end: '2026-08-31',
        manday: 240, spent: 180, progress: 48, members: 5,
        pm: '田中 一郎'
      },
      {
        code: 'PRJ-002', name: 'B社 設備導入', status: '進行中', type: '外注',
        start: '2026-02-01', end: '2026-10-31',
        manday: 160, spent: 40, progress: 25, members: 3,
        pm: '鈴木 花子'
      },
      {
        code: 'PRJ-003', name: 'C社 品質改善プロジェクト', status: '完了', type: '社内',
        start: '2025-06-01', end: '2026-01-31',
        manday: 200, spent: 198, progress: 100, members: 4,
        pm: '佐藤 次郎'
      },
      {
        code: 'PRJ-004', name: 'D社 PLCシステム更新', status: '保留', type: '外注',
        start: '2026-01-01', end: '2026-09-30',
        manday: 120, spent: 30, progress: 25, members: 2,
        pm: '山田 三郎'
      },
      {
        code: 'PRJ-005', name: 'E社 倉庫管理システム導入', status: '停止', type: '社内',
        start: '2025-11-01', end: '2026-05-31',
        manday: 180, spent: 60, progress: 33, members: 3,
        pm: '中村 美咲'
      },
      {
        code: 'PRJ-006', name: 'F社 IoTセンサー統合', status: '進行中', type: '外注',
        start: '2026-03-01', end: '2026-12-31',
        manday: 320, spent: 55, progress: 17, members: 6,
        pm: '田中 一郎'
      },
      {
        code: 'PRJ-007', name: 'G社 ERP導入支援', status: '進行中', type: '社内',
        start: '2025-07-01', end: '2026-06-30',
        manday: 280, spent: 200, progress: 52, members: 7,
        pm: '鈴木 花子'
      },
    ];

    let povCurrentSort = { key: 'end', asc: true };
    let povCurrentView = 'gantt';
    let povGanttView = 'quarter'; // month | quarter | half | year

    function povIsDelayed(p) {
      if (p.status === '完了') return false;
      if (p.status === '保留' || p.status === '停止') return null;
      const today = new Date();
      const end = new Date(p.end);
      // Delayed if: end date passed and not 100%, or spent > manday
      if (end < today && p.progress < 100) return true;
      if (p.spent > p.manday) return true;
      // Check expected progress vs actual
      const start = new Date(p.start);
      const totalMs = end - start;
      const elapsedMs = Math.min(today - start, totalMs);
      if (totalMs <= 0) return false;
      const expectedProgress = Math.round((elapsedMs / totalMs) * 100);
      return p.progress < expectedProgress - 10; // 10% tolerance
    }

    function povDelayDays(p) {
      if (p.status === '完了' || p.status === '保留' || p.status === '停止') return 0;
      const today = new Date();
      const end = new Date(p.end);
      if (end < today && p.progress < 100) {
        return Math.ceil((today - end) / (1000 * 60 * 60 * 24));
      }
      return 0;
    }

    function povProgressColor(pct, delayed) {
      if (delayed) return 'fill-red';
      if (pct >= 100) return 'fill-green';
      if (pct >= 60) return 'fill-blue';
      return 'fill-orange';
    }

    function povStatusBadge(status) {
      const map = {
        '進行中': 'badge-blue',
        '予定': 'badge-orange',
        '完了': 'badge-green',
        '保留': 'badge-gray',
        '停止': 'badge-gray',
      };
      return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
    }

    function povTimelineBar(p) {
      const today = new Date();
      const start = new Date(p.start);
      const end = new Date(p.end);
      const total = end - start;
      if (total <= 0) return '';
      const elapsed = Math.min(Math.max(today - start, 0), total);
      const todayPct = Math.round((elapsed / total) * 100);
      const fillPct = Math.min(p.progress, 100);
      const delayed = povIsDelayed(p);
      const fillCls = delayed ? 'fill-red' : (p.status === '完了' ? 'fill-green' : 'fill-blue');
      return `
    <div class="pov-timeline-bar" title="${p.start} → ${p.end}">
      <div class="pov-timeline-fill ${fillCls}" style="left:0;width:${fillPct}%"></div>
      <div class="pov-timeline-today" style="left:${Math.min(todayPct, 100)}%" title="今日"></div>
    </div>`;
    }

    function povRenderStats(list) {
      const total = list.length;
      const active = list.filter(p => p.status === '進行中').length;
      const done = list.filter(p => p.status === '完了').length;
      const hold = list.filter(p => p.status === '保留').length;
      const plan = list.filter(p => p.status === '予定').length;
      const gaichuu = list.filter(p => p.type === '外注').length;
      const shanai = list.filter(p => p.type === '社内').length;
      document.getElementById('pov-stats-row').innerHTML = `
    <div class="pov-stat total">
      <div class="pov-stat-icon">📋</div>
      <div class="pov-stat-val">${total}</div>
      <div class="pov-stat-lbl">全案件数</div>
    </div>
    <div class="pov-stat active">
      <div class="pov-stat-icon">🔵</div>
      <div class="pov-stat-val">${active}</div>
      <div class="pov-stat-lbl">進行中</div>
    </div>
    <div class="pov-stat plan">
      <div class="pov-stat-icon">🟡</div>
      <div class="pov-stat-val">${plan}</div>
      <div class="pov-stat-lbl">予定</div>
    </div>
    <div class="pov-stat done">
      <div class="pov-stat-icon">✅</div>
      <div class="pov-stat-val">${done}</div>
      <div class="pov-stat-lbl">完了</div>
    </div>
    <div class="pov-stat hold">
      <div class="pov-stat-icon">⏸️</div>
      <div class="pov-stat-val">${hold}</div>
      <div class="pov-stat-lbl">保留</div>
    </div>
    <div class="pov-stat gaichuu">
      <div class="pov-stat-icon">🔵</div>
      <div class="pov-stat-val">${gaichuu}<span style="font-size:12px;color:#94a3b8;font-weight:400"> / </span>${shanai}<span style="font-size:11px;color:#94a3b8;font-weight:400;margin-left:2px">🟡</span></div>
      <div class="pov-stat-lbl">外注 / 社内</div>
    </div>`;
    }

    function povRenderTable(list) {
      const tbody = document.getElementById('pov-table-body');
      if (!list.length) {
        tbody.innerHTML = '<tr><td colspan="12" style="text-align:center;color:#9ca3af;padding:32px">該当する案件がありません</td></tr>';
        return;
      }
      tbody.innerHTML = list.map(p => {
        const delayed = povIsDelayed(p);
        const delayDays = povDelayDays(p);
        const delayBadge = delayed === true
          ? `<span class="delay-badge-yes">⚠️ 遅延${delayDays > 0 ? ' +' + delayDays + '日' : ''}</span>`
          : delayed === false
            ? `<span class="delay-badge-no">✓ 正常</span>`
            : `<span class="delay-badge-na">— N/A</span>`;
        const pct = Math.min(p.progress, 100);
        const fillCls = povProgressColor(pct, delayed === true);
        const mandayRatio = p.manday > 0 ? Math.round((p.spent / p.manday) * 100) : 0;
        const overBudget = p.spent > p.manday;
        return `<tr>
      <td><span class="tag" style="font-size:11px;padding:2px 6px">${p.code}</span></td>
      <td>
        <div class="prj-name">${p.name}</div>
        <div style="font-size:11px;color:#9ca3af">PM: ${p.pm}</div>
      </td>
      <td>${povStatusBadge(p.status)}</td>
      <td style="color:#475569">${p.start.replace(/-/g, '/')}</td>
      <td style="color:#475569">${p.end.replace(/-/g, '/')}</td>
      <td>
        <div class="pov-manday">${p.manday.toLocaleString()} <span>人日</span></div>
      </td>
      <td>
        <div class="pov-manday ${overBudget ? 'priority-high' : ''}">${p.spent.toLocaleString()} <span>人日</span></div>
        <div style="font-size:10px;color:${overBudget ? '#ef4444' : '#9ca3af'}">${mandayRatio}% 消化</div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div class="pov-progress-wrap">
            <div class="pov-progress-fill ${fillCls}" style="width:${pct}%"></div>
          </div>
          <span style="font-size:12px;font-weight:600;color:${delayed === true ? '#ef4444' : '#374151'}">${pct}%</span>
        </div>
      </td>
      <td>${povTimelineBar(p)}</td>
      <td>${delayBadge}</td>
      <td style="text-align:center">${p.members}名</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="openProject('${p.code}','${p.name}')">開く</button>
      </td>
    </tr>`;
      }).join('');
    }

    function povRenderCards(list) {
      const wrap = document.getElementById('pov-card-view');
      if (!list.length) {
        wrap.innerHTML = '<div style="text-align:center;color:#9ca3af;padding:32px;grid-column:1/-1">該当する案件がありません</div>';
        return;
      }
      wrap.innerHTML = list.map(p => {
        const delayed = povIsDelayed(p);
        const delayDays = povDelayDays(p);
        const pct = Math.min(p.progress, 100);
        const fillCls = povProgressColor(pct, delayed === true);
        const delayBadge = delayed === true
          ? `<span class="delay-badge-yes">⚠️ 遅延${delayDays > 0 ? ' +' + delayDays + '日' : ''}</span>`
          : delayed === false
            ? `<span class="delay-badge-no">✓ 正常</span>`
            : `<span class="delay-badge-na">— N/A</span>`;
        const overBudget = p.spent > p.manday;
        return `<div class="pov-card" onclick="openProject('${p.code}','${p.name}')">
      <div class="pov-card-header">
        <div>
          <div class="pov-card-code">${p.code}</div>
          <div class="pov-card-name">${p.name}</div>
        </div>
        ${povStatusBadge(p.status)}
      </div>
      <div class="pov-card-dates">
        📅 ${p.start.replace(/-/g, '/')} <span>→</span> ${p.end.replace(/-/g, '/')}
      </div>
      <div style="margin-bottom:8px">${povTimelineBar(p)}</div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <div class="pov-progress-wrap" style="width:100%;flex:1">
          <div class="pov-progress-fill ${fillCls}" style="width:${pct}%"></div>
        </div>
        <span style="font-size:13px;font-weight:700;color:${delayed === true ? '#ef4444' : '#374151'};min-width:36px">${pct}%</span>
      </div>
      <div class="pov-card-footer">
        <div class="pov-card-manday">
          🗓️ 工数: <strong style="color:${overBudget ? '#ef4444' : '#374151'}">${p.spent}</strong>/<strong>${p.manday}</strong> 人日
        </div>
        ${delayBadge}
      </div>
      <div style="font-size:11px;color:#9ca3af;margin-top:8px">PM: ${p.pm}　👥 ${p.members}名</div>
    </div>`;
      }).join('');
    }

    function povFilter() {
      const kw = (document.getElementById('pov-search').value || '').toLowerCase();
      const status = document.getElementById('pov-status').value;
      const delay = document.getElementById('pov-delay').value;
      const sort = document.getElementById('pov-sort').value;

      let list = povProjects.filter(p => {
        const matchKw = !kw || p.code.toLowerCase().includes(kw) || p.name.toLowerCase().includes(kw);
        const matchStatus = !status || p.status === status;
        const isDelayed = povIsDelayed(p);
        const matchDelay = !delay
          || (delay === 'yes' && isDelayed === true)
          || (delay === 'no' && isDelayed === false);
        return matchKw && matchStatus && matchDelay;
      });

      // Sort
      const sortMap = {
        end_asc: (a, b) => a.end.localeCompare(b.end),
        end_desc: (a, b) => b.end.localeCompare(a.end),
        start_asc: (a, b) => a.start.localeCompare(b.start),
        progress_desc: (a, b) => b.progress - a.progress,
        manday_desc: (a, b) => b.manday - a.manday,
      };
      if (sortMap[sort]) list.sort(sortMap[sort]);

      povRenderStats(list);
      document.getElementById('pov-result-count').textContent = `全${list.length}件`;

      if (povCurrentView === 'table') {
        povRenderTable(list);
      } else {
        povRenderCards(list);
      }
    }

    function povSortBy(key) {
      if (povCurrentSort.key === key) {
        povCurrentSort.asc = !povCurrentSort.asc;
      } else {
        povCurrentSort = { key, asc: true };
      }
      // Update sort icons
      document.querySelectorAll('.pov-table th').forEach(th => th.classList.remove('sorted'));
      povFilter();
    }

    function povSwitchView(view) {
      povCurrentView = view;
      const isGantt = view === 'gantt';
      document.getElementById('pov-table-view').style.display = view === 'table' ? 'block' : 'none';
      document.getElementById('pov-card-view').style.display = view === 'card' ? 'grid' : 'none';
      document.getElementById('pov-gantt-view').classList.toggle('active', isGantt);
      if (!isGantt) document.getElementById('pov-gantt-view').classList.remove('active');
      // Filter bar: hide in gantt (gantt has its own toolbar)
      document.getElementById('pov-filter-bar').style.display = isGantt ? 'none' : 'flex';
      document.getElementById('pov-btn-table').classList.toggle('active', view === 'table');
      document.getElementById('pov-btn-card').classList.toggle('active', view === 'card');
      document.getElementById('pov-btn-gantt').classList.toggle('active', isGantt);

      if (isGantt) {
        povRenderGantt(povProjects);
      } else {
        povFilter();
      }
    }

    function initProjectOverview() {
      document.getElementById('pov-search').value = '';
      document.getElementById('pov-status').value = '';
      document.getElementById('pov-delay').value = '';
      document.getElementById('pov-sort').value = 'end_asc';
      povCurrentView = 'gantt';
      document.getElementById('pov-table-view').style.display = 'none';
      document.getElementById('pov-card-view').style.display = 'none';
      document.getElementById('pov-filter-bar').style.display = 'none';
      document.getElementById('pov-gantt-view').classList.add('active');
      document.getElementById('pov-btn-table').classList.remove('active');
      document.getElementById('pov-btn-card').classList.remove('active');
      document.getElementById('pov-btn-gantt').classList.add('active');
      // Reset gantt search
      document.getElementById('gantt-search-kw').value = '';
      document.getElementById('gantt-filter-type').value = '';
      document.getElementById('gantt-search-clear').classList.remove('visible');
      document.getElementById('gantt-filter-type').classList.remove('active');
      document.querySelectorAll('#gantt-status-panel input').forEach(cb => cb.checked = false);
      updateGanttStatusBadge();
      povRenderStats(povProjects);
      document.getElementById('pov-result-count').textContent = `全${povProjects.length}件`;
      document.getElementById('gantt-filter-count').innerHTML = `全 <strong>${povProjects.length}</strong> 件`;
      povRenderGantt(povProjects, '');
    }

    // ===== PROJECT OVERVIEW GANTT =====
    function povGanttSetView(view) {
      povGanttView = view;
      ['day', 'week', 'month', 'quarter'].forEach(v => {
        document.getElementById('pgvb-' + v).classList.toggle('active', v === view);
      });
      povGanttFilter();
    }

    // ===== GANTT STATUS CHECKBOX DROPDOWN =====
    function toggleGanttStatusDropdown(e) {
      e.stopPropagation();
      document.getElementById('gantt-status-panel').classList.toggle('open');
    }

    function updateGanttStatusBadge() {
      const checked = document.querySelectorAll('#gantt-status-panel input:checked');
      const badge = document.getElementById('gantt-status-badge');
      const btn = document.getElementById('gantt-status-btn');
      badge.textContent = checked.length;
      badge.style.display = checked.length > 0 ? 'inline-block' : 'none';
      btn.classList.toggle('active', checked.length > 0);
    }

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      const panel = document.getElementById('gantt-status-panel');
      const dropdown = document.getElementById('gantt-status-dropdown');
      if (panel && panel.classList.contains('open') && !dropdown.contains(e.target)) {
        panel.classList.remove('open');
      }
    });

    // ===== GANTT SEARCH / FILTER =====
    function povGanttFilter() {
      const kw = (document.getElementById('gantt-search-kw').value || '').trim().toLowerCase();
      const type = document.getElementById('gantt-filter-type').value;
      const checked = [...document.querySelectorAll('#gantt-status-panel input:checked')].map(cb => cb.value);

      document.getElementById('gantt-search-clear').classList.toggle('visible', kw.length > 0);
      document.getElementById('gantt-filter-type').classList.toggle('active', type !== '');
      document.getElementById('gantt-status-panel').classList.remove('open');

      const filtered = povProjects.filter(p => {
        const matchKw = !kw || p.code.toLowerCase().includes(kw) || p.name.toLowerCase().includes(kw);
        const matchStatus = checked.length === 0 || checked.includes(p.status);
        const matchType = !type || p.type === type;
        return matchKw && matchStatus && matchType;
      });

      const hasFilter = kw || checked.length > 0 || type;
      document.getElementById('gantt-filter-count').innerHTML = hasFilter
        ? `<strong>${filtered.length}</strong> / ${povProjects.length} 件`
        : `全 <strong>${povProjects.length}</strong> 件`;

      povRenderGantt(filtered, kw);
    }

    function povGanttClearSearch() {
      document.getElementById('gantt-search-kw').value = '';
      document.getElementById('gantt-filter-type').value = '';
      document.getElementById('gantt-search-clear').classList.remove('visible');
      document.getElementById('gantt-filter-type').classList.remove('active');
      document.getElementById('gantt-status-panel').querySelectorAll('input').forEach(cb => cb.checked = false);
      updateGanttStatusBadge();
      document.getElementById('gantt-filter-count').innerHTML = `全 <strong>${povProjects.length}</strong> 件`;
      povRenderGantt(povProjects, '');
      document.getElementById('gantt-search-kw').focus();
    }

    function povBuildGanttCols() {
      const view = povGanttView;
      const cols = [], groups = [];

      const today = new Date();
      const starts = povProjects.map(p => new Date(p.start));
      const ends = povProjects.map(p => new Date(p.end));
      const minD = new Date(Math.min(...starts));
      const maxD = new Date(Math.max(...ends, today));

      if (view === 'day') {
        // Day view: columns = each day, groups = month
        let cur = new Date(minD.getFullYear(), minD.getMonth(), 1);
        const end = new Date(maxD.getFullYear(), maxD.getMonth() + 1, 0);
        let curGroup = null;
        while (cur <= end) {
          const y = cur.getFullYear(), m = cur.getMonth(), d = cur.getDate();
          const gLabel = y + '年' + (m + 1) + '月';
          if (!curGroup || curGroup.label !== gLabel) { curGroup = { label: gLabel, span: 0 }; groups.push(curGroup); }
          cols.push({ label: String(d), start: new Date(y, m, d), end: new Date(y, m, d, 23, 59, 59) });
          curGroup.span++;
          cur = new Date(y, m, d + 1);
        }

      } else if (view === 'week') {
        // Week view: columns = each week (Mon-Sun), groups = month
        let cur = new Date(minD.getFullYear(), minD.getMonth(), 1);
        const end = new Date(maxD.getFullYear(), maxD.getMonth() + 1, 0);
        let curGroup = null;
        let weekNum = 1;
        let prevMonth = -1;
        while (cur <= end) {
          const y = cur.getFullYear(), m = cur.getMonth();
          const gLabel = y + '年' + (m + 1) + '月';
          if (!curGroup || curGroup.label !== gLabel) {
            curGroup = { label: gLabel, span: 0 };
            groups.push(curGroup);
            weekNum = 1;
          }
          // Week spans 7 days but clipped to month boundary
          const wEnd = new Date(y, m, cur.getDate() + 6);
          const clipped = wEnd > end ? end : wEnd;
          cols.push({ label: 'W' + weekNum, start: new Date(cur), end: new Date(clipped.getFullYear(), clipped.getMonth(), clipped.getDate(), 23, 59, 59) });
          curGroup.span++;
          weekNum++;
          cur = new Date(clipped.getFullYear(), clipped.getMonth(), clipped.getDate() + 1);
        }

      } else if (view === 'month') {
        let cur = new Date(minD.getFullYear(), minD.getMonth(), 1);
        const end = new Date(maxD.getFullYear(), maxD.getMonth() + 1, 1);
        let curGroup = null;
        while (cur < end) {
          const y = cur.getFullYear(), m = cur.getMonth();
          const gLabel = y + '年';
          if (!curGroup || curGroup.label !== gLabel) { curGroup = { label: gLabel, span: 0 }; groups.push(curGroup); }
          cols.push({ label: (m + 1) + '月', start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) });
          curGroup.span++;
          cur = new Date(y, m + 1, 1);
        }

      } else { // quarter
        let y = minD.getFullYear(), q = Math.floor(minD.getMonth() / 3);
        const endY = maxD.getFullYear(), endQ = Math.floor(maxD.getMonth() / 3);
        let curGroup = null;
        while (y < endY || (y === endY && q <= endQ)) {
          const gLabel = y + '年';
          if (!curGroup || curGroup.label !== gLabel) { curGroup = { label: gLabel, span: 0 }; groups.push(curGroup); }
          const sm = q * 3, em = sm + 2;
          cols.push({ label: 'Q' + (q + 1), start: new Date(y, sm, 1), end: new Date(y, em + 1, 0, 23, 59, 59) });
          curGroup.span++;
          q++; if (q > 3) { q = 0; y++; }
        }
      }
      return { cols, groups };
    }

    function povGanttBarClass(p) {
      if (povIsDelayed(p) === true) return 'pov-gantt-bar-delay';
      const map = { '進行中': 'pov-gantt-bar-active', '完了': 'pov-gantt-bar-done', '予定': 'pov-gantt-bar-plan', '保留': 'pov-gantt-bar-hold', '停止': 'pov-gantt-bar-hold' };
      return map[p.status] || 'pov-gantt-bar-hold';
    }

    function povRenderGantt(list, kw) {
      const { cols, groups } = povBuildGanttCols();
      if (!cols.length) return;

      // Keyword highlight helper
      const kwLow = (kw || '').trim().toLowerCase();
      const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const hl = text => kwLow
        ? text.replace(new RegExp('(' + esc(kwLow) + ')', 'gi'),
          '<span class="gantt-match-highlight">$1</span>')
        : text;

      // Empty state
      if (list.length === 0) {
        document.getElementById('pov-gantt-container').innerHTML =
          `<div class="pov-gantt-no-result">
        <div class="pov-gantt-no-result-icon">🔍</div>
        <div style="font-weight:600;color:#374151">該当する案件が見つかりません</div>
        <div style="margin-top:6px;font-size:12px">条件を変えて再検索してください</div>
      </div>`;
        return;
      }

      // Fixed left columns
      const FC = [
        { label: 'コード', w: 88, align: 'left' },
        { label: '案件名', w: 180, align: 'left' },
        { label: 'ステータス', w: 80, align: 'center' },
        { label: '種別', w: 62, align: 'center' },
        { label: '開始日', w: 90, align: 'center' },
        { label: '終了日', w: 90, align: 'center' },
        { label: '進捗', w: 68, align: 'center' },
      ];
      let acc = 0;
      FC.forEach(c => { c.left = acc; acc += c.w; });

      const stickyTh = (c, i) => {
        const isLast = i === FC.length - 1;
        return '<th rowspan="2" style="position:sticky;left:' + c.left + 'px;width:' + c.w + 'px;min-width:' + c.w
          + 'px;text-align:' + c.align + ';vertical-align:middle;background:#f8fafc;z-index:2'
          + (isLast ? ';box-shadow:3px 0 8px rgba(0,0,0,0.07)' : '') + '">' + c.label + '</th>';
      };
      const stickyTd = (content, c, i) => {
        const isLast = i === FC.length - 1;
        return '<td style="position:sticky;left:' + c.left + 'px;width:' + c.w + 'px;min-width:' + c.w
          + 'px;text-align:' + c.align + ';background:#fff;z-index:1'
          + (isLast ? ';box-shadow:3px 0 8px rgba(0,0,0,0.07)' : '') + '">' + content + '</td>';
      };

      // Header row 1
      let h1 = '<tr>' + FC.map((c, i) => stickyTh(c, i)).join('');
      groups.forEach(g => { h1 += '<th colspan="' + g.span + '" class="gantt-group">' + g.label + '</th>'; });
      h1 += '</tr>';

      // Header row 2
      let h2 = '<tr>';
      cols.forEach(c => { h2 += '<th style="text-align:center;font-size:11px;min-width:44px;padding:4px 2px;white-space:nowrap">' + c.label + '</th>'; });
      h2 += '</tr>';

      // Body rows
      let body = '';
      list.forEach((p, ri) => {
        const start = new Date(p.start);
        const end = new Date(p.end);
        const delayed = povIsDelayed(p);
        const barCls = povGanttBarClass(p);
        const pct = Math.min(p.progress, 100);

        // Status badge cell
        const statusMap = { '進行中': '#b3eceb:#0a7a76', '予定': '#fef3c7:#92400e', '完了': '#d1fae5:#065f46', '保留': '#f1f5f9:#475569', '停止': '#fee2e2:#991b1b' };
        const [bg, fg] = (statusMap[p.status] || '#f1f5f9:#475569').split(':');
        const statusCell = `<span style="background:${bg};color:${fg};padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;white-space:nowrap">${p.status}</span>`;

        // 種別 cell
        const typeCell = p.type === '外注'
          ? '<span style="background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700">外注</span>'
          : '<span style="background:#fef9c3;color:#854d0e;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700">社内</span>';

        // Progress cell
        const progCell = `<div style="display:flex;align-items:center;gap:4px">
      <div style="flex:1;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:${pct >= 100 ? '#10b981' : '#0ABAB5'};border-radius:3px"></div>
      </div>
      <span style="font-size:10px;font-weight:700;color:#374151;min-width:26px;text-align:right">${pct}%</span>
    </div>`;

        const leftCells = [
          stickyTd(`<span style="font-size:10px;font-weight:600;color:#9ca3af;background:#f1f5f9;padding:1px 6px;border-radius:4px">${hl(p.code)}</span>`, FC[0], 0),
          stickyTd(`<div style="font-weight:600;font-size:12px;color:#1f2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:174px" title="${p.name}">${hl(p.name)}</div><div style="font-size:10px;color:#9ca3af">PM: ${hl(p.pm)}</div>`, FC[1], 1),
          stickyTd(statusCell, FC[2], 2),
          stickyTd(typeCell, FC[3], 3),
          stickyTd(`<span style="font-size:11px;color:#475569">${p.start.replace(/-/g, '/')}</span>`, FC[4], 4),
          stickyTd(`<span style="font-size:11px;color:#475569">${p.end.replace(/-/g, '/')}</span>`, FC[5], 5),
          stickyTd(progCell, FC[6], 6),
        ].join('');

        // Gantt cells
        let cells = '';
        let i = 0;
        while (i < cols.length) {
          const col = cols[i];
          const inBar = start <= col.end && end >= col.start;
          if (inBar) {
            // Merge consecutive columns that are within the project span
            let span = 1;
            while (i + span < cols.length && start <= cols[i + span].end && end >= cols[i + span].start) span++;

            // Calculate partial fill for first/last col (for month view precision)
            const barStart = Math.max(start, col.start);
            const barEnd = Math.min(end, cols[i + span - 1].end);
            const totalMs = cols[i + span - 1].end - col.start;
            const leftPct = totalMs > 0 ? Math.round(((barStart - col.start) / totalMs) * 100) : 0;

            cells += `<td colspan="${span}" style="padding:4px 3px">
          <div style="position:relative;height:22px;background:#f1f5f9;border-radius:5px;overflow:hidden;margin:0 1px" title="${p.name} | ${p.start}→${p.end} | ${pct}%">
            <div class="${barCls}" style="position:absolute;top:0;bottom:0;left:${leftPct}%;right:0;border-radius:5px;opacity:0.92"></div>
            <div class="pov-gantt-progress-overlay" style="width:${pct * (1 - leftPct / 100)}%;left:${leftPct}%"></div>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.3);pointer-events:none;white-space:nowrap;overflow:hidden;padding:0 6px">${pct > 0 ? pct + '%' : ''}</div>
          </div>
        </td>`;
            i += span;
          } else {
            cells += '<td style="padding:4px 3px"><div style="height:22px;margin:0 1px"></div></td>';
            i++;
          }
        }

        body += `<tr class="pov-gantt-row" style="cursor:pointer" onclick="openProject('${p.code}','${p.name}')">${leftCells}${cells}</tr>`;
      });

      // Render table
      const tableHTML = '<table class="gantt"><thead>' + h1 + h2 + '</thead><tbody>' + body + '</tbody></table>';
      const container = document.getElementById('pov-gantt-container');
      const inner = document.createElement('div');
      inner.style.cssText = 'position:relative;display:inline-block;min-width:100%';
      inner.innerHTML = tableHTML;
      container.innerHTML = '';
      container.appendChild(inner);

      // ── Today vertical line ──────────────────────────────────────────
      const todayNow = new Date(); todayNow.setHours(12, 0, 0, 0);
      const todayIdx = cols.findIndex(c => c.start <= todayNow && todayNow <= c.end);

      if (todayIdx >= 0) {
        // Highlight today column header (row 2)
        const timelineThs = inner.querySelectorAll('thead tr:nth-child(2) th');
        const todayTh = timelineThs[todayIdx];
        if (todayTh) {
          todayTh.style.cssText += ';background:#fff1f1;color:#ef4444;font-weight:700;border-top:2px solid #ef4444;';
          todayTh.innerHTML = '<div style="color:#ef4444;font-weight:800;font-size:10px;line-height:1.2">▼</div>' + todayTh.innerHTML;
        }

        // Draw the vertical line using offsetLeft (reliable, no viewport dependency)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const ths = inner.querySelectorAll('thead tr:nth-child(2) th');
            const th = ths[todayIdx];
            if (!th) return;

            // Walk up offsetParent chain to get x relative to `inner`
            let x = 0, node = th;
            while (node && node !== inner) { x += node.offsetLeft; node = node.offsetParent; }
            x += Math.round(th.offsetWidth / 2);

            const line = document.createElement('div');
            line.id = 'pov-today-line';
            line.style.cssText =
              'position:absolute;top:0;bottom:0;left:' + x + 'px;width:2px;' +
              'background:#ef4444;pointer-events:none;z-index:20;' +
              'box-shadow:0 0 6px rgba(239,68,68,0.45);';

            inner.appendChild(line);

            // Scroll today into center
            container.scrollLeft = Math.max(0, x - container.clientWidth / 2);
          });
        });
      }
    }

    // ===== 案件管理 =====
    function filterProjects() {
      const kw = document.getElementById('prj-search').value.toLowerCase();
      const type = document.getElementById('prj-type').value;
      const status = document.getElementById('prj-status').value;
      const rows = document.querySelectorAll('#prj-table-body tr');
      let count = 0;
      rows.forEach(row => {
        const code = row.cells[0].textContent.toLowerCase();
        const name = row.cells[2].textContent.toLowerCase();
        const rowType = row.dataset.type || '';
        const rowStatus = row.dataset.status || '';
        const matchKw = !kw || code.includes(kw) || name.includes(kw);
        const matchType = !type || rowType === type;
        const matchStatus = !status || rowStatus === status;
        const show = matchKw && matchType && matchStatus;
        row.style.display = show ? '' : 'none';
        if (show) count++;
      });
      document.getElementById('prj-count').textContent = `全${count}件`;
    }

    function deleteProject(btn, code) {
      if (!confirm(`案件 ${code} を削除しますか？（論理削除）`)) return;
      btn.closest('tr').style.display = 'none';
      const rows = document.querySelectorAll('#prj-table-body tr:not([style*="display: none"])');
      document.getElementById('prj-count').textContent = `全${rows.length}件`;
    }

    function openEditProject(btn) {
      const row = btn.closest('tr');
      const code = row.cells[0].textContent.trim();
      const type = row.dataset.type || '外注';
      const name = row.cells[2].textContent.trim();
      const status = row.cells[3].textContent.trim();
      const start = row.cells[4].textContent.trim().replace(/\//g, '-');
      const end = row.cells[5].textContent.trim().replace(/\//g, '-');

      document.getElementById('modal-project-title').textContent = '📁 案件編集';
      document.getElementById('prj-code').value = code;
      document.getElementById('prj-name').value = name;
      document.getElementById('prj-type-input').value = type;
      document.getElementById('prj-status-input').value = status;
      document.getElementById('prj-start').value = start;
      document.getElementById('prj-end').value = end;
      document.getElementById('prj-manday').value = row.dataset.manday || '';
      document.getElementById('prj-spent').value = row.dataset.spent || '';
      document.getElementById('prj-progress').value = row.dataset.progress || '';
      document.getElementById('prj-note').value = '';
      document.getElementById('prj-member-list').innerHTML =
        '<tr style="color:#9ca3af;text-align:center"><td colspan="3">未アサイン</td></tr>';
      document.getElementById('modal-project').classList.add('open');
    }

    function openProjectModal(mode) {
      document.getElementById('modal-project-title').textContent = '📁 案件登録';
      document.getElementById('prj-code').value = '';
      document.getElementById('prj-name').value = '';
      document.getElementById('prj-type-input').selectedIndex = 0;
      document.getElementById('prj-status-input').selectedIndex = 0;
      document.getElementById('prj-start').value = '';
      document.getElementById('prj-end').value = '';
      document.getElementById('prj-manday').value = '';
      document.getElementById('prj-spent').value = '';
      document.getElementById('prj-progress').value = '';
      document.getElementById('prj-note').value = '';
      document.getElementById('prj-member-list').innerHTML = '<tr style="color:#9ca3af;text-align:center"><td colspan="3">未アサイン</td></tr>';
      document.getElementById('modal-project').classList.add('open');
    }

    // ===== 個人プランデータ =====
    const myPersonalPlanData = {
      name: 'Pro',
      price: 4800,
      cycle: '月額',
      startDate: '2026-03-01',
      renewDate: '2027-03-01',
      autoRenew: false,
      usage: [
        { label: 'プロジェクト数', used: 3, max: 999, unit: '件' },
        { label: 'ストレージ', used: 1.2, max: 10, unit: 'GB' },
      ],
    };

    const personalBillingHistory = [
      { date: '2025/06/01', period: '2025年6月分', plan: 'Pro', amount: '¥4,800', status: '支払済' },
      { date: '2025/05/01', period: '2025年5月分', plan: 'Pro', amount: '¥4,800', status: '支払済' },
      { date: '2025/04/01', period: '2025年4月分', plan: 'Pro', amount: '¥4,800', status: '支払済' },
    ];

    function initPersonalPlan() {
      renderPlanChange('personal');
    }

    function autoCalcProgress() {
      const manday = parseFloat(document.getElementById('prj-manday').value) || 0;
      const spent = parseFloat(document.getElementById('prj-spent').value) || 0;
      if (manday > 0) {
        document.getElementById('prj-progress').value = Math.min(100, Math.round((spent / manday) * 100));
      }
    }

    function closeProjectModal() {
      document.getElementById('modal-project').classList.remove('open');
    }

    function addProjectMember() {
      const sel = document.getElementById('prj-assign-user');
      const roleSel = document.getElementById('prj-assign-role');
      const name = sel.options[sel.selectedIndex].text;
      const role = roleSel.options[roleSel.selectedIndex].text;
      if (!sel.value) return;
      const tbody = document.getElementById('prj-member-list');
      // remove placeholder row
      const placeholder = tbody.querySelector('td[colspan]');
      if (placeholder) placeholder.closest('tr').remove();
      // check duplicate
      const existing = [...tbody.querySelectorAll('tr')].map(r => r.dataset.uid);
      if (existing.includes(sel.value)) return;
      const tr = document.createElement('tr');
      tr.dataset.uid = sel.value;
      tr.innerHTML = `<td>${name}</td><td><span class="badge ${role === '案件管理者' ? 'badge-purple' : 'badge-blue'}" style="font-size:11px">${role}</span></td><td><button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;padding:2px 8px" onclick="this.closest('tr').remove()">削除</button></td>`;
      tbody.appendChild(tr);
      sel.value = '';
    }

    function saveProject() {
      const code = document.getElementById('prj-code').value.trim();
      const name = document.getElementById('prj-name').value.trim();
      if (!code) { alert('案件コードを入力してください。'); return; }
      if (!name) { alert('案件名を入力してください。'); return; }
      closeProjectModal();
    }

    // ===== 質問管理データ =====
    const qaData = {
      '001': {
        no: '#001', status: '確認中', category: '設計',
        question: '配線図の仕様について変更点を確認したい。先週送付された図面Rev.3と現場の実装が異なっており、どちらが正しいか確認が必要です。',
        asker: '山田 次郎', askDate: '2025/03/10',
        answers: [
          { text: '現場の実装が正しい仕様です。図面Rev.3は誤記があり、Rev.4に差し替え予定です。修正版を本日中に共有します。', answerer: '田中 一郎', date: '2025/03/11' }
        ]
      },
      '002': {
        no: '#002', status: '未回答', category: '調達',
        question: '代替部品の使用は可能でしょうか？型番：AB-2024。指定部品が入荷困難のため、互換品への切り替えを検討しています。承認をお願いします。',
        asker: '佐藤 花子', askDate: '2025/03/12', answers: []
      },
      '003': {
        no: '#003', status: '未回答', category: '施工',
        question: '設置スペースの追加確保は可能でしょうか？現状の寸法では配線ダクトが収まらない状況です。壁面を15cm拡張する必要があります。',
        asker: '山田 次郎', askDate: '2025/03/13', answers: []
      },
      '004': {
        no: '#004', status: '回答済', category: '設計',
        question: '耐荷重の最大値を教えてください。架台設計の見直しに必要です。',
        asker: '田中 一郎', askDate: '2025/03/07',
        answers: [
          { text: '耐荷重の最大値は500kgです。架台設計の際はこの値の80%以内（400kg）で設計してください。詳細は仕様書P.12をご参照ください。', answerer: '鈴木 三郎', date: '2025/03/08' }
        ]
      },
      '005': {
        no: '#005', status: '未回答', category: '品質',
        question: '検査基準値の公差範囲を確認したい。現在の測定値が基準値に近く、正確な判定のため公差±の数値が必要です。',
        asker: '鈴木 三郎', askDate: '2025/03/14', answers: []
      }
    };

    const statusBadgeMap = {
      '未回答': 'badge-red',
      '確認中': 'badge-orange',
      '回答済': 'badge-green'
    };

    let qaEditIndex = null; // null=新規, number=編集中インデックス
    let qaPendingFiles = []; // 添付予定ファイル一覧

    function handleQaFileSelect(input) {
      [...input.files].forEach(f => addQaFile(f));
      input.value = '';
    }

    function handleQaFileDrop(e) {
      e.preventDefault();
      document.getElementById('qa-file-drop').classList.remove('dragover');
      [...e.dataTransfer.files].forEach(f => addQaFile(f));
    }

    function addQaFile(file) {
      if (qaPendingFiles.find(f => f.name === file.name)) return;
      qaPendingFiles.push(file);
      renderQaFileList();
    }

    function removeQaFile(name) {
      qaPendingFiles = qaPendingFiles.filter(f => f.name !== name);
      renderQaFileList();
    }

    function renderQaFileList() {
      const el = document.getElementById('qa-file-list');
      el.innerHTML = qaPendingFiles.map(f => `
    <div class="qa-file-chip">
      <span>${fileIcon(f.name)}</span>
      <span>${f.name}</span>
      <span style="color:#9ca3af;font-size:10px">(${(f.size / 1024).toFixed(1)}KB)</span>
      <button onclick="removeQaFile('${f.name}')" title="削除">×</button>
    </div>`).join('');
    }

    function fileIcon(name) {
      const ext = name.split('.').pop().toLowerCase();
      const map = { pdf: '📄', xlsx: '📊', xls: '📊', docx: '📝', doc: '📝', png: '🖼️', jpg: '🖼️', jpeg: '🖼️', zip: '🗜️' };
      return map[ext] || '📎';
    }

    function renderAttachedFiles(files) {
      if (!files || !files.length) return '';
      return `<div class="qa-attached">${files.map(f =>
        `<a href="#" onclick="return false">${fileIcon(f.name)} ${f.name} <span style="color:#9ca3af;font-size:10px">(${(f.size / 1024).toFixed(1)}KB)</span></a>`
      ).join('')}</div>`;
    }

    function openQaDetail(no, showForm) {
      const d = qaData[no];
      if (!d) return;
      qaEditIndex = null;

      document.getElementById('qa-detail-title').textContent = `❓ 質問詳細 ${d.no}`;
      document.getElementById('qa-detail-status').innerHTML =
        `<span class="badge ${statusBadgeMap[d.status]}">${d.status}</span>`;
      document.getElementById('qa-detail-meta').innerHTML =
        `<span>📂 ${d.category}</span><span>👤 質問者：${d.asker}</span><span>📅 質問日：${d.askDate}</span>`;
      document.getElementById('qa-detail-question').textContent = d.question;
      document.getElementById('qa-detail-q-meta').textContent = `${d.asker}　${d.askDate}`;

      renderAnswerBlock(no);

      const replyBtn = document.getElementById('qa-reply-btn');
      replyBtn.style.display = 'inline-flex';
      replyBtn.textContent = '+ 新しい回答';

      // フォームリセット（新規モード）
      document.getElementById('qa-answer-text').value = '';
      document.getElementById('qa-answer-user').selectedIndex = 0;
      document.getElementById('qa-answer-status').value = d.answers.length > 0 ? '回答済' : '未回答';
      document.getElementById('qa-form-title').textContent = '✏️ 新しい回答を入力';

      toggleQaForm(!!showForm);

      document.getElementById('modal-qa-detail').dataset.no = no;
      document.getElementById('modal-qa-detail').classList.add('open');
    }

    function renderAnswerBlock(no) {
      const d = qaData[no];
      const ansBlock = document.getElementById('qa-detail-answer-block');
      if (!d.answers.length) {
        ansBlock.innerHTML = `<div class="qa-no-answer">💬 まだ回答がありません</div>`;
        return;
      }
      ansBlock.innerHTML = d.answers.map((a, i) => `
    <div class="qa-bubble qa-bubble-a">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <div class="qa-bubble-label" style="margin-bottom:0">回答 ${d.answers.length > 1 ? i + 1 : ''}</div>
        <button class="btn btn-outline btn-sm" style="padding:2px 10px;font-size:11px" onclick="editQaAnswer('${no}',${i})">編集</button>
      </div>
      <div class="qa-bubble-text">${a.text}</div>
      ${a.files && a.files.length ? `<div class="qa-attached">${a.files.map(f =>
        `<a href="#" onclick="return false">${fileIcon(f.name)} ${f.name} <span style="color:#9ca3af;font-size:10px">(${(f.size / 1024).toFixed(1)}KB)</span></a>`
      ).join('')}</div>` : ''}
      <div class="qa-bubble-meta">${a.answerer}　${a.date}</div>
    </div>`).join('');
    }

    function editQaAnswer(no, index) {
      const d = qaData[no];
      const a = d.answers[index];
      qaEditIndex = index;

      document.getElementById('qa-form-title').textContent = `✏️ 回答 ${d.answers.length > 1 ? index + 1 : ''} を編集`;
      document.getElementById('qa-answer-text').value = a.text;
      const sel = document.getElementById('qa-answer-user');
      [...sel.options].forEach(o => { o.selected = o.text === a.answerer; });
      document.getElementById('qa-answer-status').value = d.status;
      // 既存添付ファイルをセット
      qaPendingFiles = a.files ? [...a.files] : [];
      renderQaFileList();
      document.getElementById('qa-reply-btn').style.display = 'none';
      toggleQaForm(true);
    }

    function toggleQaForm(show) {
      document.getElementById('qa-detail-form').style.display = show ? 'block' : 'none';
      if (!show) {
        qaEditIndex = null;
        qaPendingFiles = [];
        renderQaFileList();
        document.getElementById('qa-reply-btn').style.display = 'inline-flex';
        document.getElementById('qa-form-title').textContent = '✏️ 新しい回答を入力';
        document.getElementById('qa-answer-text').value = '';
      }
    }

    function submitQaAnswer() {
      const text = document.getElementById('qa-answer-text').value.trim();
      if (!text) { alert('回答内容を入力してください。'); return; }
      const no = document.getElementById('modal-qa-detail').dataset.no;
      const newStatus = document.getElementById('qa-answer-status').value;
      const answerer = document.getElementById('qa-answer-user').value;
      const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const d = qaData[no];
      const files = [...qaPendingFiles];

      if (qaEditIndex !== null) {
        d.answers[qaEditIndex] = { text, answerer, date: today, files };
      } else {
        d.answers.push({ text, answerer, date: today, files });
      }
      d.status = newStatus;

      renderAnswerBlock(no);

      document.getElementById('qa-detail-status').innerHTML =
        `<span class="badge ${statusBadgeMap[newStatus]}">${newStatus}</span>`;

      const rows = document.querySelectorAll('#page-qa .data-table tbody tr');
      rows.forEach(row => {
        if (row.cells[0].textContent.trim() === `#${no}`) {
          row.cells[1].innerHTML = `<span class="badge ${statusBadgeMap[newStatus]}">${newStatus}</span>`;
          const lastA = d.answers[d.answers.length - 1];
          row.cells[6].textContent = lastA.answerer.split(' ')[0];
          row.cells[7].textContent = lastA.date.slice(5);
          row.cells[8].innerHTML = `<button class="btn btn-outline btn-sm" onclick="openQaDetail('${no}')">詳細</button>`;
        }
      });

      qaEditIndex = null;
      qaPendingFiles = [];
      renderQaFileList();
      document.getElementById('qa-reply-btn').style.display = 'inline-flex';
      document.getElementById('qa-reply-btn').textContent = '+ 新しい回答';
      document.getElementById('qa-form-title').textContent = '✏️ 新しい回答を入力';
      document.getElementById('qa-answer-text').value = '';
      document.getElementById('qa-answer-status').value = newStatus;
      toggleQaForm(false);
    }

    // ===== 課題ファイル添付（登録） =====
    let issueRegFiles = [];

    function handleIssueRegFileSelect(input) {
      [...input.files].forEach(f => addIssueRegFile(f));
      input.value = '';
    }
    function handleIssueRegFileDrop(e) {
      e.preventDefault();
      document.getElementById('issue-reg-file-drop').classList.remove('dragover');
      [...e.dataTransfer.files].forEach(f => addIssueRegFile(f));
    }
    function addIssueRegFile(file) {
      if (issueRegFiles.find(f => f.name === file.name)) return;
      issueRegFiles.push(file);
      renderIssueRegFileList();
    }
    function removeIssueRegFile(name) {
      issueRegFiles = issueRegFiles.filter(f => f.name !== name);
      renderIssueRegFileList();
    }
    function renderIssueRegFileList() {
      document.getElementById('issue-reg-file-list').innerHTML = issueRegFiles.map(f => `
    <div class="qa-file-chip">
      <span>${fileIcon(f.name)}</span>
      <span>${f.name}</span>
      <span style="color:#9ca3af;font-size:10px">(${(f.size / 1024).toFixed(1)}KB)</span>
      <button onclick="removeIssueRegFile('${f.name}')" title="削除">×</button>
    </div>`).join('');
    }
    function submitIssueReg() {
      issueRegFiles = [];
      renderIssueRegFileList();
      document.getElementById('modal-issue').classList.remove('open');
    }

    // ===== 課題ファイル添付（編集） =====
    let issueEditFiles = [];

    function handleIssueEditFileSelect(input) {
      [...input.files].forEach(f => addIssueEditFile(f));
      input.value = '';
    }
    function handleIssueEditFileDrop(e) {
      e.preventDefault();
      document.getElementById('issue-edit-file-drop').classList.remove('dragover');
      [...e.dataTransfer.files].forEach(f => addIssueEditFile(f));
    }
    function addIssueEditFile(file) {
      if (issueEditFiles.find(f => f.name === file.name)) return;
      issueEditFiles.push(file);
      renderIssueEditFileList();
    }
    function removeIssueEditFile(name) {
      issueEditFiles = issueEditFiles.filter(f => f.name !== name);
      renderIssueEditFileList();
    }
    function renderIssueEditFileList() {
      document.getElementById('issue-edit-file-list').innerHTML = issueEditFiles.map(f => `
    <div class="qa-file-chip">
      <span>${fileIcon(f.name)}</span>
      <span>${f.name}</span>
      <span style="color:#9ca3af;font-size:10px">(${(f.size / 1024).toFixed(1)}KB)</span>
      <button onclick="removeIssueEditFile('${f.name}')" title="削除">×</button>
    </div>`).join('');
    }

    // ===== 課題管理データ =====
    const issueData = {
      '001': {
        no: '#001', status: 'オープン', priority: '高', priorityIcon: '🔴',
        category: '施工', title: '配線ミス',
        content: '3F配線パネルで誤接続を発見。主電源ラインとアース線が逆接続されており、通電試験中に発覚。即座に通電を停止し、該当箇所を隔離済み。正しい配線図を基に再施工が必要。',
        regDate: '3/13', registrant: '山田 次郎',
        respDate: '3/14', responder: '田中 一郎',
        comments: []
      },
      '002': {
        no: '#002', status: '対応中', priority: '高', priorityIcon: '🔴',
        category: '調達', title: '部品納期遅延',
        content: 'モーター部品（型番：MT-3000A）の納期が当初予定の3/18から1週間遅延し3/25予定となった。メーカー側の製造ラインのトラブルが原因。代替品の手配を検討中。',
        regDate: '3/11', registrant: '佐藤 花子',
        respDate: '3/12', responder: '佐藤 花子',
        comments: [{ text: '代替品メーカーに問い合わせ中', date: '3/12', user: '佐藤 花子' }]
      },
      '003': {
        no: '#003', status: '対応中', priority: '中', priorityIcon: '🟡',
        category: '品質', title: '寸法公差超過',
        content: '取付板（部品番号：PL-112）の寸法が規格値±0.2mmを超過。測定値：+0.45mm。該当ロット（Lot#2024-03）の全数検査を実施中。加工業者への是正要求を発行予定。',
        regDate: '3/10', registrant: '鈴木 三郎',
        respDate: '3/12', responder: '鈴木 三郎',
        comments: [{ text: '加工業者に連絡済み。全数検査の結果待ち。', date: '3/12', user: '鈴木 三郎' }]
      },
      '004': {
        no: '#004', status: 'クローズ', priority: '低', priorityIcon: '⚪',
        category: '設計', title: '図面誤記',
        content: '図面（DWG-2024-087）の部品番号表記ミスを発見。部品番号「AB-123」が誤って「AB-132」と記載されていた。図面を修正し、関係者へ差し替え版を配布済み。',
        regDate: '3/7', registrant: '田中 一郎',
        respDate: '3/8', responder: '田中 一郎',
        comments: [{ text: '図面修正・配布完了。クローズとする。', date: '3/8', user: '田中 一郎' }]
      }
    };

    const issueBadgeMap = {
      'オープン': 'badge-red',
      '対応中': 'badge-orange',
      'クローズ': 'badge-green'
    };

    function openIssueDetail(no) {
      const d = issueData[no];
      if (!d) return;

      document.getElementById('issue-detail-title').textContent = `⚠️ 課題詳細 ${d.no}`;
      document.getElementById('issue-detail-status').innerHTML =
        `<span class="badge ${issueBadgeMap[d.status]}">${d.status}</span>`;
      document.getElementById('issue-detail-meta').innerHTML =
        `<span>${d.priorityIcon} 優先度：${d.priority}</span><span>📂 ${d.category}</span><span>📌 ${d.title}</span>`;
      document.getElementById('issue-detail-content').textContent = d.content;
      document.getElementById('issue-detail-reg-date').textContent = d.regDate;
      document.getElementById('issue-detail-registrant').textContent = d.registrant;
      document.getElementById('issue-detail-resp-date').textContent = d.respDate || '—';
      document.getElementById('issue-detail-responder').textContent = d.responder || '—';
      document.getElementById('issue-detail-status-select').value = d.status;
      document.getElementById('issue-detail-comment').value = '';
      issueEditFiles = [];
      renderIssueEditFileList();

      renderIssueComments(no);

      document.getElementById('modal-issue-detail').dataset.no = no;
      document.getElementById('modal-issue-detail').classList.add('open');
    }

    function renderIssueComments(no) {
      const d = issueData[no];
      const el = document.getElementById('issue-detail-comments');
      if (!d.comments.length) { el.innerHTML = ''; return; }
      el.innerHTML = d.comments.map(c => `
    <div style="background:#f0fdf4;border-left:3px solid #0ABAB5;padding:8px 12px;border-radius:4px;margin-bottom:6px">
      ${c.text ? `<div style="font-size:13px;color:#111827">${c.text}</div>` : ''}
      ${c.files && c.files.length ? `<div class="qa-attached" style="margin-top:6px">${c.files.map(f =>
        `<a href="#" onclick="return false">${fileIcon(f.name)} ${f.name} <span style="color:#9ca3af;font-size:10px">(${(f.size / 1024).toFixed(1)}KB)</span></a>`
      ).join('')}</div>` : ''}
      <div style="font-size:11px;color:#6b7280;margin-top:4px">${c.user}　${c.date}</div>
    </div>`).join('');
    }

    function updateIssueStatus() {
      const no = document.getElementById('modal-issue-detail').dataset.no;
      const d = issueData[no];
      const newStatus = document.getElementById('issue-detail-status-select').value;
      const comment = document.getElementById('issue-detail-comment').value.trim();

      d.status = newStatus;
      if (comment || issueEditFiles.length) {
        const today = new Date();
        const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
        d.comments.push({
          text: comment,
          date: dateStr,
          user: '田中 一郎',
          files: issueEditFiles.map(f => ({ name: f.name, size: f.size }))
        });
      }

      // バッジ更新
      document.getElementById('issue-detail-status').innerHTML =
        `<span class="badge ${issueBadgeMap[newStatus]}">${newStatus}</span>`;
      document.getElementById('issue-detail-comment').value = '';
      issueEditFiles = [];
      renderIssueEditFileList();
      renderIssueComments(no);

      // 一覧のバッジも更新
      const rows = document.querySelectorAll('#page-issues .data-table tbody tr');
      rows.forEach(row => {
        if (row.cells[0].textContent === d.no) {
          row.cells[1].innerHTML = `<span class="badge ${issueBadgeMap[newStatus]}">${newStatus}</span>`;
        }
      });
    }

    // ===== GANTT CHART ENGINE =====
    const ganttState = { view: 'day', year: 2025, month: 2 }; // month: 0-indexed

    const ganttTasks = [
      { name: '要件定義・ヒアリング', person: '田中', status: 'done', start: new Date(2026, 0, 5), end: new Date(2026, 0, 16), level: 0, kosu: 40, progress: 100, jissekiStart: new Date(2026, 0, 5), jissekiEnd: new Date(2026, 0, 16) },
      { name: '基本設計・仕様確定', person: '田中', status: 'done', start: new Date(2026, 0, 19), end: new Date(2026, 1, 6), level: 0, kosu: 60, progress: 100, jissekiStart: new Date(2026, 0, 21), jissekiEnd: new Date(2026, 1, 10) },
      { name: 'サーバー・インフラ構築', person: '鈴木', status: 'done', start: new Date(2026, 1, 2), end: new Date(2026, 1, 13), level: 0, kosu: 48, progress: 100, jissekiStart: new Date(2026, 1, 2), jissekiEnd: new Date(2026, 1, 13) },
      { name: '部品・機材調達', person: '佐藤', status: 'done', start: new Date(2026, 1, 9), end: new Date(2026, 2, 6), level: 0, kosu: 32, progress: 100, jissekiStart: new Date(2026, 1, 12), jissekiEnd: new Date(2026, 2, 13) },
      { name: '設備設置・配線工事', person: '山田', status: 'done', start: new Date(2026, 2, 2), end: new Date(2026, 2, 13), level: 0, kosu: 56, progress: 100, jissekiStart: new Date(2026, 2, 2), jissekiEnd: new Date(2026, 2, 13) },
      { name: 'ソフトウェア開発', person: '田中', status: 'doing', start: new Date(2026, 2, 9), end: new Date(2026, 3, 10), level: 0, kosu: 120, progress: 65, jissekiStart: new Date(2026, 2, 9), jissekiEnd: null },
      { name: 'フロントエンド開発', person: '田中', status: 'doing', start: new Date(2026, 2, 9), end: new Date(2026, 2, 27), level: 1, kosu: 64, progress: 70, jissekiStart: new Date(2026, 2, 9), jissekiEnd: null },
      { name: 'バックエンド開発', person: '鈴木', status: 'doing', start: new Date(2026, 2, 16), end: new Date(2026, 3, 10), level: 1, kosu: 56, progress: 55, jissekiStart: new Date(2026, 2, 19), jissekiEnd: null },
      { name: 'UI/UXデザイン', person: '山田', status: 'doing', start: new Date(2026, 2, 16), end: new Date(2026, 3, 3), level: 0, kosu: 40, progress: 80, jissekiStart: new Date(2026, 2, 16), jissekiEnd: null },
      { name: '単体テスト', person: '鈴木', status: 'plan', start: new Date(2026, 3, 6), end: new Date(2026, 3, 17), level: 0, kosu: 48, progress: 0, jissekiStart: null, jissekiEnd: null },
      { name: 'APIテスト', person: '佐藤', status: 'plan', start: new Date(2026, 3, 6), end: new Date(2026, 3, 10), level: 1, kosu: 24, progress: 0, jissekiStart: null, jissekiEnd: null },
      { name: '結合テスト・検証', person: '佐藤', status: 'plan', start: new Date(2026, 3, 13), end: new Date(2026, 3, 24), level: 0, kosu: 40, progress: 0, jissekiStart: null, jissekiEnd: null },
      { name: '検査・品質確認', person: '鈴木', status: 'plan', start: new Date(2026, 3, 20), end: new Date(2026, 4, 1), level: 0, kosu: 32, progress: 0, jissekiStart: null, jissekiEnd: null },
      { name: 'ユーザー研修・説明会', person: '山田', status: 'plan', start: new Date(2026, 4, 7), end: new Date(2026, 4, 11), level: 0, kosu: 16, progress: 0, jissekiStart: null, jissekiEnd: null },
      { name: '本番リリース・納品', person: '田中', status: 'plan', start: new Date(2026, 4, 14), end: new Date(2026, 4, 18), level: 0, kosu: 24, progress: 0, jissekiStart: null, jissekiEnd: null },
      { name: '保守・アフターサポート', person: '鈴木', status: 'plan', start: new Date(2026, 4, 21), end: new Date(2026, 5, 30), level: 0, kosu: 80, progress: 0, jissekiStart: null, jissekiEnd: null },
    ];

    let ganttSelectedIdx = -1;
    let ganttFixedW = 0;
    const ganttCollapsed = new Set();

    const ganttFilter = { name: '', person: '', status: '' };

    function ganttApplyFilter() {
      ganttFilter.name = (document.getElementById('gf-name') || {}).value || '';
      ganttFilter.person = (document.getElementById('gf-person') || {}).value || '';
      ganttFilter.status = (document.getElementById('gf-status') || {}).value || '';
      ganttRender();
    }

    function ganttClearFilter() {
      ['gf-name', 'gf-person', 'gf-status'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      ganttFilter.name = ganttFilter.person = ganttFilter.status = '';
      ganttRender();
    }

    function taskMatchesFilter(task) {
      const n = ganttFilter.name.trim().toLowerCase();
      const p = ganttFilter.person.trim().toLowerCase();
      const s = ganttFilter.status;
      if (n && !(task.name || '').toLowerCase().includes(n)) return false;
      if (p && !(task.person || '').toLowerCase().includes(p)) return false;
      if (s && task.status !== s) return false;
      return true;
    }

    function getVisibleIndices() {
      const hasFilter = ganttFilter.name || ganttFilter.person || ganttFilter.status;
      const visible = [];

      if (hasFilter) {
        // When filtering: show matched tasks + their parent chain, ignore collapse
        const matched = new Set();
        ganttTasks.forEach((task, idx) => { if (taskMatchesFilter(task)) matched.add(idx); });
        // Include parents of matched subtasks
        ganttTasks.forEach((task, idx) => {
          if (!matched.has(idx)) return;
          let lv = task.level || 0;
          if (lv === 0) return;
          for (let j = idx - 1; j >= 0; j--) {
            if ((ganttTasks[j].level || 0) < lv) { matched.add(j); lv = ganttTasks[j].level || 0; }
            if (lv === 0) break;
          }
        });
        ganttTasks.forEach((_, idx) => { if (matched.has(idx)) visible.push(idx); });
        return visible;
      }

      // Normal mode: respect collapse
      let skipAboveLevel = -1;
      ganttTasks.forEach((task, idx) => {
        const lv = task.level || 0;
        if (skipAboveLevel >= 0 && lv > skipAboveLevel) return;
        skipAboveLevel = -1;
        visible.push(idx);
        if (ganttCollapsed.has(idx)) skipAboveLevel = lv;
      });
      return visible;
    }

    function ganttToggleCollapse(idx, e) {
      e.stopPropagation();
      if (ganttCollapsed.has(idx)) ganttCollapsed.delete(idx);
      else ganttCollapsed.add(idx);
      ganttRender();
    }

    function ganttExpandAll() {
      ganttCollapsed.clear();
      ganttRender();
    }

    function ganttCollapseToTasks() {
      ganttCollapsed.clear();
      ganttTasks.forEach((task, idx) => {
        if (idx < ganttTasks.length - 1 && (ganttTasks[idx + 1].level || 0) > (task.level || 0)) ganttCollapsed.add(idx);
      });
      ganttRender();
    }

    function ganttSetContextButtons(enabled) {
      ['btn-add-task-sel', 'btn-add-subtask', 'btn-save-task', 'btn-cancel-task'].forEach(id => {
        const b = document.getElementById(id);
        if (!b) return;
        b.disabled = !enabled;
        b.style.opacity = enabled ? '1' : '0.35';
      });
    }

    let ganttTaskBackup = null;

    function ganttSaveTask() {
      if (ganttSelectedIdx < 0) return;
      delete ganttTasks[ganttSelectedIdx]._new;
      ganttTaskBackup = null;
      ganttSetContextButtons(false);
      document.querySelectorAll('#page-schedule .gantt tbody tr.row-selected').forEach(r => r.classList.remove('row-selected'));
      ganttSelectedIdx = -1;
    }

    function ganttCancelTask() {
      if (ganttSelectedIdx < 0) return;
      const task = ganttTasks[ganttSelectedIdx];
      if (task._new) {
        ganttTasks.splice(ganttSelectedIdx, 1);
      } else if (ganttTaskBackup) {
        ganttTasks[ganttSelectedIdx] = ganttTaskBackup;
      }
      ganttTaskBackup = null;
      ganttSelectedIdx = -1;
      ganttRender();
      ganttSetContextButtons(false);
    }

    function ganttSelectRow(tr) {
      document.querySelectorAll('#page-schedule .gantt tbody tr.row-selected').forEach(r => r.classList.remove('row-selected'));
      tr.classList.add('row-selected');
      ganttSelectedIdx = parseInt(tr.dataset.idx);
      ganttTaskBackup = Object.assign({}, ganttTasks[ganttSelectedIdx]);
      ganttSetContextButtons(true);
    }

    function ganttClearSelection() {
      document.querySelectorAll('#page-schedule .gantt tbody tr.row-selected').forEach(r => r.classList.remove('row-selected'));
      ganttSelectedIdx = -1;
      ganttSetContextButtons(false);
    }

    function ganttAddTaskAtEnd() {
      ganttTasks.push({
        name: '新規タスク', person: '', status: 'plan',
        start: null, end: null, level: 0, _new: true
      });
      ganttRender();
      ganttSelectedIdx = ganttTasks.length - 1;
      const rows = document.querySelectorAll('#page-schedule .gantt tbody tr');
      if (rows[ganttSelectedIdx]) {
        rows[ganttSelectedIdx].classList.add('row-selected');
        ganttSetContextButtons(true);
      }
    }

    function ganttAddTask(isSubtask) {
      if (ganttSelectedIdx < 0) return;
      const base = ganttTasks[ganttSelectedIdx];
      const newTask = {
        name: isSubtask ? 'サブタスク' : '新規タスク',
        person: '',
        status: 'plan',
        start: null,
        end: null,
        level: isSubtask ? (base.level + 1) : base.level,
        _new: true,
      };
      ganttTasks.splice(ganttSelectedIdx + 1, 0, newTask);
      ganttRender();
      ganttSelectedIdx = ganttSelectedIdx + 1;
      const rows = document.querySelectorAll('#page-schedule .gantt tbody tr');
      if (rows[ganttSelectedIdx]) {
        rows[ganttSelectedIdx].classList.add('row-selected');
        ganttSetContextButtons(true);
      }
    }

    function ganttSetView(view) {
      ganttState.view = view;
      document.querySelectorAll('.gantt-view-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('gvb-' + view).classList.add('active');
      ganttRender();
    }

    function ganttBuildColumns() {
      const view = ganttState.view;
      const cols = [];
      const groups = [];

      // Auto date range from task data (ignore null dates) + 1 month buffer at end
      const validStarts = ganttTasks.map(t => t.start).filter(Boolean);
      const validEnds = [...ganttTasks.map(t => t.end), ...ganttTasks.map(t => t.jissekiEnd)].filter(Boolean);
      if (!validStarts.length) return { cols: [], groups: [] };
      const minDate = new Date(Math.min(...validStarts));
      const rawMax = new Date(Math.max(...validEnds));
      const maxDate = new Date(rawMax.getFullYear(), rawMax.getMonth() + 1, rawMax.getDate()); // +1 month

      if (view === 'day') {
        let cur = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
        const end = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0);
        let curGroup = null;
        while (cur <= end) {
          const y = cur.getFullYear(), m = cur.getMonth(), d = cur.getDate();
          const gLabel = y + '年' + (m + 1) + '月';
          if (!curGroup || curGroup.label !== gLabel) { curGroup = { label: gLabel, span: 0 }; groups.push(curGroup); }
          cols.push({ label: String(d), start: new Date(y, m, d), end: new Date(y, m, d, 23, 59, 59) });
          curGroup.span++;
          cur = new Date(y, m, d + 1);
        }

      } else if (view === 'week') {
        let curMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
        const endMonth = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 1);
        while (curMonth < endMonth) {
          const y = curMonth.getFullYear(), m = curMonth.getMonth();
          const daysInM = new Date(y, m + 1, 0).getDate();
          const weekCols = [];
          for (let d = 1; d <= daysInM; d += 7) {
            const endDay = Math.min(d + 6, daysInM);
            weekCols.push({ label: 'W' + (weekCols.length + 1), start: new Date(y, m, d), end: new Date(y, m, endDay, 23, 59, 59) });
          }
          groups.push({ label: y + '年' + (m + 1) + '月', span: weekCols.length });
          weekCols.forEach(c => cols.push(c));
          curMonth = new Date(y, m + 1, 1);
        }

      } else if (view === 'month') {
        const mNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        let y = minDate.getFullYear();
        const endY = maxDate.getFullYear(), endM = maxDate.getMonth();
        let curGroup = null;
        let m = minDate.getMonth();
        while (y < endY || (y === endY && m <= endM)) {
          const gLabel = y + '年';
          if (!curGroup || curGroup.label !== gLabel) { curGroup = { label: gLabel, span: 0 }; groups.push(curGroup); }
          const daysInM = new Date(y, m + 1, 0).getDate();
          cols.push({ label: mNames[m], start: new Date(y, m, 1), end: new Date(y, m, daysInM, 23, 59, 59) });
          curGroup.span++;
          m++; if (m > 11) { m = 0; y++; }
        }

      } else if (view === 'quarter') {
        let y = minDate.getFullYear(), q = Math.floor(minDate.getMonth() / 3);
        const endY = maxDate.getFullYear(), endQ = Math.floor(maxDate.getMonth() / 3);
        let curGroup = null;
        while (y < endY || (y === endY && q <= endQ)) {
          const gLabel = y + '年';
          if (!curGroup || curGroup.label !== gLabel) { curGroup = { label: gLabel, span: 0 }; groups.push(curGroup); }
          const sm = q * 3, em = sm + 2;
          cols.push({ label: 'Q' + (q + 1), start: new Date(y, sm, 1), end: new Date(y, em + 1, 0, 23, 59, 59) });
          curGroup.span++;
          q++; if (q > 3) { q = 0; y++; }
        }
      }

      return { cols, groups };
    }

    function fmtDate(d) {
      return d.getFullYear() + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + String(d.getDate()).padStart(2, '0');
    }
    function ganttToISO(d) {
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function ganttEsc(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
    function ganttSaveField(idx, field, value) {
      if (['start', 'end', 'jissekiStart', 'jissekiEnd'].includes(field)) {
        if (!value.trim()) { ganttTasks[idx][field] = null; ganttRender(); return; }
        const sep = value.includes('/') ? '/' : '-';
        const [y, m, d] = value.split(sep).map(Number);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) ganttTasks[idx][field] = new Date(y, m - 1, d);
      } else if (field === 'progress' || field === 'kosu') {
        const n = parseInt(value);
        if (!isNaN(n)) ganttTasks[idx][field] = Math.max(0, field === 'progress' ? Math.min(100, n) : n);
      } else {
        ganttTasks[idx][field] = value;
      }
      ganttRender();
    }

    function ganttRender() {
      const { cols, groups } = ganttBuildColumns();
      const { view } = ganttState;

      // Fixed left column definitions (width in px, cumulative left)
      const FC = [
        { label: 'タスク', w: 160, align: 'left' },
        { label: '担当', w: 68, align: 'center' },
        { label: '開始予定日', w: 108, align: 'center' },
        { label: '終了予定日', w: 108, align: 'center' },
        { label: '状態', w: 80, align: 'center' },
        { label: '進捗(%)', w: 72, align: 'center' },
      ];
      let acc = 0;
      FC.forEach(c => { c.left = acc; acc += c.w; });
      ganttFixedW = acc;
      const stickyTh = (c, i) => {
        const isLast = i === FC.length - 1;
        return '<th rowspan="2" style="position:sticky;left:' + c.left + 'px;width:' + c.w + 'px;min-width:' + c.w + 'px;'
          + 'text-align:' + c.align + ';vertical-align:middle;background:#f8fafc;z-index:2'
          + (isLast ? ';box-shadow:3px 0 6px rgba(0,0,0,0.08)' : '') + '">' + c.label + '</th>';
      };
      const stickyTd = (content, c, i) => {
        const isLast = i === FC.length - 1;
        return '<td style="position:sticky;left:' + c.left + 'px;width:' + c.w + 'px;min-width:' + c.w + 'px;'
          + 'text-align:' + c.align + ';background:#fff;z-index:1'
          + (isLast ? ';box-shadow:3px 0 6px rgba(0,0,0,0.08)' : '') + '">' + content + '</td>';
      };

      const minDate = new Date(Math.min(...ganttTasks.filter(t => t.start).map(t => t.start)));
      const maxDate = new Date(Math.max(...ganttTasks.filter(t => t.end).map(t => t.end)));
      const fmtYM = d => d.getFullYear() + '年' + (d.getMonth() + 1) + '月';
      const viewLabel = { day: '日次', week: '週次', month: '月次', quarter: '四半期' }[view];
      document.getElementById('gantt-title').textContent = 'ガントチャート（' + viewLabel + '）';

      // Header row 1
      let h1 = '<tr>' + FC.map((c, i) => stickyTh(c, i)).join('');
      groups.forEach(g => { h1 += '<th colspan="' + g.span + '" class="gantt-group">' + g.label + '</th>'; });
      h1 += '</tr>';

      // Header row 2: timeline only
      let h2 = '<tr>';
      cols.forEach(c => { h2 += '<th style="text-align:center;font-size:10px;min-width:32px;padding:3px 2px">' + c.label + '</th>'; });
      h2 += '</tr>';

      // Body rows
      let body = '';
      getVisibleIndices().forEach(idx => {
        const task = ganttTasks[idx];
        const barCls = task.status === 'done' ? 'bar-done' : task.status === 'doing' ? 'bar-doing' : 'bar-plan';
        const statusSel =
          '<select class="gantt-cell-select" onchange="ganttSaveField(' + idx + ',\'status\',this.value)">'
          + '<option value="done"' + (task.status === 'done' ? ' selected' : '') + '>完了</option>'
          + '<option value="doing"' + (task.status === 'doing' ? ' selected' : '') + '>進行中</option>'
          + '<option value="plan"' + (task.status === 'plan' ? ' selected' : '') + '>未開始</option>'
          + '</select>';

        const hasChild = idx < ganttTasks.length - 1 && (ganttTasks[idx + 1] ? (ganttTasks[idx + 1].level || 0) > (task.level || 0) : false);
        const isCollapsed = ganttCollapsed.has(idx);
        const toggleBtn = hasChild
          ? '<span onclick="ganttToggleCollapse(' + idx + ',event)" style="cursor:pointer;margin-right:3px;font-size:11px;color:#0ABAB5;user-select:none">' + (isCollapsed ? '▶' : '▼') + '</span>'
          : '<span style="display:inline-block;width:14px;flex-shrink:0"></span>';

        const indent = (task.level || 0) * 18;
        const prefix = (task.level || 0) > 0 ? '<span style="color:#9ca3af;margin-right:4px;font-size:11px">↳</span>' : '';
        const progressBar = task.progress > 0
          ? '<div style="height:5px;border-radius:3px;background:#e2e8f0;margin-top:2px"><div style="height:100%;border-radius:3px;background:' + (task.status === 'done' ? '#10b981' : '#f59e0b') + ';width:' + task.progress + '%"></div></div>'
          : '';
        const leftCells = [
          stickyTd(toggleBtn + prefix + '<input class="gantt-cell-input" style="padding-left:' + indent + 'px;width:calc(100% - ' + (indent + 16) + 'px)" value="' + ganttEsc(task.name) + '" onblur="ganttSaveField(' + idx + ',\'name\',this.value)">', FC[0], 0),
          stickyTd('<input class="gantt-cell-input" style="text-align:center" value="' + ganttEsc(task.person) + '" onblur="ganttSaveField(' + idx + ',\'person\',this.value)">', FC[1], 1),
          stickyTd('<input type="text" class="gantt-cell-input date-input" placeholder="YYYY/MM/DD" value="' + (task.start ? fmtDate(task.start) : '') + '" onblur="ganttSaveField(' + idx + ',\'start\',this.value)">', FC[2], 2),
          stickyTd('<input type="text" class="gantt-cell-input date-input" placeholder="YYYY/MM/DD" value="' + (task.end ? fmtDate(task.end) : '') + '" onblur="ganttSaveField(' + idx + ',\'end\',this.value)">', FC[3], 3),
          stickyTd(statusSel, FC[4], 4),
          stickyTd('<input class="gantt-cell-input" style="text-align:center" value="' + (task.progress != null ? task.progress : '') + '" onblur="ganttSaveField(' + idx + ',\'progress\',this.value)">' + progressBar, FC[5], 5),
        ].join('');

        const fillColor = task.status === 'done' ? '#10b981' : task.status === 'doing' ? '#f59e0b' : '#cbd5e1';
        const delayColor = '#ef4444';
        // Actual delay: jissekiEnd > planned end
        const hasDelay = task.jissekiEnd && task.end && task.jissekiEnd > task.end;

        let cells = '';
        let i = 0;
        while (i < cols.length) {
          const col = cols[i];
          const inPlanned = task.start && task.end && task.start <= col.end && task.end >= col.start;
          const inDelay = hasDelay && col.start > task.end && col.start <= task.jissekiEnd;

          if (inPlanned) {
            let span = 1;
            while (i + span < cols.length && task.start <= cols[i + span].end && task.end >= cols[i + span].start) span++;
            const pct = task.progress || 0;
            const label = pct > 0 ? '<div class="gantt-bar-label">' + pct + '%</div>' : '';
            cells += '<td colspan="' + span + '" style="padding:3px 4px">'
              + '<div class="gantt-bar-wrap ' + barCls + '">'
              + '<div class="gantt-bar-fill" style="width:' + pct + '%;background:' + fillColor + '"></div>'
              + label + '</div></td>';
            i += span;
          } else if (inDelay) {
            let span = 1;
            while (i + span < cols.length && cols[i + span].start > task.end && cols[i + span].start <= task.jissekiEnd) span++;
            cells += '<td colspan="' + span + '" style="padding:3px 4px">'
              + '<div title="遅延" style="height:8px;border-radius:3px;background:' + delayColor + ';opacity:0.75;margin-top:3px"></div></td>';
            i += span;
          } else {
            cells += '<td></td>';
            i++;
          }
        }
        body += '<tr data-idx="' + idx + '" onclick="ganttSelectRow(this)">' + leftCells + cells + '</tr>';
      });

      const wrap = document.getElementById('gantt-container');
      const tableHTML = '<table class="gantt"><thead>' + h1 + h2 + '</thead><tbody>' + body + '</tbody></table>';

      // Restore row selection
      if (ganttSelectedIdx >= 0) {
        const selRow = document.querySelector('#page-schedule .gantt tbody tr[data-idx="' + ganttSelectedIdx + '"]');
        if (selRow) selRow.classList.add('row-selected');
      }

      // Wrap table in a relative container so today-line scrolls with content
      const inner = document.createElement('div');
      inner.style.cssText = 'position:relative;display:inline-block;min-width:100%';
      inner.innerHTML = tableHTML;
      wrap.innerHTML = '';
      wrap.appendChild(inner);

      // Today line
      const today = new Date(); today.setHours(12, 0, 0, 0);
      const todayIdx = cols.findIndex(c => c.start <= today && today <= c.end);
      if (todayIdx >= 0) {
        const timelineThs = inner.querySelectorAll('thead tr:nth-child(2) th');
        const todayTh = timelineThs[todayIdx];
        if (todayTh) {
          const innerRect = inner.getBoundingClientRect();
          const thRect = todayTh.getBoundingClientRect();
          const x = Math.round(thRect.left + thRect.width / 2 - innerRect.left);
          const line = document.createElement('div');
          line.style.cssText = 'position:absolute;top:0;bottom:0;left:' + x + 'px;width:2px;background:#ef4444;opacity:0.85;pointer-events:none;z-index:10;';
          const lbl = document.createElement('div');
          lbl.textContent = '今日';
          lbl.style.cssText = 'position:absolute;top:3px;left:4px;background:#ef4444;color:#fff;font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;white-space:nowrap;';
          line.appendChild(lbl);
          inner.appendChild(line);
        }
      }
    }

    // ===== SCHEDULE EXPORT / IMPORT / TEMPLATE =====
    function scheduleExport() {
      const rows = document.querySelectorAll('#page-schedule .gantt tbody tr');
      const headers = ['タスク名', '担当', '状態', '開始日', '終了日', '備考'];
      const csvRows = [headers.join(',')];
      rows.forEach(tr => {
        const cells = tr.querySelectorAll('td');
        if (cells.length < 3) return;
        const taskName = cells[0].textContent.trim().replace(/,/g, '、');
        const person = cells[1].textContent.trim().replace(/,/g, '、');
        const status = cells[2].textContent.trim().replace(/,/g, '、');
        csvRows.push([taskName, person, status, '', '', ''].join(','));
      });
      const bom = '\uFEFF';
      const blob = new Blob([bom + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule_export.csv';
      a.click();
      URL.revokeObjectURL(url);
    }

    function scheduleDownloadTemplate() {
      const headers = ['タスク名', '担当', '状態', '開始日', '終了日', '備考'];
      const example = ['例: 設計・仕様確定', '田中', '完了', '2025-03-03', '2025-03-07', ''];
      const bom = '\uFEFF';
      const csv = bom + headers.join(',') + '\n' + example.join(',');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule_template.csv';
      a.click();
      URL.revokeObjectURL(url);
    }

    function scheduleImport(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result.replace(/^\uFEFF/, '');
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length < 2) { alert('データが見つかりませんでした。'); return; }
        const tbody = document.querySelector('#page-schedule .gantt tbody');
        tbody.innerHTML = '';
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',');
          const taskName = cols[0] || '';
          const person = cols[1] || '';
          const status = cols[2] || '';
          const startDate = cols[3] || '';
          const endDate = cols[4] || '';
          const note = cols[5] || '';
          let badgeClass = 'badge-gray';
          if (status === '完了') badgeClass = 'badge-green';
          else if (status === '進行中') badgeClass = 'badge-orange';
          else if (status === '遅延') badgeClass = 'badge-red';
          const tr = document.createElement('tr');
          tr.innerHTML = `
        <td class="task-name">${taskName}</td>
        <td><span class="tag">${person}</span></td>
        <td><span class="badge ${badgeClass}">${status}</span></td>
        <td colspan="5" style="padding:4px 6px;color:#9ca3af;font-size:11px">${startDate}〜${endDate}</td>
        <td colspan="15" style="font-size:11px;color:#9ca3af">${note}</td>`;
          tbody.appendChild(tr);
        }
        alert(`${lines.length - 1}件のタスクをインポートしました。`);
      };
      reader.readAsText(file, 'UTF-8');
      event.target.value = '';
    }

    // ===== TASK TABLE ENGINE =====
    let ttSelectedIdx = -1;
    const ttCollapsed = new Set();
    let ttTaskBackup = null;

    function ttGetVisibleIndices() {
      const visible = [];
      let skipAbove = -1;
      ganttTasks.forEach((task, idx) => {
        const lv = task.level || 0;
        if (skipAbove >= 0 && lv > skipAbove) return;
        skipAbove = -1;
        visible.push(idx);
        if (ttCollapsed.has(idx)) skipAbove = lv;
      });
      return visible;
    }

    function ttSetContextButtons(enabled) {
      ['tt-btn-add-sel', 'tt-btn-add-sub', 'tt-btn-save', 'tt-btn-cancel'].forEach(id => {
        const b = document.getElementById(id);
        if (b) { b.disabled = !enabled; b.style.opacity = enabled ? '1' : '0.35'; }
      });
    }

    function ttSelectRow(tr) {
      document.querySelectorAll('#page-progress .gantt tbody tr.row-selected').forEach(r => r.classList.remove('row-selected'));
      tr.classList.add('row-selected');
      ttSelectedIdx = parseInt(tr.dataset.idx);
      ttTaskBackup = Object.assign({}, ganttTasks[ttSelectedIdx]);
      ttSetContextButtons(true);
    }

    function taskTableSave() {
      if (ttSelectedIdx < 0) return;
      delete ganttTasks[ttSelectedIdx]._new;
      ttTaskBackup = null;
      ttSetContextButtons(false);
      document.querySelectorAll('#page-progress .gantt tbody tr.row-selected').forEach(r => r.classList.remove('row-selected'));
      ttSelectedIdx = -1;
      taskTableUpdateStats();
    }

    function taskTableCancel() {
      if (ttSelectedIdx < 0) return;
      const task = ganttTasks[ttSelectedIdx];
      if (task._new) { ganttTasks.splice(ttSelectedIdx, 1); }
      else if (ttTaskBackup) { ganttTasks[ttSelectedIdx] = ttTaskBackup; }
      ttTaskBackup = null;
      ttSelectedIdx = -1;
      taskTableRender();
      ttSetContextButtons(false);
    }

    function ttSaveField(idx, field, value) {
      if (field === 'jissekiStart' || field === 'jissekiEnd') {
        if (!value.trim()) { ganttTasks[idx][field] = null; }
        else {
          const sep = value.includes('/') ? '/' : '-';
          const [y, m, d] = value.split(sep).map(Number);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) ganttTasks[idx][field] = new Date(y, m - 1, d);
        }
      } else if (field === 'kosu' || field === 'progress') {
        const n = parseInt(value);
        ganttTasks[idx][field] = isNaN(n) ? 0 : Math.max(0, field === 'progress' ? Math.min(100, n) : n);
      } else {
        ganttTasks[idx][field] = value;
      }
      taskTableRender();
    }

    function taskTableAddAtEnd() {
      ganttTasks.push({
        name: '新規タスク', person: '', status: 'plan', start: null, end: null, level: 0,
        kosu: 0, progress: 0, jissekiStart: null, jissekiEnd: null, _new: true
      });
      taskTableRender();
      ttSelectedIdx = ganttTasks.length - 1;
      const rows = document.querySelectorAll('#page-progress .gantt tbody tr');
      if (rows[rows.length - 1]) { rows[rows.length - 1].classList.add('row-selected'); ttSetContextButtons(true); }
    }

    function taskTableAddTask(isSubtask) {
      if (ttSelectedIdx < 0) return;
      const base = ganttTasks[ttSelectedIdx];
      const newTask = {
        name: isSubtask ? 'サブタスク' : '新規タスク', person: base.person || '',
        status: 'plan', start: null, end: null,
        level: isSubtask ? (base.level + 1) : base.level,
        kosu: 0, progress: 0, jissekiStart: null, jissekiEnd: null, _new: true
      };
      ganttTasks.splice(ttSelectedIdx + 1, 0, newTask);
      taskTableRender();
      ttSelectedIdx = ttSelectedIdx + 1;
      const rows = document.querySelectorAll('#page-progress .gantt tbody tr');
      if (rows[ttSelectedIdx]) { rows[ttSelectedIdx].classList.add('row-selected'); ttSetContextButtons(true); }
    }

    function taskTableExpandAll() { ttCollapsed.clear(); taskTableRender(); }
    function taskTableCollapseToTasks() {
      ttCollapsed.clear();
      ganttTasks.forEach((t, i) => {
        if (i < ganttTasks.length - 1 && (ganttTasks[i + 1].level || 0) > (t.level || 0)) ttCollapsed.add(i);
      });
      taskTableRender();
    }

    function ttToggleCollapse(idx, e) {
      e.stopPropagation();
      if (ttCollapsed.has(idx)) ttCollapsed.delete(idx);
      else ttCollapsed.add(idx);
      taskTableRender();
    }

    function taskTableUpdateStats() {
      const total = ganttTasks.length;
      const done = ganttTasks.filter(t => t.status === 'done').length;
      const doing = ganttTasks.filter(t => t.status === 'doing').length;
      const plan = ganttTasks.filter(t => t.status === 'plan').length;
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      set('ts-total', total); set('ts-done', done); set('ts-doing', doing); set('ts-plan', plan);
    }

    function taskTableExport() {
      const headers = ['タスク名', '担当', '状態', '開始予定日', '終了予定日', '工数(h)', '進捗(%)', '実績開始日', '実績終了日'];
      const rows = [headers.join(',')];
      ganttTasks.forEach(t => {
        rows.push([
          '"' + (t.name || '').replace(/"/g, '""') + '"',
          t.person || '',
          t.status === 'done' ? '完了' : t.status === 'doing' ? '進行中' : '未開始',
          t.start ? fmtDate(t.start) : '',
          t.end ? fmtDate(t.end) : '',
          t.kosu || 0,
          t.progress || 0,
          t.jissekiStart ? fmtDate(t.jissekiStart) : '',
          t.jissekiEnd ? fmtDate(t.jissekiEnd) : '',
        ].join(','));
      });
      const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = 'tasks.csv'; a.click();
    }

    function taskTableRender() {
      taskTableUpdateStats();

      const FC = [
        { label: 'タスク名', w: 170, align: 'left' },
        { label: '担当', w: 72, align: 'center' },
        { label: '開始予定日', w: 110, align: 'center' },
        { label: '終了予定日', w: 110, align: 'center' },
        { label: '状態', w: 84, align: 'center' },
        { label: '工数(h)', w: 72, align: 'center' },
        { label: '進捗(%)', w: 120, align: 'center' },
        { label: '実績開始日', w: 110, align: 'center' },
        { label: '実績終了日', w: 110, align: 'center' },
      ];
      let acc = 0;
      FC.forEach((c, i) => {
        c.left = acc; acc += c.w;
        c.sticky = i < 5;
      });

      const th = c => '<th style="' + (c.sticky ? 'position:sticky;left:' + c.left + 'px;z-index:2;background:#f8fafc;' : 'background:#f8fafc;')
        + 'width:' + c.w + 'px;min-width:' + c.w + 'px;text-align:' + c.align + ';padding:8px 10px;border:1px solid #e2e8f0;font-weight:600;font-size:12px;white-space:nowrap'
        + (c.sticky && FC.indexOf(c) === 4 ? ';box-shadow:3px 0 6px rgba(0,0,0,0.08)' : '') + '">' + c.label + '</th>';

      const td = (content, c) => '<td style="' + (c.sticky ? 'position:sticky;left:' + c.left + 'px;z-index:1;background:#fff;' : '')
        + 'width:' + c.w + 'px;min-width:' + c.w + 'px;text-align:' + c.align + ';padding:6px 10px;border:1px solid #e2e8f0;vertical-align:middle'
        + (c.sticky && FC.indexOf(c) === 4 ? ';box-shadow:3px 0 6px rgba(0,0,0,0.08)' : '') + '">' + content + '</td>';

      let header = '<tr>' + FC.map(c => th(c)).join('') + '</tr>';
      let body = '';

      ttGetVisibleIndices().forEach(idx => {
        const t = ganttTasks[idx];
        const indent = (t.level || 0) * 18;
        const hasChild = idx < ganttTasks.length - 1 && (ganttTasks[idx + 1]?.level || 0) > (t.level || 0);
        const isCollapsed = ttCollapsed.has(idx);
        const toggleBtn = hasChild
          ? '<span onclick="ttToggleCollapse(' + idx + ',event)" style="cursor:pointer;margin-right:3px;font-size:11px;color:#0ABAB5;user-select:none">' + (isCollapsed ? '▶' : '▼') + '</span>'
          : '<span style="display:inline-block;width:14px"></span>';
        const prefix = (t.level || 0) > 0 ? '<span style="color:#9ca3af;margin-right:4px;font-size:11px">↳</span>' : '';

        const statusSel = '<select class="gantt-cell-select" onchange="ttSaveField(' + idx + ',\'status\',this.value)">'
          + '<option value="done"' + (t.status === 'done' ? ' selected' : '') + '>完了</option>'
          + '<option value="doing"' + (t.status === 'doing' ? ' selected' : '') + '>進行中</option>'
          + '<option value="plan"' + (t.status === 'plan' ? ' selected' : '') + '>未開始</option>'
          + '</select>';

        const pct = t.progress || 0;
        const pBar = '<div style="display:flex;align-items:center;gap:4px">'
          + '<div style="flex:1;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden">'
          + '<div style="height:100%;width:' + pct + '%;background:' + (pct === 100 ? '#10b981' : pct > 50 ? '#0ABAB5' : '#f59e0b') + ';border-radius:4px"></div></div>'
          + '<input class="gantt-cell-input" type="number" min="0" max="100" value="' + pct + '" style="width:38px;text-align:right" onblur="ttSaveField(' + idx + ',\'progress\',this.value)">'
          + '</div>';

        const cells = [
          td(toggleBtn + prefix + '<input class="gantt-cell-input" style="padding-left:' + indent + 'px;width:calc(100% - ' + (indent + 16) + 'px)" value="' + ganttEsc(t.name) + '" onblur="ttSaveField(' + idx + ',\'name\',this.value)">', FC[0]),
          td('<input class="gantt-cell-input" style="text-align:center" value="' + ganttEsc(t.person || '') + '" onblur="ttSaveField(' + idx + ',\'person\',this.value)">', FC[1]),
          td('<input type="text" class="gantt-cell-input date-input" placeholder="YYYY/MM/DD" value="' + (t.start ? fmtDate(t.start) : '') + '" onblur="ttSaveField(' + idx + ',\'start\',this.value)">', FC[2]),
          td('<input type="text" class="gantt-cell-input date-input" placeholder="YYYY/MM/DD" value="' + (t.end ? fmtDate(t.end) : '') + '" onblur="ttSaveField(' + idx + ',\'end\',this.value)">', FC[3]),
          td(statusSel, FC[4]),
          td('<input class="gantt-cell-input" type="number" min="0" value="' + (t.kosu || 0) + '" style="text-align:center" onblur="ttSaveField(' + idx + ',\'kosu\',this.value)">', FC[5]),
          td(pBar, FC[6]),
          td('<input type="text" class="gantt-cell-input date-input" placeholder="YYYY/MM/DD" value="' + (t.jissekiStart ? fmtDate(t.jissekiStart) : '') + '" onblur="ttSaveField(' + idx + ',\'jissekiStart\',this.value)">', FC[7]),
          td('<input type="text" class="gantt-cell-input date-input" placeholder="YYYY/MM/DD" value="' + (t.jissekiEnd ? fmtDate(t.jissekiEnd) : '') + '" onblur="ttSaveField(' + idx + ',\'jissekiEnd\',this.value)">', FC[8]),
        ].join('');

        body += '<tr data-idx="' + idx + '" onclick="ttSelectRow(this)">' + cells + '</tr>';
      });

      const container = document.getElementById('task-table-container');
      if (!container) return;
      container.innerHTML = '<table class="gantt"><thead>' + header + '</thead><tbody>' + body + '</tbody></table>';

      if (ttSelectedIdx >= 0) {
        const sel = container.querySelector('tr[data-idx="' + ttSelectedIdx + '"]');
        if (sel) sel.classList.add('row-selected');
      }
    }

    // ===== MODAL CLOSE ON OVERLAY CLICK =====
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('open');
      });
    });

    // ===== INIT =====
    ganttRender();

    // ===== GANTT DRAG-SCROLL (single stable listener) =====
    (function () {
      let isDown = false, startX = 0, scrollLeft = 0, wrap = null;

      document.addEventListener('mousedown', e => {
        const w = document.getElementById('gantt-container');
        if (!w || !w.contains(e.target)) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
        // Block drag if click is within the sticky columns area
        const wRect = w.getBoundingClientRect();
        const relX = e.clientX - wRect.left;
        if (relX <= ganttFixedW) return;
        isDown = true;
        wrap = w;
        startX = e.pageX;
        scrollLeft = w.scrollLeft;
        w.style.cursor = 'grabbing';
        e.preventDefault();
      });

      document.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        if (wrap) wrap.style.cursor = 'grab';
        wrap = null;
      });

      document.addEventListener('mousemove', e => {
        if (!isDown || !wrap) return;
        e.preventDefault();
        wrap.scrollLeft = scrollLeft - (e.pageX - startX);
      });
    })();
    taskTableRender();

    // ===== FILE MANAGER =====
    (function () {
      // ---- Data model ----
      // node: { id, name, type:'folder'|'file', children:[], size, date, mimeType }
      let _idSeq = 100;
      function mkId() { return ++_idSeq; }
      function mkDate() {
        const d = new Date();
        const y = d.getFullYear();
        const mo = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return y + '/' + mo + '/' + dd + ' ' + hh + ':' + mm;
      }

      // Root of virtual file system
      const fsRoot = {
        id: 0, name: 'ルート', type: 'folder', modified: '2026/03/11 09:15',
        children: [
          {
            id: 1, name: '設計書類', type: 'folder', modified: '2026/03/10 14:22', children: [
              { id: 10, name: '仕様書_v3.2.pdf', type: 'file', size: '2.4 MB', modified: '2026/03/07 10:05', mimeType: 'pdf' },
              { id: 11, name: '配線図_最終.png', type: 'file', size: '5.1 MB', modified: '2026/03/10 14:22', mimeType: 'image' },
            ]
          },
          {
            id: 2, name: '工程管理', type: 'folder', modified: '2026/03/05 16:40', children: [
              { id: 20, name: '工程表_2025Q1.xlsx', type: 'file', size: '1.8 MB', modified: '2026/03/01 08:30', mimeType: 'xlsx' },
              { id: 21, name: '部品リスト.xlsx', type: 'file', size: '856 KB', modified: '2026/03/05 16:40', mimeType: 'xlsx' },
            ]
          },
          {
            id: 3, name: '議事録', type: 'folder', modified: '2026/03/11 11:00', children: [
              { id: 30, name: '議事録_3月定例.docx', type: 'file', size: '340 KB', modified: '2026/03/11 11:00', mimeType: 'docx' },
            ]
          },
          { id: 40, name: '検査チェックシート.pdf', type: 'file', size: '1.2 MB', modified: '2026/03/03 13:55', mimeType: 'pdf' },
        ]
      };

      // Current path: array of node ids (0 = root)
      let currentPath = [0];

      // ---- Helpers ----
      function getNode(id) {
        function search(node) {
          if (node.id === id) return node;
          if (node.children) for (const c of node.children) { const r = search(c); if (r) return r; }
          return null;
        }
        return search(fsRoot);
      }

      function currentFolder() {
        return getNode(currentPath[currentPath.length - 1]);
      }

      function fileIcon(node) {
        if (node.type === 'folder') return '📁';
        const m = node.mimeType || '';
        if (m === 'pdf') return '📄';
        if (m === 'xlsx') return '📊';
        if (m === 'docx') return '📝';
        if (m === 'image') return '🖼️';
        return '📎';
      }

      // ---- Render ----
      function render() {
        const folder = currentFolder();
        const search = (document.getElementById('fm-search') || {}).value || '';
        const q = search.trim().toLowerCase();

        // Breadcrumb
        const bc = document.getElementById('fm-breadcrumb');
        if (bc) {
          bc.innerHTML = currentPath.map((id, idx) => {
            const n = getNode(id);
            const isLast = idx === currentPath.length - 1;
            const sep = idx > 0 ? '<span class="sep">›</span>' : '';
            if (isLast) return sep + `<span class="crumb current">${n.name}</span>`;
            return sep + `<span class="crumb" onclick="fm_navTo(${id})">${n.name}</span>`;
          }).join('');
        }

        // Grid
        const grid = document.getElementById('fm-grid');
        if (!grid) return;
        grid.innerHTML = '';
        grid.classList.toggle('list-view', viewMode === 'list');

        let items = folder.children || [];
        if (q) items = items.filter(n => n.name.toLowerCase().includes(q));

        // Folders first
        const folders = items.filter(n => n.type === 'folder');
        const files = items.filter(n => n.type === 'file');

        [...folders, ...files].forEach(node => {
          const div = document.createElement('div');
          div.className = 'file-item' + (node.type === 'folder' ? ' folder-item' : '');
          const sizeLabel = node.type === 'folder' ? (node.children || []).length + ' 件' : node.size;
          const dateLabel = node.modified || node.date || '—';
          const metaGrid = node.type === 'folder'
            ? sizeLabel
            : (node.size + ' · ' + dateLabel);
          div.innerHTML = `
        <button class="file-item-menu" onclick="fm_ctxMenu(event,${node.id})" title="メニュー">⋯</button>
        <div class="file-icon">${fileIcon(node)}</div>
        <div class="file-name">${node.name}</div>
        <div class="file-meta file-meta-grid">${metaGrid}</div>
        <div class="file-meta file-meta-list">
          <span class="file-size">${sizeLabel}</span>
          <span class="file-date">${dateLabel}</span>
        </div>
      `;
          if (node.type === 'folder') {
            div.addEventListener('click', (e) => {
              if (e.target.classList.contains('file-item-menu')) return;
              fm_openFolder(node.id);
            });
          }
          grid.appendChild(div);
        });

        if (items.length === 0) {
          const empty = document.createElement('div');
          empty.className = 'empty-state';
          empty.style.cssText = 'grid-column:1/-1;text-align:center;color:#9ca3af;padding:32px;font-size:13px;width:100%';
          empty.textContent = q ? '検索結果なし' : 'このフォルダは空です';
          grid.appendChild(empty);
        }
      }

      // ---- View mode ----
      let viewMode = 'list'; // 'grid' | 'list'

      window.fm_setView = function (mode) {
        viewMode = mode;
        const grid = document.getElementById('fm-grid');
        if (grid) {
          grid.classList.toggle('list-view', mode === 'list');
        }
        document.getElementById('fm-btn-grid').classList.toggle('active', mode === 'grid');
        document.getElementById('fm-btn-list').classList.toggle('active', mode === 'list');
        render();
      };

      // ---- Public API (window.fm_*) ----
      window.fm_render = render;

      window.fm_navTo = function (id) {
        const idx = currentPath.indexOf(id);
        if (idx >= 0) currentPath = currentPath.slice(0, idx + 1);
        render();
      };

      window.fm_openFolder = function (id) {
        currentPath.push(id);
        render();
      };

      window.fm_createFolder = function () {
        showModal('新しいフォルダ名を入力してください', '', function (name) {
          if (!name.trim()) return;
          const folder = currentFolder();
          folder.children = folder.children || [];
          folder.children.push({ id: mkId(), name: name.trim(), type: 'folder', children: [], modified: mkDate() });
          folder.modified = mkDate();
          render();
        });
      };

      window.fm_triggerUpload = function () {
        document.getElementById('fm-file-input').click();
      };

      document.getElementById('fm-drop-zone').addEventListener('click', function () {
        document.getElementById('fm-file-input').click();
      });

      window.fm_onDrop = function (e) {
        e.preventDefault();
        document.getElementById('fm-drop-zone').classList.remove('dragover');
        addFiles(e.dataTransfer.files);
      };

      window.fm_onFileSelect = function (e) {
        addFiles(e.target.files);
        e.target.value = '';
      };

      function addFiles(fileList) {
        const folder = currentFolder();
        folder.children = folder.children || [];
        Array.from(fileList).forEach(f => {
          const ext = f.name.split('.').pop().toLowerCase();
          let mimeType = 'file';
          if (ext === 'pdf') mimeType = 'pdf';
          else if (['xlsx', 'xls', 'csv'].includes(ext)) mimeType = 'xlsx';
          else if (['docx', 'doc'].includes(ext)) mimeType = 'docx';
          else if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) mimeType = 'image';
          const kb = f.size / 1024;
          const size = kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : Math.round(kb) + ' KB';
          folder.children.push({ id: mkId(), name: f.name, type: 'file', size, modified: mkDate(), mimeType });
          folder.modified = mkDate();
        });
        render();
      }

      // ---- Context menu ----
      window.fm_ctxMenu = function (e, id) {
        e.stopPropagation();
        const node = getNode(id);
        const menu = document.getElementById('fm-ctx-menu');
        const items = node.type === 'folder'
          ? [
            { icon: '📂', label: '開く', action: () => fm_openFolder(id) },
            { icon: '✏️', label: '名前変更', action: () => fm_rename(id) },
            { icon: '🗑️', label: '削除', danger: true, action: () => fm_delete(id) },
          ]
          : [
            { icon: '⬇️', label: 'ダウンロード', action: () => alert('ダウンロード: ' + node.name) },
            { icon: '✏️', label: '名前変更', action: () => fm_rename(id) },
            { icon: '🗑️', label: '削除', danger: true, action: () => fm_delete(id) },
          ];
        menu.innerHTML = items.map((item, i) =>
          `<div class="ctx-menu-item${item.danger ? ' danger' : ''}" data-idx="${i}">${item.icon} ${item.label}</div>`
        ).join('');
        menu.querySelectorAll('.ctx-menu-item').forEach((el, i) => {
          el.addEventListener('click', () => { hideCtxMenu(); items[i].action(); });
        });
        menu.style.display = 'block';
        menu.style.left = Math.min(e.clientX, window.innerWidth - 160) + 'px';
        menu.style.top = Math.min(e.clientY, window.innerHeight - (items.length * 36 + 8)) + 'px';
      };

      function hideCtxMenu() {
        document.getElementById('fm-ctx-menu').style.display = 'none';
      }
      document.addEventListener('click', hideCtxMenu);

      window.fm_rename = function (id) {
        const node = getNode(id);
        showModal('名前変更', node.name, function (name) {
          if (!name.trim()) return;
          node.name = name.trim();
          node.modified = mkDate();
          render();
        });
      };

      window.fm_delete = function (id) {
        const node = getNode(id);
        if (!confirm(`「${node.name}」を削除しますか?`)) return;
        function removeFrom(parent) {
          if (!parent.children) return false;
          const idx = parent.children.findIndex(c => c.id === id);
          if (idx >= 0) { parent.children.splice(idx, 1); return true; }
          return parent.children.some(c => removeFrom(c));
        }
        removeFrom(fsRoot);
        // If we're inside the deleted folder, go up
        const pidx = currentPath.indexOf(id);
        if (pidx >= 0) currentPath = currentPath.slice(0, pidx);
        render();
      };

      // ---- Modal ----
      function showModal(title, value, onOk) {
        const overlay = document.getElementById('fm-modal-overlay');
        document.getElementById('fm-modal-title').textContent = title;
        const input = document.getElementById('fm-modal-input');
        input.value = value;
        overlay.style.display = 'flex';
        setTimeout(() => { input.focus(); input.select(); }, 50);
        const okBtn = document.getElementById('fm-modal-ok');
        const handler = function () {
          onOk(input.value);
          fm_closeModal();
          okBtn.removeEventListener('click', handler);
        };
        okBtn.addEventListener('click', handler);
        input.onkeydown = function (e) {
          if (e.key === 'Enter') { onOk(input.value); fm_closeModal(); okBtn.removeEventListener('click', handler); }
          if (e.key === 'Escape') { fm_closeModal(); okBtn.removeEventListener('click', handler); }
        };
      }

      window.fm_closeModal = function () {
        document.getElementById('fm-modal-overlay').style.display = 'none';
      };

      // Auto-render when navigating to files page
      const origNavigate = window.navigate;
      window.navigate = function (key, navEl) {
        origNavigate(key, navEl);
        if (key === 'files') render();
      };

      render();
    })();

    // ===== プランフロー =====
    let planFlowContext = 'company'; // 'company' | 'personal'
    let planFlowSelected = null;

    const companyPlans = [
      { name: 'Starter', price: 500, label: '¥500', cycle: '/ người / tháng', maxUsers: 10, maxProjects: 3, storage: '5 GB', features: ['Dự án: 3 dự án', 'Lưu trữ: 5 GB'] },
      { name: 'Standard', price: 1000, label: '¥1.000', cycle: '/ người / tháng', maxUsers: 25, maxProjects: 10, storage: '20 GB', features: ['Dự án: 10 dự án', 'Lưu trữ: 20 GB'] },
      { name: 'Professional', price: 1500, label: '¥1.500', cycle: '/ người / tháng', maxUsers: 50, maxProjects: 50, storage: '100 GB', features: ['Dự án: 50 dự án', 'Lưu trữ: 100 GB'] },
    ];

    const personalPlans = [
      { name: 'Starter', price: 500, label: '¥500', cycle: '/ tháng', maxProjects: 3, storage: '5 GB', features: ['Dự án: 3 dự án', 'Lưu trữ: 5 GB'] },
      { name: 'Standard', price: 1000, label: '¥1.000', cycle: '/ tháng', maxProjects: 10, storage: '20 GB', features: ['Dự án: 10 dự án', 'Lưu trữ: 20 GB'] },
      { name: 'Professional', price: 1500, label: '¥1.500', cycle: '/ tháng', maxProjects: 50, storage: '100 GB', features: ['Dự án: 50 dự án', 'Lưu trữ: 100 GB'] },
    ];

    window.chooseCompanyPlan = function (planName) {
      const planMap = {
        'Starter': { price: '¥500 / người / tháng', badgeClass: 'badge-str' },
        'Standard': { price: '¥1.000 / người / tháng', badgeClass: 'badge-std' },
        'Professional': { price: '¥1.500 / người / tháng', badgeClass: 'badge-pro-purple' },
      };
      const target = planMap[planName];
      if (!target) return;

      // Update header bar
      const badgeEl = document.getElementById('company-current-badge');
      const priceEl = document.getElementById('company-current-price-label');
      if (badgeEl) {
        badgeEl.textContent = planName;
        badgeEl.className = 'plan-overview-badge ' + target.badgeClass;
      }
      if (priceEl) priceEl.textContent = target.price;

      // Update cards
      ['Starter', 'Standard', 'Professional'].forEach(p => {
        const card = document.getElementById('card-company-' + p);
        if (!card) return;
        const tag = card.querySelector('.plan-box-tag');
        const btn = card.querySelector('.btn-plan-action');
        if (p === planName) {
          card.className = 'plan-box-card card-current';
          if (tag) {
            tag.className = 'plan-box-tag tag-current';
            tag.textContent = 'Gói hiện tại';
          }
          if (btn) {
            btn.className = 'btn-plan-action btn-current-disabled';
            btn.disabled = true;
            btn.textContent = 'Gói hiện tại';
            btn.onclick = null;
          }
        } else {
          card.className = 'plan-box-card';
          if (tag) {
            tag.className = 'plan-box-tag tag-empty';
            tag.innerHTML = '&nbsp;';
          }
          if (btn) {
            btn.className = 'btn-plan-action btn-select';
            btn.disabled = false;
            btn.textContent = 'Chọn';
            btn.setAttribute('onclick', `chooseCompanyPlan('${p}')`);
          }
        }
      });

      // Update info in current tab
      const infoBadge = document.getElementById('mp-info-badge');
      const infoUnit = document.getElementById('mp-info-unit');
      const infoTotal = document.getElementById('mp-info-total');
      if (infoBadge) infoBadge.textContent = planName;
      if (infoUnit) infoUnit.textContent = target.price;
      if (infoTotal) {
        const num = planName === 'Starter' ? '¥5.000' : planName === 'Standard' ? '¥10.000' : '¥15.000';
        infoTotal.textContent = num;
      }

      alert(`✅ Đã chọn và cập nhật gói doanh nghiệp: ${planName} (${target.price})`);
    };

    window.choosePersonalPlan = function (planName) {
      const planMap = {
        'Starter': { price: '¥500 / tháng', badgeClass: 'badge-str' },
        'Standard': { price: '¥1.000 / tháng', badgeClass: 'badge-std-mint' },
        'Professional': { price: '¥1.500 / tháng', badgeClass: 'badge-pro-purple' },
      };
      const target = planMap[planName];
      if (!target) return;

      // Update header bar
      const badgeEl = document.getElementById('personal-current-badge');
      const priceEl = document.getElementById('personal-current-price-label');
      if (badgeEl) {
        badgeEl.textContent = planName;
        badgeEl.className = 'plan-overview-badge ' + target.badgeClass;
      }
      if (priceEl) priceEl.textContent = target.price;

      // Update cards
      ['Starter', 'Standard', 'Professional'].forEach(p => {
        const card = document.getElementById('card-personal-' + p);
        if (!card) return;
        const tag = card.querySelector('.plan-box-tag');
        const btn = card.querySelector('.btn-plan-action');
        if (p === planName) {
          card.className = 'plan-box-card card-current';
          if (tag) {
            tag.className = 'plan-box-tag tag-current';
            tag.textContent = 'Gói hiện tại';
          }
          if (btn) {
            btn.className = 'btn-plan-action btn-current-disabled';
            btn.disabled = true;
            btn.textContent = 'Gói hiện tại';
            btn.onclick = null;
          }
        } else if (p === 'Professional') {
          card.className = 'plan-box-card card-recommended';
          if (tag) {
            tag.className = 'plan-box-tag tag-recommended';
            tag.textContent = 'Đề xuất';
          }
          if (btn) {
            btn.className = 'btn-plan-action btn-select';
            btn.disabled = false;
            btn.textContent = 'Chọn';
            btn.setAttribute('onclick', `choosePersonalPlan('${p}')`);
          }
        } else {
          card.className = 'plan-box-card';
          if (tag) {
            tag.className = 'plan-box-tag tag-empty';
            tag.innerHTML = '&nbsp;';
          }
          if (btn) {
            btn.className = 'btn-plan-action btn-select';
            btn.disabled = false;
            btn.textContent = 'Chọn';
            btn.setAttribute('onclick', `choosePersonalPlan('${p}')`);
          }
        }
      });

      // Update info in current tab
      const ppInfoBadge = document.getElementById('pp-info-badge');
      const ppInfoUnit = document.getElementById('pp-info-unit');
      if (ppInfoBadge) ppInfoBadge.textContent = planName;
      if (ppInfoUnit) ppInfoUnit.textContent = target.price;

      alert(`✅ Đã chọn và cập nhật gói cá nhân: ${planName} (${target.price})`);
    };

    function openPlanSelect(context) {
      planFlowContext = context;
      planFlowSelected = null;
      const allPlans = context === 'company' ? companyPlans : personalPlans;
      const plans = allPlans.filter(p => p.price !== 0 && p.price !== null);
      const currentName = context === 'company' ? myPlanData.name : myPersonalPlanData.name;

      // おすすめプランを決める (中間プラン)
      const recommendIdx = Math.floor(plans.length / 2);

      document.getElementById('ps-plan-grid').innerHTML = plans.map((p, idx) => {
        const isCurrent = p.name === currentName;
        const isRecommend = idx === recommendIdx && !isCurrent;
        const priceText = p.price === null ? '要お問い合わせ'
          : p.price === 0 ? '無料'
            : `${p.label}${p.cycle}`;
        return `
      <div class="plan-radio-card ${isCurrent ? 'current-plan' : ''}" id="psc-${p.name}"
           onclick="${isCurrent ? '' : `selectPlanCard('${p.name}')`}">
        <div class="plan-radio-dot">
          <div class="plan-radio-dot-inner"></div>
        </div>
        <div class="plan-radio-body">
          <div class="plan-radio-name">${p.name}${isCurrent ? ' <span style="font-size:11px;color:#0ABAB5;font-weight:400">（現在）</span>' : ''}</div>
          <div class="plan-radio-price">${priceText}</div>
        </div>
        ${isRecommend ? '<span class="plan-radio-badge">おすすめ</span>' : ''}
      </div>`;
      }).join('');

      document.getElementById('ps-downgrade-warn').style.display = 'none';
      document.getElementById('ps-next-btn').disabled = true;
      document.getElementById('modal-plan-select').classList.add('open');
    }

    function selectPlanCard(name) {
      planFlowSelected = name;
      document.querySelectorAll('.plan-radio-card').forEach(el => el.classList.remove('selected'));
      document.getElementById('psc-' + name).classList.add('selected');
      document.getElementById('ps-next-btn').disabled = false;

      // downgrade warning
      const warnEl = document.getElementById('ps-downgrade-warn');
      const msgEl = document.getElementById('ps-downgrade-msg');
      const context = planFlowContext;
      const plans = context === 'company' ? companyPlans : personalPlans;
      const currentName = context === 'company' ? myPlanData.name : myPersonalPlanData.name;
      const currentIdx = plans.findIndex(p => p.name === currentName);
      const selectedIdx = plans.findIndex(p => p.name === name);

      if (selectedIdx < currentIdx) {
        const sel = plans[selectedIdx];
        const msgs = [];
        if (context === 'company' && sel.maxProjects > 0) {
          const cur = myPlanData.usage.find(u => u.label === '案件数');
          if (cur && cur.used > sel.maxProjects) msgs.push(`案件数が${cur.used}件 → ${sel.maxProjects}件に制限されます`);
          const usr = myPlanData.usage.find(u => u.label === 'ユーザー数');
          if (usr && usr.used > sel.maxUsers) msgs.push(`ユーザー数が${usr.used}名 → ${sel.maxUsers}名に制限されます`);
        }
        msgEl.textContent = msgs.length ? msgs.join(' / ') : 'ダウングレードになります。次回更新日から適用されます。';
        warnEl.style.display = 'block';
      } else {
        warnEl.style.display = 'none';
      }
    }

    function openPlanPayment() {
      if (!planFlowSelected) return;
      const context = planFlowContext;
      const plans = context === 'company' ? companyPlans : personalPlans;
      const currentName = context === 'company' ? myPlanData.name : myPersonalPlanData.name;
      const sel = plans.find(p => p.name === planFlowSelected);
      const cur = plans.find(p => p.name === currentName);
      const currentIdx = plans.findIndex(p => p.name === currentName);
      const selectedIdx = plans.findIndex(p => p.name === planFlowSelected);
      const isUpgrade = selectedIdx > currentIdx;

      document.getElementById('pay-from-plan').textContent = cur.name + ' (' + cur.label + ')';
      document.getElementById('pay-to-plan').textContent = sel.name + ' (' + sel.label + ')';
      document.getElementById('pay-timing').textContent = isUpgrade ? '即時適用' : '次回更新日から適用';
      document.getElementById('pay-amount').textContent = sel.price === null ? '要相談' : sel.label + sel.cycle;

      document.getElementById('modal-plan-select').classList.remove('open');
      document.getElementById('modal-plan-payment').classList.add('open');
    }

    function backToPlanSelect() {
      document.getElementById('modal-plan-payment').classList.remove('open');
      document.getElementById('modal-plan-select').classList.add('open');
    }

    function submitPlanPayment() {
      const context = planFlowContext;
      const plans = context === 'company' ? companyPlans : personalPlans;
      const sel = plans.find(p => p.name === planFlowSelected);
      const currentName = context === 'company' ? myPlanData.name : myPersonalPlanData.name;

      // update mock data
      if (context === 'company') {
        myPlanData.name = sel.name;
        myPlanData.price = sel.price || 0;
      } else {
        myPersonalPlanData.name = sel.name;
        myPersonalPlanData.price = sel.price || 0;
      }

      document.getElementById('done-title').textContent = 'プランを変更しました';
      document.getElementById('done-sub').textContent = currentName + ' → ' + sel.name;
      document.getElementById('done-detail').innerHTML =
        '次回更新日より新しいプランが適用されます。<br>ご利用ありがとうございます。';

      document.getElementById('modal-plan-payment').classList.remove('open');
      document.getElementById('modal-plan-done').classList.add('open');
    }

    function closePlanModals() {
      document.getElementById('modal-plan-select').classList.remove('open');
      document.getElementById('modal-plan-payment').classList.remove('open');
    }

    function closePlanDone() {
      document.getElementById('modal-plan-done').classList.remove('open');
      // re-render the page
      if (planFlowContext === 'company') initMyPlan();
      else initPersonalPlan();
    }

    function openPlanRenew(context) {
      planFlowContext = context;
      const data = context === 'company' ? myPlanData : myPersonalPlanData;
      const renew = new Date(data.renewDate);
      renew.setFullYear(renew.getFullYear() + 1);
      const newDateStr = renew.toISOString().slice(0, 10).replace(/-/g, '/');

      document.getElementById('renew-plan-name').textContent = data.name;
      document.getElementById('renew-new-date').textContent = newDateStr;
      document.getElementById('renew-amount').textContent =
        data.price > 0 ? '¥' + data.price.toLocaleString() + '/月' : '¥0（無料）';
      document.getElementById('modal-plan-renew').classList.add('open');
    }

    function submitPlanRenew() {
      const data = planFlowContext === 'company' ? myPlanData : myPersonalPlanData;
      const renew = new Date(data.renewDate);
      renew.setFullYear(renew.getFullYear() + 1);
      data.renewDate = renew.toISOString().slice(0, 10);

      document.getElementById('done-title').textContent = '更新が完了しました';
      document.getElementById('done-sub').textContent = data.name + ' プランを1年間更新しました';
      document.getElementById('done-detail').innerHTML =
        '次回更新日: ' + data.renewDate.replace(/-/g, '/') + '<br>ご利用ありがとうございます。';

      document.getElementById('modal-plan-renew').classList.remove('open');
      document.getElementById('modal-plan-done').classList.add('open');
    }

    // ===== マイプラン =====
    const myPlanData = {
      name: 'Business',
      price: 29800,
      cycle: '月額',
      startDate: '2026-01-01',
      renewDate: '2026-07-01',
      autoRenew: true,
      usage: [
        { label: 'ユーザー数', used: 8, max: 10, unit: '名' },
        { label: '案件数', used: 23, max: 30, unit: '件' },
        { label: 'ストレージ', used: 4.2, max: 5, unit: 'GB' },
      ],
    };

    const billingHistory = [
      { date: '2025/06/01', period: '2025年6月分', plan: 'Business', amount: '¥29,800', status: '支払済' },
      { date: '2025/05/01', period: '2025年5月分', plan: 'Business', amount: '¥29,800', status: '支払済' },
      { date: '2025/04/01', period: '2025年4月分', plan: 'Business', amount: '¥29,800', status: '支払済' },
      { date: '2025/03/01', period: '2025年3月分', plan: 'Business', amount: '¥29,800', status: '支払済' },
    ];

    function renderPlanHero(prefix, d, plans, compareData, billingData) {
      const pfx = prefix; // 'mp' or 'pp'
      document.getElementById(`${pfx}-plan-name`).textContent = d.name;
      document.getElementById(`${pfx}-plan-price`).innerHTML =
        d.price > 0 ? `¥${d.price.toLocaleString()} <span>/ 月</span>` : `¥0 <span>（無料）</span>`;
      document.getElementById(`${pfx}-start`).textContent = d.startDate.replace(/-/g, '/');
      document.getElementById(`${pfx}-renew`).textContent = d.renewDate.replace(/-/g, '/');

      const today = new Date(); today.setHours(0, 0, 0, 0);
      const renew = new Date(d.renewDate);
      const diffDays = Math.ceil((renew - today) / 86400000);
      const expired = diffDays <= 0;

      // 期限切れバナー
      const expBanner = document.getElementById(`${pfx}-expired-banner`);
      const offBanner = document.getElementById(`${pfx}-off-warn-banner`);
      expBanner.style.display = expired ? 'block' : 'none';
      if (expired) {
        document.getElementById(`${pfx}-expired-msg`).textContent =
          `${d.renewDate.replace(/-/g, '/')} をもって ${d.name} プランが終了しました。更新またはプラン変更をしてください。`;
      }

      // 自動更新OFFバナー（期限前 + OFF時のみ）
      offBanner.style.display = (!expired && !d.autoRenew) ? 'block' : 'none';
      if (!expired && !d.autoRenew) {
        document.getElementById(`${pfx}-off-warn-date`).textContent = d.renewDate.replace(/-/g, '/');
      }

      // warnバッジ（期限60日以内）
      const warnEl = document.getElementById(`${pfx}-warn`);
      if (!expired && diffDays <= 60) {
        warnEl.textContent = `⚠️ あと${diffDays}日`;
        warnEl.style.display = 'inline-block';
      } else if (expired) {
        warnEl.textContent = '⚠️ 期限切れ';
        warnEl.style.display = 'inline-block';
        warnEl.style.background = 'rgba(255,80,80,.25)';
        warnEl.style.color = '#ffb3b3';
      } else {
        warnEl.style.display = 'none';
      }

      // 自動更新トグル
      const toggle = document.getElementById(`${pfx}-auto-renew-toggle`);
      const statusEl = document.getElementById(`${pfx}-auto-renew-status`);
      toggle.checked = !!d.autoRenew;
      toggle.disabled = expired;
      statusEl.textContent = d.autoRenew ? 'ON' : 'OFF';
      statusEl.className = `auto-renew-status ${d.autoRenew ? 'on' : 'off'}`;

      // 「今すぐ更新」ボタン：自動更新ONかつ期限前は非表示
      const renewBtn = document.getElementById(`${pfx}-renew-btn`);
      if (renewBtn) renewBtn.style.display = (d.autoRenew && !expired) ? 'none' : '';

      // 利用状況
      document.getElementById(`${pfx}-usage-list`).innerHTML = d.usage.map(u => {
        const pct = u.max >= 999 ? 30 : Math.min(100, Math.round((u.used / u.max) * 100));
        const cls = pct >= 90 ? 'over' : pct >= 75 ? 'warn' : 'ok';
        const pctLabel = u.max >= 999 ? '無制限' : pct + '%';
        return `<div>
      <div class="usage-item-label">
        <strong>${u.label}</strong>
        <span>${u.used} / ${u.max >= 999 ? '無制限' : u.max + u.unit} &nbsp;
          <strong style="color:${cls === 'ok' ? '#0ABAB5' : cls === 'warn' ? '#f59e0b' : '#ef4444'}">${pctLabel}</strong>
        </span>
      </div>
      <div class="usage-bar-track">
        <div class="usage-bar-fill ${cls}" style="width:${u.max >= 999 ? 30 : pct}%"></div>
      </div>
    </div>`;
      }).join('');

      // プラン比較グリッド
      let grid = `<div class="plan-compare-cell head feature">機能</div>`;
      compareData.plans.forEach(p => {
        const cur = p.name === d.name;
        grid += `<div class="plan-compare-cell head ${cur ? 'current-col' : ''}">
      ${p.name}${cur ? '<span class="plan-col-badge">現在</span>' : ''}
      <div style="font-size:12px;font-weight:400;color:${cur ? '#0a4d4b' : '#6b7280'};margin-top:2px">${p.price}</div>
    </div>`;
      });
      compareData.features.forEach(f => {
        grid += `<div class="plan-compare-cell feature">${f.label}</div>`;
        f.values.forEach((v, i) => {
          const cur = compareData.plans[i].name === d.name;
          grid += `<div class="plan-compare-cell ${cur ? 'current-col' : ''}" style="text-align:center">${v}</div>`;
        });
      });
      const gridEl = document.getElementById(`${pfx}-compare-grid`);
      gridEl.style.gridTemplateColumns = `1.4fr repeat(${compareData.plans.length}, 1fr)`;
      gridEl.innerHTML = grid;

      // 請求履歴
      document.getElementById(`${pfx}-billing-body`).innerHTML = billingData.map(b => `
    <tr>
      <td>${b.date}</td><td>${b.period}</td><td>${b.plan}</td>
      <td style="font-weight:600">${b.amount}</td>
      <td><span class="${b.status === '支払済' ? 'badge-paid' : 'badge-pending'}">${b.status}</span></td>
      <td><button class="billing-dl" onclick="alert('領収書をダウンロードします。')">⬇ DL</button></td>
    </tr>`).join('');
    }

    // 会社プランの比較データを動的化
    function getCompanyCompareData() {
      return {
        plans: companyPlans.filter(p => p.price !== null).map(p => ({ name: p.name, price: p.label, current: p.name === myPlanData.name })),
        features: [
          { label: 'ユーザー数上限', values: ['1名', '5名', '10名'] },
          { label: '案件数上限', values: ['3件', '10件', '30件'] },
          { label: 'ストレージ', values: ['500MB', '2GB', '5GB'] },
        ],
      };
    }

    function getPersonalCompareData() {
      return {
        plans: personalPlans.map(p => ({ name: p.name, price: p.label, current: p.name === myPersonalPlanData.name })),
        features: [
          { label: 'プロジェクト数', values: ['1件', '5件', '無制限'] },
          { label: 'ストレージ', values: ['500MB', '3GB', '10GB'] },
          { label: 'レポート機能', values: ['—', '✓', '✓'] },
          { label: '優先サポート', values: ['—', '—', '✓'] },
          { label: 'API連携', values: ['—', '—', '✓'] },
        ],
      };
    }

    function initMyPlan() {
      renderPlanChange('company');
    }

    // ===== 自動更新トグルロジック =====
    let pendingAutoRenewContext = null;

    function onAutoRenewChange(context, checkbox) {
      if (!checkbox.checked) {
        // OFFに切り替えようとしている → 確認モーダルを出す
        checkbox.checked = true; // 一旦戻す
        pendingAutoRenewContext = context;
        const d = context === 'company' ? myPlanData : myPersonalPlanData;
        document.getElementById('ar-off-date').textContent = d.renewDate.replace(/-/g, '/');
        document.getElementById('modal-autorenew-off').classList.add('open');
      } else {
        // ONに切り替え → 即時反映
        const d = context === 'company' ? myPlanData : myPersonalPlanData;
        d.autoRenew = true;
        if (context === 'company') initMyPlan(); else initPersonalPlan();
      }
    }

    function cancelAutoRenewOff() {
      document.getElementById('modal-autorenew-off').classList.remove('open');
      pendingAutoRenewContext = null;
    }

    function confirmAutoRenewOff() {
      if (!pendingAutoRenewContext) return;
      const d = pendingAutoRenewContext === 'company' ? myPlanData : myPersonalPlanData;
      d.autoRenew = false;
      document.getElementById('modal-autorenew-off').classList.remove('open');
      if (pendingAutoRenewContext === 'company') initMyPlan(); else initPersonalPlan();
      pendingAutoRenewContext = null;
    }

    // ===== プランマスタ / 料金改定 =====
    const planMasterData = [
      { name: 'Free', monthly: 0, disc6: 0, disc12: 0, first: 0, companies: 4, status: '有効', history: [] },
      {
        name: 'Standard', monthly: 1000, disc6: 6, disc12: 15, first: 50, companies: 15, status: '有効',
        history: [{ effective: '2025-04-01', monthly: 900, disc6: 5, disc12: 12, first: 50, reason: '旧価格（初期設定）', updatedAt: '2025/03/01' }]
      },
      { name: 'Professional', monthly: 1500, disc6: 6, disc12: 15, first: 50, companies: 9, status: '有効', history: [] },
    ];

    function pmBadge(name) { return ({ Free: 'badge-str', Standard: 'badge-std', Professional: 'badge-pro' })[name] || 'badge-gray'; }
    function yen(n) { return '¥' + Number(n).toLocaleString(); }
    function effUnit(monthly, disc) { return Math.floor(monthly * (1 - disc / 100)); }

    function pmTermCell(monthly, disc, months) {
      if (monthly === 0) return '<span style="color:#9ca3af">—</span>';
      const unit = effUnit(monthly, disc), total = unit * months;
      const badge = disc > 0
        ? `<span style="color:#d97706;font-weight:700;font-size:11px">${disc}% OFF</span>`
        : '<span style="color:#9ca3af;font-size:11px">割引なし</span>';
      return `${badge}<div style="font-weight:600">${yen(unit)}<span style="font-size:10px;color:#9ca3af">/席・月</span></div>`
        + `<div style="font-size:10px;color:#6b7280">一括 ${yen(total)}</div>`;
    }

    function renderPlanMaster() {
      const tb = document.getElementById('plan-master-tbody');
      if (!tb) return;
      tb.innerHTML = planMasterData.map((p, idx) => {
        const hist = p.history.length;
        return `<tr>
      <td><span class="${pmBadge(p.name)}">${p.name}</span></td>
      <td style="font-weight:700">${p.monthly === 0 ? '無料' : yen(p.monthly)}</td>
      <td>${pmTermCell(p.monthly, p.disc6, 6)}</td>
      <td>${pmTermCell(p.monthly, p.disc12, 12)}</td>
      <td>${p.first > 0 ? `<span style="color:#d97706;font-weight:600">${p.first}% OFF</span>` : '<span style="color:#9ca3af">—</span>'}</td>
      <td>${p.companies}社</td>
      <td><span class="badge-active">${p.status}</span></td>
      <td style="white-space:nowrap;display:flex;gap:4px;padding:10px 8px">
        <button class="btn btn-sm" style="background:#0ABAB5;color:#fff" onclick="openPriceRevision(${idx})">💴 料金改定</button>
        <button class="btn btn-outline btn-sm" style="color:#0ABAB5;border-color:#0ABAB5" onclick="openPriceHistory(${idx})">📋 履歴${hist > 0 ? ` (${hist})` : ''}</button>
      </td>
    </tr>`;
      }).join('');
    }

    function prUpdatePreview() {
      const idx = parseInt(document.getElementById('pr-plan-idx').value);
      const cur = planMasterData[idx] ? planMasterData[idx].monthly : 0;
      const price = parseInt(document.getElementById('pr-new-price').value) || 0;
      const d6 = parseInt(document.getElementById('pr-disc6').value) || 0;
      const d12 = parseInt(document.getElementById('pr-disc12').value) || 0;
      document.getElementById('pr-preview').innerHTML =
        `<div class="sim-row"><span>月払い</span><span>${price ? yen(price) + ' /席・月' : '—'}</span></div>`
        + `<div class="sim-row"><span>6ヶ月払い (${d6}% OFF)</span><span>${price ? yen(effUnit(price, d6)) + ' /席・月 ・ 一括 ' + yen(effUnit(price, d6) * 6) : '—'}</span></div>`
        + `<div class="sim-total"><span>年払い (${d12}% OFF)</span><span style="color:#059669">${price ? yen(effUnit(price, d12)) + ' /席・月 ・ 一括 ' + yen(effUnit(price, d12) * 12) : '—'}</span></div>`;

      const n = document.getElementById('pr-notice');
      if (price > cur) {
        n.style.cssText = 'font-size:12px;border-radius:8px;line-height:1.6;background:#fffbeb;border:1px solid #fcd34d;color:#92400e;padding:10px 12px';
        n.innerHTML = '⚠️ 値上げ：適用日の <strong>30日前までに対象顧客へ告知</strong>が必要。既存契約は<strong>次回更新分から</strong>、前払い契約は<strong>満了後から</strong>新価格。';
      } else if (price < cur) {
        n.style.cssText = 'font-size:12px;border-radius:8px;line-height:1.6;background:#f0fdf4;border:1px solid #86efac;color:#166534;padding:10px 12px';
        n.innerHTML = '値下げ：<strong>次回更新分から</strong>新価格を適用します（既存の前払い契約は満了まで現行価格）。';
      } else {
        n.style.cssText = 'font-size:12px;border-radius:8px;line-height:1.6';
        n.innerHTML = '';
      }
    }

    function openPriceRevision(idx) {
      const p = planMasterData[idx];
      document.getElementById('pr-plan-idx').value = idx;
      document.getElementById('pr-title').textContent = '💴 料金改定 — ' + p.name;
      document.getElementById('pr-current-price').textContent = p.monthly === 0 ? '無料' : yen(p.monthly);
      document.getElementById('pr-new-price').value = p.monthly;
      document.getElementById('pr-disc6').value = p.disc6;
      document.getElementById('pr-disc12').value = p.disc12;
      document.getElementById('pr-first').value = p.first;
      document.getElementById('pr-effective').value = '';
      document.getElementById('pr-reason').value = '';
      prUpdatePreview();
      document.getElementById('modal-price-revision').classList.add('open');
    }

    function savePriceRevision() {
      const idx = parseInt(document.getElementById('pr-plan-idx').value);
      const p = planMasterData[idx];
      const newPrice = parseInt(document.getElementById('pr-new-price').value);
      const eff = document.getElementById('pr-effective').value;
      const reason = document.getElementById('pr-reason').value.trim();
      if (isNaN(newPrice)) { alert('新しい月額単価を入力してください。'); return; }
      if (!eff) { alert('適用日を入力してください。'); return; }
      if (!reason) { alert('改定理由を入力してください。'); return; }
      const today = new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const isUp = newPrice > p.monthly;
      // 現在値を履歴へ退避
      p.history.unshift({ effective: eff, monthly: p.monthly, disc6: p.disc6, disc12: p.disc12, first: p.first, reason, updatedAt: today });
      p.monthly = newPrice;
      p.disc6 = parseInt(document.getElementById('pr-disc6').value) || 0;
      p.disc12 = parseInt(document.getElementById('pr-disc12').value) || 0;
      p.first = parseInt(document.getElementById('pr-first').value) || 0;
      document.getElementById('modal-price-revision').classList.remove('open');
      renderPlanMaster();
      alert((isUp ? '値上げ' : '料金') + '改定を登録しました。\n適用日: ' + eff.replace(/-/g, '/')
        + (isUp ? '\n※ 対象顧客へ適用日の30日前告知が必要です。' : '')
        + '\n既存契約は次回更新分から反映。前払い契約は満了まで現行価格。');
    }

    function openPriceHistory(idx) {
      const p = planMasterData[idx];
      document.getElementById('prh-title').textContent = '📋 料金改定履歴 — ' + p.name;
      const rows = p.history.length === 0
        ? '<div style="color:#9ca3af;font-size:13px;padding:16px 0">改定履歴はありません。</div>'
        : `<table class="data-table" style="width:100%;min-width:580px"><thead><tr>
        <th>適用日</th><th>月額単価</th><th>6ヶ月</th><th>年</th><th>初月</th><th>理由</th><th>登録日</th>
      </tr></thead><tbody>`
        + p.history.map(h => `<tr>
          <td style="white-space:nowrap">${h.effective ? h.effective.replace(/-/g, '/') : '—'}</td>
          <td>${h.monthly === 0 ? '無料' : yen(h.monthly)}</td>
          <td>${h.disc6 || 0}%</td><td>${h.disc12 || 0}%</td><td>${h.first || 0}%</td>
          <td style="font-size:12px">${h.reason || ''}</td>
          <td style="font-size:12px;color:#6b7280;white-space:nowrap">${h.updatedAt || '—'}</td>
        </tr>`).join('') + '</tbody></table>';
      document.getElementById('prh-content').innerHTML =
        `<div style="margin-bottom:12px;font-size:13px;color:#374151"><strong>現在:</strong> ${p.monthly === 0 ? '無料' : yen(p.monthly)} /席・月 &nbsp;/&nbsp; 6ヶ月 ${p.disc6}% &nbsp;/&nbsp; 年 ${p.disc12}% &nbsp;/&nbsp; 初月 ${p.first}%</div>
     <div class="card-title" style="margin-bottom:8px">過去の改定</div>${rows}`;
      document.getElementById('modal-price-history').classList.add('open');
    }

    // ===== プラン変更シミュレーター (支払いサイクル + 期間割引) =====
    const planCatalog = planMasterData; // 単価・期間割引はプランマスタと連動
    const planChangeCtx = {
      company: { seats: 10, cycle: 1, selected: 'Professional', current: 'Standard' },
      personal: { seats: 1, cycle: 1, selected: 'Professional', current: 'Standard' },
    };
    const CYCLE_LABEL = { 1: '月払い', 6: '6ヶ月一括', 12: '年一括' };

    function pcDisc(plan, cycle) { return cycle === 6 ? plan.disc6 : cycle === 12 ? plan.disc12 : 0; }

    function renderPlanChange(ctx) {
      const c = planChangeCtx[ctx];
      const pfx = ctx === 'company' ? 'mpc' : 'ppc';
      const unitSuffix = ctx === 'company' ? '/席・月' : '/月';

      const cycleWrap = document.getElementById(pfx + '-cycle');
      if (cycleWrap) {
        const opts = [{ m: 1, l: '月払い', s: '割引なし' }, { m: 6, l: '6ヶ月', s: '6% OFF' }, { m: 12, l: '年払い', s: '15% OFF' }];
        cycleWrap.innerHTML = opts.map(o =>
          `<button type="button" class="cycle-btn${c.cycle === o.m ? ' active' : ''}" onclick="pcSetCycle('${ctx}',${o.m})">${o.l}<span>${o.s}</span></button>`
        ).join('');
      }

      const cardsWrap = document.getElementById(pfx + '-cards');
      if (cardsWrap) {
        cardsWrap.innerHTML = planCatalog.map(p => {
          const isCur = p.name === c.current;
          const isSel = p.name === c.selected;
          const disc = pcDisc(p, c.cycle);
          const unit = effUnit(p.monthly, disc);
          const priceHtml = p.monthly === 0 ? '無料' : `${yen(unit)}<small> ${unitSuffix}</small>`;
          return `<div class="plan-select-card${isSel ? ' current' : ''}" onclick="pcSelectPlan('${ctx}','${p.name}')" style="cursor:pointer">
        <div style="font-size:11px;font-weight:600;margin-bottom:4px;min-height:15px;color:${isCur ? '#0ABAB5' : '#9ca3af'}">${isCur ? '現在のプラン' : '&nbsp;'}</div>
        <div class="card-plan-name">${p.name}</div>
        <div class="card-plan-price">${priceHtml}</div>
        <div style="font-size:11px;font-weight:600;min-height:15px;color:#d97706">${(disc > 0 && p.monthly > 0) ? disc + '% OFF 適用' : '&nbsp;'}</div>
        <div style="margin-top:6px;font-size:12px;font-weight:700;color:${isSel ? '#0ABAB5' : 'transparent'}">✓ 選択中</div>
      </div>`;
        }).join('');
      }

      updatePlanChangeSim(ctx);
    }

    function pcSetCycle(ctx, m) { planChangeCtx[ctx].cycle = m; renderPlanChange(ctx); }
    function pcSelectPlan(ctx, n) { planChangeCtx[ctx].selected = n; renderPlanChange(ctx); }

    function updatePlanChangeSim(ctx) {
      const c = planChangeCtx[ctx];
      const box = document.getElementById((ctx === 'company' ? 'mpc' : 'ppc') + '-sim');
      if (!box) return;
      const p = planCatalog.find(x => x.name === c.selected);
      if (!p) { box.innerHTML = '<div style="color:#9ca3af;font-size:13px">プランを選択してください</div>'; return; }
      const seats = ctx === 'company' ? c.seats : 1;
      const months = c.cycle;
      const disc = pcDisc(p, months);
      const unit = effUnit(p.monthly, disc);
      const monthlyTotal = unit * seats;
      const total = monthlyTotal * months;

      if (p.monthly === 0) {
        box.innerHTML = `<div class="sim-row"><span>プラン</span><span>${p.name}（無料）</span></div>`
          + `<div class="sim-total"><span>お支払い</span><span style="color:#059669">¥0</span></div>`;
        return;
      }

      const seatLine = ctx === 'company' ? `<div class="sim-row"><span>席数</span><span>${seats}席</span></div>` : '';
      const save = p.monthly * seats * months - total;
      box.innerHTML =
        `<div class="sim-row"><span>プラン</span><span>${p.name}</span></div>`
        + `<div class="sim-row"><span>支払いサイクル</span><span>${CYCLE_LABEL[months]}</span></div>`
        + `<div class="sim-row"><span>単価（${disc > 0 ? disc + '% OFF' : '割引なし'}）</span><span>${yen(unit)} ${ctx === 'company' ? '/席・月' : '/月'}</span></div>`
        + seatLine
        + `<div class="sim-row"><span>月あたり</span><span>${yen(monthlyTotal)}</span></div>`
        + `<div class="sim-total"><span>${CYCLE_LABEL[months]}のお支払い</span><span style="color:#059669">${yen(total)}</span></div>`
        + (months > 1 ? `<div style="font-size:11px;color:#d97706;font-weight:600;margin-top:6px">月払い比 ${yen(save)} お得（${disc}% OFF）</div>` : '');
    }

    function pcConfirm(ctx) {
      const c = planChangeCtx[ctx];
      const p = planCatalog.find(x => x.name === c.selected);
      if (!p) return;
      alert('【変更内容の確認】\n' + p.name + ' プラン / ' + CYCLE_LABEL[c.cycle] + ' に変更します。\n\n'
        + '・アップグレードは即時、ダウングレードは次回更新から適用\n'
        + '・初月割引は期間割引と併用しません');
    }

    // ===== AI PLATFORM FORM DASHBOARD CONTROLS (VIETNAMESE) =====
    window.apCurrency = 'JPY';

    window.switchApCurrency = function (curr) {
      window.apCurrency = curr;
      var btnJpy = document.getElementById('ap-btn-jpy');
      var btnUsd = document.getElementById('ap-btn-usd');
      var revEl = document.getElementById('ap-stat-revenue');
      var isUSD = curr === 'USD';

      if (btnJpy && btnUsd) {
        if (isUSD) {
          btnJpy.classList.remove('active');
          btnUsd.classList.add('active');
        } else {
          btnJpy.classList.add('active');
          btnUsd.classList.remove('active');
        }
      }

      if (revEl) revEl.innerText = isUSD ? '$128,430' : '¥248,000';

      var moneyCells = document.querySelectorAll('#ap-table-body .ap-money');
      if (moneyCells && moneyCells.length >= 5) {
        if (isUSD) {
          moneyCells[0].innerText = '$320';
          moneyCells[1].innerText = '$240';
          moneyCells[2].innerText = '$185';
          moneyCells[3].innerText = '$0 (Trial)';
          moneyCells[4].innerText = '$56 (Chờ trả)';
        } else {
          moneyCells[0].innerText = '¥48,000';
          moneyCells[1].innerText = '¥36,000';
          moneyCells[2].innerText = '¥28,000';
          moneyCells[3].innerText = '¥0 (Trial)';
          moneyCells[4].innerText = '¥8,500 (Chờ trả)';
        }
      }
    };

    window.switchApPeriod = function (period) {
      var usersEl = document.getElementById('ap-stat-users');
      var compEl = document.getElementById('ap-stat-companies');
      var revEl = document.getElementById('ap-stat-revenue');
      var growthEl = document.getElementById('ap-stat-growth');
      var isUSD = window.apCurrency === 'USD';

      if (period === '2026-05') {
        if (usersEl) usersEl.innerText = '24,521';
        if (compEl) compEl.innerText = '32';
        if (revEl) revEl.innerText = isUSD ? '$128,430' : '¥248,000';
        if (growthEl) growthEl.innerText = '18.6%';
      } else if (period === '2026-04') {
        if (usersEl) usersEl.innerText = '21,830';
        if (compEl) compEl.innerText = '28';
        if (revEl) revEl.innerText = isUSD ? '$115,200' : '¥229,000';
        if (growthEl) growthEl.innerText = '15.2%';
      } else if (period === '2026-03') {
        if (usersEl) usersEl.innerText = '19,450';
        if (compEl) compEl.innerText = '25';
        if (revEl) revEl.innerText = isUSD ? '$108,000' : '¥215,000';
        if (growthEl) growthEl.innerText = '12.8%';
      }
    };

    window.filterApTerm = function (term) {
      document.querySelectorAll('.ap-curr-btn[id^="ap-f-"]').forEach(function (b) { b.classList.remove('active'); });
      if (term === 'ALL') {
        var bAll = document.getElementById('ap-f-all');
        if (bAll) bAll.classList.add('active');
      } else if (term === 'Năm') {
        var bAn = document.getElementById('ap-f-annual');
        if (bAn) bAn.classList.add('active');
      } else if (term === 'Tháng') {
        var bMo = document.getElementById('ap-f-monthly');
        if (bMo) bMo.classList.add('active');
      }

      var rows = document.querySelectorAll('#ap-table-body tr');
      rows.forEach(function (r) {
        var rowTerm = r.getAttribute('data-term') || '';
        if (term === 'ALL' || rowTerm === term) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
      });
    };

    window.filterApTable = function (query) {
      var filter = (query || '').toLowerCase();
      var rows = document.querySelectorAll('#ap-table-body tr');
      rows.forEach(function (r) {
        var name = (r.getAttribute('data-name') || '').toLowerCase();
        var text = r.innerText.toLowerCase();
        r.style.display = (name.indexOf(filter) > -1 || text.indexOf(filter) > -1) ? '' : 'none';
      });
    };

    var apCompanyDataMap = {
      apex: {
        code: 'CMP-001',
        name: 'Apex Global Logistics',
        plan: 'Enterprise Pro (1 Năm - Giảm 15%)',
        mrr: '¥48,000 / tháng ($320)',
        seats: '78 / 80 ghế (97.5% công suất)',
        invoices: [
          { id: 'in_1N3k89', date: '2026-05-01', amount: '¥48,000', status: 'Đã thanh toán' },
          { id: 'in_1N3k77', date: '2026-04-01', amount: '¥48,000', status: 'Đã thanh toán' },
          { id: 'in_1N3k65', date: '2026-03-01', amount: '¥48,000', status: 'Đã thanh toán' }
        ]
      },
      mirai: {
        code: 'CMP-004',
        name: 'Mirai FinTech Corp',
        plan: 'Enterprise Pro (6 Tháng - Giảm 10%)',
        mrr: '¥36,000 / tháng ($240)',
        seats: '53 / 55 ghế (96.3% công suất)',
        invoices: [
          { id: 'in_1M7k22', date: '2026-05-01', amount: '¥36,000', status: 'Đã thanh toán' },
          { id: 'in_1M7k11', date: '2026-04-01', amount: '¥36,000', status: 'Đã thanh toán' }
        ]
      },
      kanto: {
        code: 'CMP-007',
        name: 'Kanto Robotics Ltd',
        plan: 'Standard AI Suite (1 Tháng)',
        mrr: '¥28,000 / tháng ($185)',
        seats: '32 / 40 ghế (80.0% công suất)',
        invoices: [
          { id: 'in_1K9p44', date: '2026-05-05', amount: '¥28,000', status: 'Đã thanh toán' }
        ]
      },
      xyz: {
        code: 'CMP-002',
        name: 'XYZ 合同会社',
        plan: 'Standard AI Suite (Trial 14 ngày - Còn 6 ngày)',
        mrr: '¥0 (Kỳ vọng: ¥15,000 / tháng)',
        seats: '9 / 10 ghế (90% công suất)',
        invoices: [
          { id: 'trial_free', date: '2026-05-14', amount: '¥0 (Trial)', status: 'Đang dùng thử' }
        ]
      },
      test: {
        code: 'CMP-099',
        name: 'Công ty Cổ phần Test',
        plan: 'Starter Growth (1 Tháng)',
        mrr: '¥8,500 / tháng (Quá hạn 5 ngày)',
        seats: '1 / 5 ghế (20% công suất)',
        invoices: [
          { id: 'in_fail_2', date: '2026-05-10', amount: '¥8,500', status: 'Quá hạn (Lần 2)' }
        ]
      }
    };

    window.openDrawerForCompany = function (key) {
      var data = apCompanyDataMap[key] || apCompanyDataMap.apex;
      var cCode = document.getElementById('dr-code');
      var cName = document.getElementById('dr-name');
      var cPlan = document.getElementById('dr-plan');
      var cMrr = document.getElementById('dr-mrr');
      var cSeats = document.getElementById('dr-seats');
      var invBody = document.getElementById('dr-invoices-body');

      if (cCode) cCode.innerText = data.code;
      if (cName) cName.innerText = data.name;
      if (cPlan) cPlan.innerText = data.plan;
      if (cMrr) cMrr.innerText = data.mrr;
      if (cSeats) cSeats.innerText = data.seats;

      if (invBody && data.invoices) {
        invBody.innerHTML = data.invoices.map(function (inv) {
          var isPaid = inv.status.indexOf('thanh toán') > -1;
          var isTrial = inv.status.indexOf('thử') > -1;
          var color = isPaid ? '#059669' : (isTrial ? '#d97706' : '#dc2626');
          return '<tr style="border-bottom:1px solid #f1f5f9">'
            + '<td style="padding:6px 8px">' + inv.id + '</td>'
            + '<td style="padding:6px 8px">' + inv.date + '</td>'
            + '<td style="padding:6px 8px;font-weight:700">' + inv.amount + '</td>'
            + '<td style="padding:6px 8px;text-align:right;color:' + color + ';font-weight:700">● ' + inv.status + '</td>'
            + '</tr>';
        }).join('');
      }

      var ov = document.getElementById('ap-drawer-overlay');
      var dr = document.getElementById('ap-drawer');
      if (ov) ov.classList.add('open');
      if (dr) dr.classList.add('open');
    };

    window.closeApDrawer = function () {
      var ov = document.getElementById('ap-drawer-overlay');
      var dr = document.getElementById('ap-drawer');
      if (ov) ov.classList.remove('open');
      if (dr) dr.classList.remove('open');
      var res = document.getElementById('ap-proration-res');
      if (res) res.style.display = 'none';
    };

    window.simApAddSeats = function (seats) {
      var res = document.getElementById('ap-proration-res');
      if (!res) return;
      var pricePerSeat = 4800; // JPY
      var daysLeft = 16;
      var totalDays = 31;
      var prorated = Math.round((pricePerSeat * seats * daysLeft) / totalDays);
      res.style.display = 'block';
      res.innerHTML = '✅ Bổ sung <strong>+' + seats + ' ghế</strong> trong <strong>' + daysLeft + ' ngày</strong> còn lại của tháng = <span style="color:#059669;font-size:13px">+¥' + prorated.toLocaleString() + '</span> thanh toán ngay qua thẻ.';
    };

    window.exportApCSV = function () {
      var period = document.getElementById('ap-period-select') ? document.getElementById('ap-period-select').value : '2026-05';
      var csv = "﻿"
        + "Mã Cty,Tên Doanh Nghiệp,Gói Dịch Vụ,Chu Kỳ,Số Ghế Dùng,Tổng Ghế,Doanh Thu Tháng,Trạng Thái\n"
        + "CMP-001,Apex Global Logistics,Enterprise Pro,1 Năm,78,80,¥48,000,Active\n"
        + "CMP-004,Mirai FinTech Corp,Enterprise Pro,6 Tháng,53,55,¥36,000,Active\n"
        + "CMP-007,Kanto Robotics Ltd,Standard Suite,1 Tháng,32,40,¥28,000,Active\n"
        + "CMP-002,XYZ 合同会社,Standard Suite,Trial 14N,9,10,¥0,Trial\n"
        + "CMP-099,Công ty Cổ phần Test,Starter Growth,1 Tháng,1,5,¥8,500,Overdue\n";

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'AI_Platform_Report_' + period + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };


    // ===== SIDEBAR COLLAPSIBLE TOGGLE =====
    window.toggleSidebar = function () {
      var sbAdmin = document.getElementById('sidebar-admin');
      var sbComp = document.getElementById('sidebar-company');
      var activeSb = (sbAdmin && sbAdmin.style.display !== 'none') ? sbAdmin : sbComp;
      if (!activeSb) activeSb = sbAdmin || sbComp;
      if (activeSb) {
        activeSb.classList.toggle('collapsed');
        var isCollapsed = activeSb.classList.contains('collapsed');
        localStorage.setItem('emind_sidebar_collapsed', isCollapsed ? '1' : '0');
      }
    };

    // Restore sidebar state on load
    document.addEventListener('DOMContentLoaded', function () {
      if (localStorage.getItem('emind_sidebar_collapsed') === '1') {
        var sbA = document.getElementById('sidebar-admin');
        var sbC = document.getElementById('sidebar-company');
        if (sbA) sbA.classList.add('collapsed');
        if (sbC) sbC.classList.add('collapsed');
      }
    });