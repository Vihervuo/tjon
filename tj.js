// ES5-compatible date formatting
    function formatDate(d) {
      var y = d.getFullYear();
      var m = ("0" + (d.getMonth() + 1)).slice(-2);
      var day = ("0" + d.getDate()).slice(-2);
      return y + "-" + m + "-" + day;
    }

    var lomat = [
      [new Date(2025, 9, 13), new Date(2025, 9, 17)], 
      [new Date(2025, 11, 22), new Date(2026, 0, 6)]
    ];
    var tavoite = new Date(2026, 1, 5); 

    function laske() {
      var tanaan = new Date();
      tanaan.setHours(0, 0, 0, 0);

      if (tavoite < tanaan) {
        document.getElementById("daysLeft").textContent = "Päivämäärä on jo mennyt";
        document.getElementById("day100").textContent = "";
        return;
      }

      var paiviaJaljella = 0;
      var paiva = new Date(tanaan);
      var paiva100 = null;

      while (paiva < tavoite) {
        paiva.setDate(paiva.getDate() + 1);
        if (paiva.getDay() >= 1 && paiva.getDay() <= 5) {
          var lomassa = false;
          for (var i = 0; i < lomat.length; i++) {
            var alku = lomat[i][0];
            var loppu = lomat[i][1];
            if (paiva >= alku && paiva <= loppu) {
              lomassa = true;
              break;
            }
          }

          if (!lomassa) {
            paiviaJaljella++;
            if (paiva100 === null) {
              var loppuPaivia = 0;
              var testiP = new Date(paiva);
              while (testiP < tavoite) {
                testiP.setDate(testiP.getDate() + 1);
                if (testiP.getDay() >= 1 && testiP.getDay() <= 5) {
                  var testiLomassa = false;
                  for (var j = 0; j < lomat.length; j++) {
                    var alku2 = lomat[j][0];
                    var loppu2 = lomat[j][1];
                    if (testiP >= alku2 && testiP <= loppu2) {
                      testiLomassa = true;
                      break;
                    }
                  }
                  if (!testiLomassa) {
                    loppuPaivia++;
                  }
                }
              }
              if (loppuPaivia === 100) {
                paiva100 = new Date(paiva);
              }
            }
          }
        }
      }

      document.getElementById("daysLeft").textContent = paiviaJaljella;
      document.getElementById("day100").textContent = paiva100
        ? "Tj 100: " + formatDate(paiva100)
        : "";
    }
