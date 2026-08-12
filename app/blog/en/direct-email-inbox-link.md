## Open a Temporary Inbox Directly with an Email Address Link

Sometimes you need to return to the same temporary inbox on another tab, after a browser restart, or from a saved note. cleanorapi.com supports a direct inbox URL that contains the temporary email address, so you can open that inbox without recreating the address manually.

### What a direct inbox link looks like

Use this URL pattern:

`https://cleanorapi.com/inbox/your-address@bestinter.top`

Replace the example address with the complete temporary address you want to open. The address must use one of the email domains currently supported by cleanorapi.com.

When you visit the link, cleanorapi.com validates and normalizes the address, stores it in your current browser session, and redirects you to the home inbox. New messages sent to that address then appear through the normal inbox refresh flow.

### When this is useful

A direct link is convenient when you want to:

- Bookmark a temporary inbox during a short project
- Move between tabs without copying the address again
- Return to an inbox used for a download or low-risk verification
- Share a disposable inbox intentionally with a teammate

It removes a few repetitive steps, but it does not turn a temporary mailbox into a permanent account.

### Understand the 24-hour session

Opening the link registers the address in the current signed browser session and starts a new 24-hour access window. Visiting the direct link again can register the address again and restart that session window.

The link itself is not a one-time link and does not expire after its first use. Save any important code, receipt, or activation detail promptly instead of treating the inbox as durable storage.

### The address is the access key

Direct inbox links do not contain a password or secret token. Anyone who knows or guesses the full email address can build the same URL and open its inbox.

For that reason, do not use this feature for:

- Banking, payment, tax, or legal messages
- Password recovery for an important account
- Work identity or confidential documents
- Any message that must remain private

Also remember that URLs may appear in browser history, shared screenshots, server logs, or copied messages. Only share a direct link when sharing access is intentional.

### Invalid addresses are rejected

cleanorapi.com accepts only well-formed addresses on its configured email domains. An unsupported domain, malformed local part, or incomplete address returns a not-found response and is not added to the session.

### A practical workflow

Create or choose a temporary address, copy its direct inbox link, and keep it only for the short task at hand. Refresh the inbox while waiting for delivery, extract the information you need, and stop using the address once the task is complete.

Direct links make temporary inboxes easier to revisit. Their best use remains the same: short-lived, low-risk communication where convenience matters more than account recovery or secrecy.
