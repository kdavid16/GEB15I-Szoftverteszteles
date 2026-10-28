package hu.szoftverteszteles;

public class BankService {
    private final NotificationService notificationService;

    public BankService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void deposit(BankAccount account, double ammount) {
        account.deposit(ammount);

        notificationService.send("Successful deposit");
    }
}
