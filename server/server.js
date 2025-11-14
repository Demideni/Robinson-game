const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const users = new Map(); // telegramId -> { name, balance }

// регистрация
app.post("/api/register", (req, res) => {
  const { telegramId, name } = req.body;
  if (!telegramId) return res.status(400).json({ error: "no telegramId" });

  if (!users.has(telegramId)) {
    users.set(telegramId, { name: name || "Guest", balance: 0 });
  }
  const u = users.get(telegramId);
  res.json({ name: u.name, balance: u.balance });
});

// профиль
app.get("/api/profile", (req, res) => {
  const { telegramId } = req.query;
  if (!telegramId || !users.has(telegramId)) {
    return res.status(404).json({ error: "not found" });
  }
  const u = users.get(telegramId);
  res.json({ name: u.name, balance: u.balance });
});

// депозит (игровые монеты)
app.post("/api/deposit", (req, res) => {
  const { telegramId, amount } = req.body;
  const u = users.get(telegramId);
  if (!u) return res.status(400).json({ error: "no user" });

  const a = Number(amount) || 0;
  if (a <= 0) return res.status(400).json({ error: "bad amount" });

  u.balance += a;
  res.json({ balance: u.balance });
});

// ставка
app.post("/api/bet", (req, res) => {
  const { telegramId, amount } = req.body;
  const u = users.get(telegramId);
  if (!u) return res.status(400).json({ error: "no user" });

  const a = Number(amount) || 0;
  if (a <= 0) return res.status(400).json({ error: "bad amount" });
  if (u.balance < a) return res.status(400).json({ error: "no funds" });

  u.balance -= a;
  res.json({ balance: u.balance });
});

// результат
app.post("/api/result", (req, res) => {
  const { telegramId, win, multiplier, bet } = req.body;
  const u = users.get(telegramId);
  if (!u) return res.status(400).json({ error: "no user" });

  if (win) {
    const a = Number(bet) || 0;
    const m = Number(multiplier) || 1;
    const payout = a * m;
    u.balance += payout;
  }
  res.json({ balance: u.balance });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("API listening on", PORT));
