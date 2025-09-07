import { Component } from '@angular/core';
import { LayoutComponent } from '../components/layout.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { SITE_CONFIG } from '../config/navigation.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LayoutComponent, PageHeaderComponent],
  template: `
    <app-layout>
      <div class="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-4xl mx-auto">
          <app-page-header
            subtitle="CONTACT"
            title="Get In Touch"
            description="I'd love to hear from you. Let's connect and discuss technology, projects, or just say hello!"
          >
          </app-page-header>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Contact Information -->
            <div class="space-y-6">
              <div class="card">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                  Connect With Me
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <svg
                      class="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                    <a
                      href="https://twitter.com/rweritz"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {{ siteConfig.handle }}
                    </a>
                  </div>
                  <div class="flex items-center space-x-3">
                    <svg
                      class="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <a
                      href="https://github.com/rweritz"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                  <div class="flex items-center space-x-3">
                    <svg
                      class="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                    <a
                      href="https://linkedin.com/in/rweritz"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div class="flex items-center space-x-3">
                    <svg
                      class="w-5 h-5 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </svg>
                    <a
                      href="https://youtube.com/@rweritz"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div class="card">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                  What I'm Up To
                </h3>
                <ul class="space-y-2 text-gray-600">
                  <li>• Creating technical content and tutorials</li>
                  <li>• Building modern web applications</li>
                  <li>• Exploring new technologies and frameworks</li>
                  <li>• Contributing to open source projects</li>
                </ul>
              </div>
            </div>

            <!-- Contact Form Placeholder -->
            <div class="card">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Send a Message
              </h3>
              <p class="text-gray-600 mb-6">
                While I'm working on a contact form, feel free to reach out to
                me directly through any of the social platforms listed. I'm
                always excited to connect with fellow developers and tech
                enthusiasts!
              </p>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-blue-800 text-sm">
                  💡 <strong>Tip:</strong> The best way to reach me is through
                  Twitter {{ siteConfig.handle }} or LinkedIn for professional
                  inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export default class ContactComponent {
  siteConfig = SITE_CONFIG;
}
