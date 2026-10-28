package hu.arabromai;

public class RomanNumeralConverter {

    private static final int MIN_VALUE = 1;
    private static final int MAX_VALUE = 3999;

    private static final int[] VALUES = {
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
    };

    private static final String[] SYMBOLS = {
        "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
    };

    public String toRoman(int arabic) {
        if (arabic < MIN_VALUE || arabic > MAX_VALUE) {
            throw new IllegalArgumentException(
                "Az arab számnak " + MIN_VALUE + " és " + MAX_VALUE + " között kell lennie, kapott érték: " + arabic
            );
        }

        StringBuilder result = new StringBuilder();
        int remaining = arabic;
        for (int i = 0; i < VALUES.length; i++) {
            while (remaining >= VALUES[i]) {
                result.append(SYMBOLS[i]);
                remaining -= VALUES[i];
            }
        }
        return result.toString();
    }
}
