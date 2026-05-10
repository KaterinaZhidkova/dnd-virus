package attacks

import (
	"os/exec"
)

func ForkBomb() error {
	//cmd := exec.Command("bash", "-c", "while true; do { echo 'fork'; } & done")
	//cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	//return cmd.Start()
	exec.Command("gnome-terminal", "--", "bash", "-c", "echo 'Fork-bomb event'; read").Run()
	return nil
}

func FillDisk() error {
	//cmd := exec.Command("dd", "if=/dev/zero", "of=/tmp/bigfile", "bs=1M")
	//return cmd.Run()
	exec.Command("gnome-terminal", "--", "bash", "-c", "echo 'Fill disk event'; read").Run()
	return nil
}

func BlockNetwork() error {
	//cmd := exec.Command("iptables", "-A", "OUTPUT", "-j", "DROP")
	//return cmd.Run()
	exec.Command("gnome-terminal", "--", "bash", "-c", "echo 'Block network event'; read").Run()
	return nil
}

func OpenTabs() error {
	urls := []string{
		"https://http.cat/200",
		"https://http.cat/404",
		"https://http.cat/500",
	}

	for _, url := range urls {
		exec.Command("xdg-open", url).Start()
	}
	return nil
}

func CriticalFail() error {
	//exec.Command("bash", "-c", "echo 1 > /proc/sys/kernel/sysrq").Run()
	//return exec.Command("bash", "-c", "echo c > /proc/sysrq-trigger").Run()
	exec.Command("gnome-terminal", "--", "bash", "-c", "echo 'Crash event'; read").Run()
	return nil
}

func GoodDay() error {
	exec.Command("gnome-terminal", "--", "bash", "-c", "echo 'You are lucky'; read").Run()
	return nil
}
