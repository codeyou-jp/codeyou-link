function toggleMode() {
    const body = document.getElementById('mainBody');
    body.classList.toggle('register-mode');
    body.classList.toggle('edit-mode');
}

// 各要素の取得
const idInput = document.getElementById('idInput');
const idFieldset = document.getElementById('idFieldset');
const idError = document.getElementById('idError');

const linkInput = document.getElementById('linkInput');
const linkFieldset = document.getElementById('linkFieldset');
const linkError = document.getElementById('linkError');

const passInput = document.getElementById('passInput');
const passFieldset = document.getElementById('passFieldset');
const passError = document.getElementById('passError');
const togglePass = document.getElementById('togglePass');

function handleSubmit() {
    const id = document.getElementById('idInput').value;
    const link = document.getElementById('linkInput').value;
    const pass = document.getElementById('passInput').value;

    // 判定ロジック
    if (id && link && pass) {
        alert(`登録・保存しました！\nID: ${id}`);
    } else {
        alert("全部入力してね！");
    }
}

// --- 1. 入力欄から離れた（Blur）時の判定 ---
idInput.addEventListener('blur', function() {
    const idValue = idInput.value.trim();
    const usedIDs = ["admin", "tamaki", "test"];

    if (idValue === "") {
        // 空のまま離れたら赤くする
        showIndivError("IDを入力してください");
    } else if (usedIDs.includes(idValue)) {
        // 重複してたら赤くする
        showIndivError("このIDはもう使われています");
    } else {
        // 合格ならエラーを消す
        resetError();
    }
});

// --- 2. 再入力しようとした（Focus）時の処理 ---
idInput.addEventListener('focus', function() {
    // 入力を始めたら、一時的にエラー（赤枠）を解除してあげる
    // これで「せかされてる感」がなくなります！
    idFieldset.classList.remove('error-border');
    // エラー文は残しておいてもいいし、消してもいい（今回は枠だけ戻す設定）
});

// すべての入力欄に対して、フォーカス時の動きを設定
[idInput, linkInput, passInput].forEach(input => {
    input.addEventListener('focus', function() {
        // 親要素の fieldset からエラーのクラスを消す
        const fieldset = this.parentElement;
        fieldset.classList.remove('error-border');
        
        // エラー文も一緒に隠したい場合はこれも追加
        const errorMsg = fieldset.querySelector('.error-text');
        if (errorMsg) errorMsg.classList.add('hidden');
    });
});

// エラー表示・リセットの共通関数
function showIndivError(message) {
    idFieldset.classList.add('error-border');
    idError.textContent = message;
    idError.classList.remove('hidden');
}

function resetError() {
    idFieldset.classList.remove('error-border');
    idError.classList.add('hidden');
}

// --- Link入力欄から離れた（Blur）時の判定 ---
linkInput.addEventListener('blur', function() {
    const linkValue = linkInput.value.trim();

    // 判定開始
    if (linkValue === "") {
        // 空の時
        showLinkError("リンクを入力してください");
    } else if (!linkValue.startsWith("http://") && !linkValue.startsWith("https://")) {
        // http:// も https:// も入っていない時
        showLinkError("正しいリンクをご入力ください");
    } else {
        // 合格！
        resetLinkError();
    }
});

// 再入力しようとした（Focus）時は赤枠を消してあげる
linkInput.addEventListener('focus', function() {
    linkFieldset.classList.remove('error-border');
});

// --- Link専用のエラー表示・リセット関数 ---
function showLinkError(message) {
    linkFieldset.classList.add('error-border');
    linkError.textContent = message;
    linkError.classList.remove('hidden');
}

function resetLinkError() {
    linkFieldset.classList.remove('error-border');
    linkError.classList.add('hidden');
}

// --- Password入力欄から離れた（Blur）時の判定 ---
passInput.addEventListener('blur', function() {
    const val = passInput.value;
    
    // 1. 英字が含まれているかチェック
    const hasAlpha = /[a-zA-Z]/.test(val);
    // 2. 数字が含まれているかチェック
    const hasNum = /\d/.test(val);
    // 3. 8文字以上かチェック
    const isLongEnough = val.length >= 8;

    if (val === "") {
        // 空っぽの時
        showPassError("パスワードを入力してください");
    } else if (!isLongEnough || !hasAlpha || !hasNum) {
        // 8文字未満、または英字か数字が足りない時
        showPassError("英字、数字を含め８字以上で指定してください");
    } else {
        // 合格！
        resetPassError();
    }
});

// 入力を始めたら赤枠を消してあげる（フォーカス時）
passInput.addEventListener('focus', function() {
    passFieldset.classList.remove('error-border');
    // メッセージも隠したい場合はここに追加
    passError.classList.add('hidden');
});

// --- Password専用のエラー表示・リセット関数 ---
function showPassError(message) {
    passFieldset.classList.add('error-border');
    passError.textContent = message;
    passError.classList.remove('hidden');
}

function resetPassError() {
    passFieldset.classList.remove('error-border');
    passError.classList.add('hidden');
}


function showError(f, e, m) {
    f.classList.add('error-border');
    e.textContent = m;
    e.classList.remove('hidden');
}

function hideError(f, e) {
    f.classList.remove('error-border');
    e.classList.add('hidden');
}

function handleSubmit() {
    // 最終チェック：エラーがあるか、空欄があるか
    const hasError = document.querySelector('.error-border');
    if (!hasError && idInput.value && linkInput.value && passInput.value) {
        alert("保存しました！");
    } else {
        alert("入力内容を確認してください");
    }
}

togglePass.addEventListener('click', function() {
    // type属性を切り替える
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passInput.setAttribute('type', type);
    
    // アイコンの文字（見た目）を切り替える
    // visibility = 開いた目 / visibility_off = 斜線入りの目
    this.textContent = type === 'password' ? 'visibility_off' : 'visibility';
});

// 各入力欄のフォーカス設定
[idInput, linkInput, passInput].forEach(input => {
    input.addEventListener('focus', function() {
        this.closest('fieldset').classList.remove('error-border');
    });
});
