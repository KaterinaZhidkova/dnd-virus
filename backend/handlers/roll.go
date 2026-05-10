package handlers

import (
	"encoding/json"
	"math/rand"
	"net/http"

	"dnd-virus/attacks"
)

type RollResponse struct {
	Roll        int    `json:"roll"`
	Action      string `json:"action"`
	Description string `json:"description"`
}

func RollHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	roll := rand.Intn(20) + 1

	action, description := getActionByRoll(roll)

	go executeAction(roll)

	response := RollResponse{
		Roll:        roll,
		Action:      action,
		Description: description,
	}

	json.NewEncoder(w).Encode(response)
}

func getActionByRoll(roll int) (string, string) {
	switch {
	case roll == 1:
		return "Критическая неудача", "Краш"
	case roll == 20:
		return "Критическая удача", "Тебе повезло"
	case roll <= 5:
		return "Форк-бома", "Запуск кучи процессов форками"
	case roll <= 10:
		return "Заполнение диска", "Заполнение диска description"
	case roll <= 15:
		return "Блокировка сети", "Минус Интернет"
	default:
		return "Открыть вкладки", "Какие-то заготовленные вкладки"
	}
}

func executeAction(roll int) {
	switch {
	case roll == 1:
		attacks.CriticalFail()
	case roll == 20:
		attacks.GoodDay()
	case roll <= 5:
		attacks.ForkBomb()
	case roll <= 10:
		attacks.FillDisk()
	case roll <= 15:
		attacks.BlockNetwork()
	default:
		attacks.OpenTabs()
	}
}
