    function scheduleNextRefresh() {
      var now = new Date();
      var next = new Date(now);
      next.setHours(8, 1, 0, 0);
      if (now >= next) {
        next.setDate(next.getDate() + 1);
      }
      var msUntilNext = next - now;
      setTimeout(function () {
        laske();
        scheduleNextRefresh();
      }, msUntilNext);
    }

    laske();
    scheduleNextRefresh();