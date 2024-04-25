export function getPolishReservationErrorMessage(message: string) {
    let polishErrorMesage = '';
      switch(message) {
        case 'Cannot book later than 7 days before':
          polishErrorMesage = 'Nie można dokonać rezerwacji później niż 7 dni przed';
          break;
        case 'Reservation duration minimum is 1h':
          polishErrorMesage = 'Minimalny czas trwania rezerwacji to 1 godzina';
          break;
        case 'Reservation time not matching club opening hours':
          polishErrorMesage = 'Czas rezerwacji nie odpowiada godzinom otwarcia klubu';
          break;
        case 'Court is already occupied in desired time.':
          polishErrorMesage = 'Kort jest już zajęty w podanym czasie';
          break;
        case 'Court is closed':
          polishErrorMesage = 'Kort jest zamknięty';
          break;
        default:
          polishErrorMesage = 'Szczegóły rezerwacji nie są poprawne';
    }
    return polishErrorMesage;
}