package password

import (
	"crypto/rand"
	"math/big"
)

const MAX_LEN = 12

var (
	DIGITS        = []byte("0123456789")
	LOCASE_CHARS  = []byte("abcdefghijklmnopqrstuvwxyz")
	UPPER_CHARS   = []byte("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	SYMBOLS       = []byte("@#$%=:?./|~>*()<")
	COMBINED_LIST = append(append(append(DIGITS, LOCASE_CHARS...), UPPER_CHARS...), SYMBOLS...)
)

func randomChoice(chars []byte) byte {
	n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
	return chars[n.Int64()]
}

func GeneratePassword() string {
	rand_digit := randomChoice(DIGITS)
	rand_upper := randomChoice(UPPER_CHARS)
	rand_lower := randomChoice(LOCASE_CHARS)
	rand_symbol := randomChoice(SYMBOLS)
	temp_passwd := []byte{rand_digit, rand_upper, rand_lower, rand_symbol}

	for x := 4; x < MAX_LEN; x++ {
		temp_passwd = append(temp_passwd, randomChoice(COMBINED_LIST))
	}

	for i := len(temp_passwd) - 1; i > 0; i-- {
		j, _ := rand.Int(rand.Reader, big.NewInt(int64(i+1)))
		temp_passwd[i], temp_passwd[j.Int64()] = temp_passwd[j.Int64()], temp_passwd[i]
	}

	return string(temp_passwd)
}
