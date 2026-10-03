import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  updateReady = false;
  private readonly updates = inject(SwUpdate);

  constructor() {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') this.updateReady = true;
      });
    }
  }

  async refreshForUpdate(): Promise<void> {
    if (!this.updates.isEnabled) return;
    await this.updates.activateUpdate();
    document.location.reload();
  }
}
