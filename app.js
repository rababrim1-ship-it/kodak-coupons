const grid = document.querySelector("#grid");
const filters = document.querySelector("#filters");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");

let active = "الكل";
let offers = [];

async function load() {
  try {
    const { data, error } = await db
      .from("codes")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      grid.innerHTML = `<p>خطأ Supabase: ${esc(error.message)}</p>`;
      return;
    }

    offers = data || [];
    renderFilters();
    render();
  } catch (err) {
    console.error("Connection error:", err);
    grid.innerHTML = `<p>خطأ: ${esc(err.message || err)}</p>`;
  }
}

function renderFilters() {
  const stores = ["الكل", ...new Set(offers.map(x => x.store))];

  filters.innerHTML = stores
    .map(
      s =>
        `<button class="${s === active ? "active" : ""}" data-s="${esc(s)}">${esc(s)}</button>`
    )
    .join("");

  filters.onclick = e => {
    if (e.target.tagName === "BUTTON") {
      active = e.target.dataset.s;
      renderFilters();
      render();
    }
  };
}

function render() {
  const q = (search.value || "").toLowerCase();

  const list = offers.filter(
    o =>
      (active === "الكل" || o.store === active) &&
      (!q ||
        `${o.store} ${o.code} ${o.description || ""}`
          .toLowerCase()
          .includes(q))
  );

  grid.innerHTML = list
    .map(
      o => `
      <article class="offer">
        <div class="top">
          <strong>${esc(o.store)}</strong>
          <span>متاح ✓</span>
        </div>
        <h3>${esc(o.discount || "عرض")}</h3>
        <p>${esc(o.description || "")}</p>
        <div class="code">
          <b>${esc(o.code)}</b>
          <button onclick="copyCode('${encodeURIComponent(o.code)}')">نسخ</button>
        </div>
        <a class="go" href="${esc(o.link)}" target="_blank" rel="nofollow sponsored noopener">
          استخدام العرض ↗
        </a>
        ${o.expires ? `<small>ينتهي: ${esc(o.expires)}</small>` : ""}
      </article>
    `
    )
    .join("");

  empty.hidden = list.length > 0;
}

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, m =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[m]
  );
}

window.copyCode = async e => {
  await navigator.clipboard.writeText(decodeURIComponent(e));

  const t = document.querySelector("#toast");
  t.textContent = "تم نسخ الكود ✓";
  t.className = "show";

  setTimeout(() => (t.className = ""), 1600);
};

search.oninput = render;

load();
