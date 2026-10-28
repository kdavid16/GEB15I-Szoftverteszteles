package hu.szoftverteszteles;

public class Triangle {
    public double getPerimeter(int a, int b, int c) {
        return a + b + c;
    }

    public double getArea(int a, int b, int c) {
        double perimeter = getPerimeter(a, b, c) / 2.0;
        double area = Math.sqrt(perimeter * (perimeter - a) * (perimeter - b) * (perimeter - c));
        return area;
    }

    public boolean isRightAngled(int a, int b, int c) {
        return a * a + b * b == c * c || a * a + c * c == b * b || b * b + c * c == a * a;
    }

}
