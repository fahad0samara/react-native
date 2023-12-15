
// Model that represents a User with his personnal informations.
// this can be saved in Async Storage using Storage.
export class User {
    constructor(
        onboardingCompleted = false,
        firstname,
        lastname,
        email,
        phone,
        picture,
        notificationSettings = {
            orderStatus: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
          }
    ) {
        this.onboardingCompleted = onboardingCompleted;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.picture = picture;
        this.notificationSettings = notificationSettings;
    }
}