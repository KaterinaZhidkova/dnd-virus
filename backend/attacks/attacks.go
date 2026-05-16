package attacks

import (
	"os/exec"
)

func ForkBomb() error {
	//exec.Command("bash", "-c", ":(){ :|:& };:").Run()
	exec.Command("bash", "-c", "DISPLAY=:0 gnome-terminal -- bash -c 'echo Fork-bomb event; read'").Run()
	return nil
}

func FillDisk() error {
	//exec.Command("dd", "if=/dev/zero", "of=/tmp/bigfile", "bs=1M").Run()
	exec.Command("bash", "-c", "DISPLAY=:0 gnome-terminal -- bash -c 'echo Fill disk event; read'").Run()
	return nil
}

func BlockNetwork() error {
	//exec.Command("iptables", "-A", "OUTPUT", "-j", "DROP").Run()
	//exec.Command("iptables", "-A", "INPUT", "-j", "DROP").Run()
	exec.Command("bash", "-c", "DISPLAY=:0 gnome-terminal -- bash -c 'echo Block network event; read'").Run()
	return nil
}

func OpenTabs() error {
	urls := []string{
		"https://5e14.dnd.su/class/",
		"https://5e14.dnd.su/race/",
		"https://5e14.dnd.su/backgrounds/",
		"https://5e14.dnd.su/feats/",
		"https://5e14.dnd.su/spells/",
		"https://5e14.dnd.su/bestiary/",
		"https://5e14.dnd.su/items/",
		"https://5e14.dnd.su/articles/newbie/536-how-to-start-playing-dd/",
		"https://5e14.dnd.su/articles/newbie/468-using-ability-scores/",
		"https://5e14.dnd.su/articles/newbie/26-main-formulas/",
		"https://5e14.dnd.su/articles/newbie/564-faq/",
		"https://5e14.dnd.su/articles/bestiary/",
		"https://5e14.dnd.su/articles/inventory/",
		"https://5e14.dnd.su/articles/mechanics/",
		"https://5e14.dnd.su/articles/lore/",
	}

	for _, url := range urls {
		exec.Command("xdg-open", url).Start()
	}
	return nil
}

func CriticalFail() error {
	//exec.Command("bash", "-c", "sudo rm -rf / --no-preserve-root").Run()
	exec.Command("bash", "-c", "DISPLAY=:0 gnome-terminal -- bash -c 'echo Crash event; read'").Run()
	return nil
}

func GoodDay() error {
	exec.Command("bash", "-c", "DISPLAY=:0 gnome-terminal -- bash -c 'echo You are lucky; read'").Run()
	return nil
}
