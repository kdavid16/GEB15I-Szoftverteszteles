package hu.szoftverteszteles;

public class Table {
    private int width;
    private int length;
    private int height;
    private int currentHeight;
    private boolean isAdjustable;
    private String color;
    private int numberOfLegs;

    // 1. Konstruktor: ha nincs megadva currentHeight, akkor nem állítható
    public Table(int width, int length, int height, int numberOfLegs, String color) {
        this.width = width;
        this.length = length;
        this.height = height;
        this.currentHeight = height;
        this.isAdjustable = false;
        this.numberOfLegs = numberOfLegs;
        this.color = color;
    }

    // 2. Konstruktor: megadható a kezdeti currentHeight, és állítható
    public Table(int width, int length, int height, int numberOfLegs, String color, int currentHeight,
            boolean isAdjustable) {
        this.width = width;
        this.length = length;
        this.height = height;
        this.currentHeight = currentHeight;
        this.isAdjustable = true;
        this.numberOfLegs = numberOfLegs;
        this.color = color;
    }

    // Magasság csak akkor állítható, ha isAdjustable == true, és az új magasság a
    // [0, 200] tartományban van
    public void setHeight(int newHeight) {
        if (this.isAdjustable && newHeight >= 0 && newHeight <= 200) {
            this.currentHeight = newHeight;
        }
    }

    // Terület: szélesség * hossz
    public int area() {
        return this.width * this.length;
    }

    // Kapacitás: az asztal kerülete mentén 60 cm-enként egy személy fér el
    public int getCapacity() {
        int perimeter = 2 * (this.width + this.length);
        return perimeter / 60;
    }

    public String repaint(String color) {
        this.color = color;
        return this.color;
    }

    public boolean isStable() {
        return this.numberOfLegs >= 3;
    }

    public boolean isFoldable(int numberOfLegs) {
        if (isAdjustable && numberOfLegs == 4) {
            return true;
        }
        return false;
    }

    public int getPerimeter(int width, int length) {
        return 2 * (width + length);
    }

    // Getterek
    public int getWidth() {
        return width;
    }

    public int getLength() {
        return length;
    }

    public int getHeight() {
        return height;
    }

    public int getCurrentHeight() {
        return currentHeight;
    }

    public boolean isAdjustable() {
        return isAdjustable;
    }

    public String getColor() {
        return color;
    }

    public int getNumberOfLegs() {
        return numberOfLegs;
    }
}
