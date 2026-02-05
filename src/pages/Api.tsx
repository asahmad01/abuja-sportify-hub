import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BASE_URL = "https://api.spotts.ng/api/v1/partner";

const CodeBlock = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <pre className={`rounded-lg bg-zinc-900 text-zinc-100 p-4 text-sm overflow-x-auto font-mono border border-zinc-800 ${className}`}>
    <code>{children}</code>
  </pre>
);

const MethodBadge = ({ method }: { method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" }) => {
  const styles: Record<string, string> = {
    GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    PUT: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    PATCH: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/40",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${styles[method] || ""}`}>
      {method}
    </span>
  );
};

const ApiSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl font-bold text-foreground border-b pb-2 mb-4">{title}</h2>
    {children}
  </section>
);

const Api = () => {
  const navSections = [
    { id: "overview", label: "Overview" },
    { id: "authentication", label: "Authentication" },
    { id: "rate-limiting", label: "Rate Limiting" },
    { id: "response-format", label: "Response Format" },
    { id: "endpoints", label: "Endpoints" },
    { id: "webhooks", label: "Webhooks" },
    { id: "error-codes", label: "Error Codes" },
    { id: "deprecated", label: "Deprecated" },
    { id: "quick-start", label: "Quick Start" },
    { id: "best-practices", label: "Best Practices" },
    { id: "support", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16 bg-white">
        {/* Hero */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Partner <span className="gradient-text">API</span>
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
              Complete API reference for third-party calendar sync partners integrating with the SPOTTS booking platform.
            </p>
            <div className="mt-4">
              <CodeBlock>{BASE_URL}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <nav className="space-y-1 pr-4">
                  {navSections.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="block py-1.5 px-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </ScrollArea>
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 max-w-4xl space-y-12 pb-24">
            <ApiSection id="overview" title="Overview">
              <p className="text-muted-foreground mb-4">
                The SPOTTS Partner API allows approved third-party platforms to integrate with our sports facility booking system. Partners can view court availability, create time slot blocks (reservations), and manage their bookings programmatically.
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-2">Base URL</h3>
              <CodeBlock>{BASE_URL}</CodeBlock>
              <h3 className="text-lg font-semibold mt-6 mb-2">Key Concepts</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong className="text-foreground">Courts</strong>: Individual playing areas within a venue (e.g., &quot;Court A&quot; at &quot;Abuja Tennis Club&quot;)</li>
                <li><strong className="text-foreground">Venues</strong>: Sports facilities that contain one or more courts</li>
                <li><strong className="text-foreground">Blocks</strong>: Time slot reservations created by partners (similar to bookings but managed via API)</li>
                <li><strong className="text-foreground">Venue Scoping</strong>: Partners may be restricted to specific venues. If restricted, only those venues&apos; courts and availability are accessible.</li>
              </ul>
            </ApiSection>

            <ApiSection id="authentication" title="Authentication">
              <p className="text-muted-foreground mb-4">
                All API requests require a Bearer token in the <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Authorization</code> header.
              </p>
              <CodeBlock>{`Authorization: Bearer YOUR_API_KEY`}</CodeBlock>
              <p className="text-muted-foreground mt-4 text-sm">
                API keys are long random strings provided once during partner onboarding. They cannot be retrieved again — only rotated (which invalidates the old key).
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-2">Authentication Errors</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Error Code</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>401</TableCell><TableCell><code>MISSING_API_KEY</code></TableCell><TableCell>No Authorization header or missing Bearer prefix</TableCell></TableRow>
                  <TableRow><TableCell>401</TableCell><TableCell><code>INVALID_API_KEY</code></TableCell><TableCell>The API key does not match any active partner</TableCell></TableRow>
                  <TableRow><TableCell>401</TableCell><TableCell><code>API_KEY_REVOKED</code></TableCell><TableCell>The API key has been permanently revoked</TableCell></TableRow>
                  <TableRow><TableCell>403</TableCell><TableCell><code>PARTNER_SUSPENDED</code></TableCell><TableCell>The partner account is temporarily suspended</TableCell></TableRow>
                </TableBody>
              </Table>
              <h3 className="text-lg font-semibold mt-4 mb-2">Example Error Response</h3>
              <CodeBlock>{`{
  "success": false,
  "error": "MISSING_API_KEY",
  "message": "Authorization header with Bearer token is required."
}`}</CodeBlock>
            </ApiSection>

            <ApiSection id="rate-limiting" title="Rate Limiting">
              <p className="text-muted-foreground mb-4">
                Rate limits are applied per partner, per minute, with separate limits for read and write operations.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operation Type</TableHead>
                    <TableHead>HTTP Methods</TableHead>
                    <TableHead>Default Limit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>Read</TableCell><TableCell>GET</TableCell><TableCell>60 requests/min</TableCell></TableRow>
                  <TableRow><TableCell>Write</TableCell><TableCell>POST, PUT, PATCH, DELETE</TableCell><TableCell>30 requests/min</TableCell></TableRow>
                </TableBody>
              </Table>
              <p className="text-muted-foreground mt-4">Every response includes rate limit headers:</p>
              <CodeBlock>{`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 57`}</CodeBlock>
              <p className="text-muted-foreground mt-4">When rate limit is exceeded (HTTP 429):</p>
              <CodeBlock>{`{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. Maximum 60 read requests per minute."
}`}</CodeBlock>
            </ApiSection>

            <ApiSection id="response-format" title="Response Format">
              <p className="text-muted-foreground mb-4">All responses follow a consistent JSON structure.</p>
              <h3 className="text-lg font-semibold mb-2">Success</h3>
              <CodeBlock>{`{
  "success": true,
  "message": "Description of what happened",
  "data": { ... }
}`}</CodeBlock>
              <h3 className="text-lg font-semibold mt-4 mb-2">Error</h3>
              <CodeBlock>{`{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}`}</CodeBlock>
              <h3 className="text-lg font-semibold mt-6 mb-2">HTTP Status Codes</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Meaning</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>200</TableCell><TableCell>Success</TableCell></TableRow>
                  <TableRow><TableCell>201</TableCell><TableCell>Created (new resource)</TableCell></TableRow>
                  <TableRow><TableCell>400</TableCell><TableCell>Bad request (invalid parameters)</TableCell></TableRow>
                  <TableRow><TableCell>401</TableCell><TableCell>Unauthorized (invalid/missing API key)</TableCell></TableRow>
                  <TableRow><TableCell>403</TableCell><TableCell>Forbidden (suspended account or venue access denied)</TableCell></TableRow>
                  <TableRow><TableCell>404</TableCell><TableCell>Resource not found</TableCell></TableRow>
                  <TableRow><TableCell>409</TableCell><TableCell>Conflict (slot unavailable)</TableCell></TableRow>
                  <TableRow><TableCell>422</TableCell><TableCell>Validation error (invalid input)</TableCell></TableRow>
                  <TableRow><TableCell>429</TableCell><TableCell>Rate limit exceeded</TableCell></TableRow>
                  <TableRow><TableCell>500</TableCell><TableCell>Internal server error</TableCell></TableRow>
                </TableBody>
              </Table>
            </ApiSection>

            <ApiSection id="endpoints" title="Endpoints">
              {/* 1. List Courts */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/courts</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">List Courts</h3>
                <p className="text-muted-foreground mb-4">Retrieve all courts the partner has access to, grouped by venue.</p>
                <p className="text-sm font-medium mb-1">Query parameters</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>venue_id</TableCell><TableCell>integer</TableCell><TableCell>No</TableCell><TableCell>Filter courts by venue ID</TableCell></TableRow>
                    <TableRow><TableCell>sport</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Filter by sport slug (e.g. football, tennis)</TableCell></TableRow>
                  </TableBody>
                </Table>
                <CodeBlock>{`curl -X GET "${BASE_URL}/courts?sport=tennis" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</CodeBlock>
              </div>

              {/* 2. Get Court Availability */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/courts/{`{courtId}`}/availability</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Court Availability</h3>
                <p className="text-muted-foreground mb-4">Check available time slots for a specific court on a given date.</p>
                <p className="text-sm font-medium mb-1">Query: <code>date</code> (required) — YYYY-MM-DD</p>
                <CodeBlock>{`curl -X GET "${BASE_URL}/courts/15/availability?date=2026-02-10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</CodeBlock>
              </div>

              {/* 3. Create Block */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Block</h3>
                <p className="text-muted-foreground mb-4">Reserve a time slot on a court. Idempotent when using the same <code className="rounded bg-muted px-1">partner_reference</code>.</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>court_id</TableCell><TableCell>integer</TableCell><TableCell>Yes</TableCell><TableCell>Court to block</TableCell></TableRow>
                    <TableRow><TableCell>date</TableCell><TableCell>string</TableCell><TableCell>Yes</TableCell><TableCell>YYYY-MM-DD</TableCell></TableRow>
                    <TableRow><TableCell>start_time</TableCell><TableCell>string</TableCell><TableCell>Yes</TableCell><TableCell>HH:MM</TableCell></TableRow>
                    <TableRow><TableCell>end_time</TableCell><TableCell>string</TableCell><TableCell>Yes</TableCell><TableCell>HH:MM</TableCell></TableRow>
                    <TableRow><TableCell>partner_reference</TableCell><TableCell>string</TableCell><TableCell>Yes</TableCell><TableCell>Your unique reference (max 255 chars)</TableCell></TableRow>
                  </TableBody>
                </Table>
                <CodeBlock>{`curl -X POST "${BASE_URL}/blocks" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "court_id": 15,
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "partner_reference": "MATCHI-BK-12345"
  }'`}</CodeBlock>
              </div>

              {/* 4. List Blocks */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">List Blocks</h3>
                <p className="text-muted-foreground mb-2">Query: court_id, date_from, date_to, status, per_page (max 100)</p>
              </div>

              {/* 5. Get Block Details */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks/{`{blockReference}`}</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Block Details</h3>
              </div>

              {/* 6. Release Block */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="DELETE" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks/{`{blockReference}`}</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">Release Block</h3>
                <p className="text-muted-foreground mb-2">Query: <code className="rounded bg-muted px-1">reason</code> (optional): cancelled | completed | no_show</p>
                <CodeBlock>{`curl -X DELETE "${BASE_URL}/blocks/BLK-abc123def456?reason=completed" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</CodeBlock>
              </div>

              {/* 7. Webhook Deliveries */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/webhooks/deliveries</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">Webhook Deliveries</h3>
                <p className="text-muted-foreground">Query: status, event_type</p>
              </div>

              {/* 8. Test Webhook */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/webhooks/test</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">Test Webhook</h3>
                <p className="text-muted-foreground text-sm">Webhook URL and secret must be configured by SPOTTS admin first.</p>
              </div>
            </ApiSection>

            <ApiSection id="webhooks" title="Webhooks">
              <p className="text-muted-foreground mb-4">
                When configured, SPOTTS sends webhook notifications to your URL. Webhooks are signed with HMAC-SHA256.
              </p>
              <h3 className="text-lg font-semibold mb-2">Headers</h3>
              <CodeBlock>{`Content-Type: application/json
X-SPOTTS-Signature: sha256=abc123...
X-SPOTTS-Event: block.released
X-SPOTTS-Delivery: delivery-uuid-here`}</CodeBlock>
              <h3 className="text-lg font-semibold mt-6 mb-2">Verify signature (Node.js)</h3>
              <CodeBlock>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</CodeBlock>
              <h3 className="text-lg font-semibold mt-6 mb-2">Events</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>block.released</TableCell><TableCell>A block you created was released</TableCell></TableRow>
                  <TableRow><TableCell>block.expired</TableCell><TableCell>A block expired (past scheduled time)</TableCell></TableRow>
                  <TableRow><TableCell>availability.changed</TableCell><TableCell>Availability changed for a venue you have access to</TableCell></TableRow>
                  <TableRow><TableCell>test</TableCell><TableCell>Test webhook (triggered via test endpoint)</TableCell></TableRow>
                </TableBody>
              </Table>
              <h3 className="text-lg font-semibold mt-6 mb-2">Retry policy</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attempt</TableHead>
                    <TableHead>Delay</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>1st retry</TableCell><TableCell>1 minute</TableCell></TableRow>
                  <TableRow><TableCell>2nd</TableCell><TableCell>5 minutes</TableCell></TableRow>
                  <TableRow><TableCell>3rd</TableCell><TableCell>30 minutes</TableCell></TableRow>
                  <TableRow><TableCell>4th</TableCell><TableCell>2 hours</TableCell></TableRow>
                  <TableRow><TableCell>5th</TableCell><TableCell>12 hours</TableCell></TableRow>
                </TableBody>
              </Table>
            </ApiSection>

            <ApiSection id="error-codes" title="Error Codes Reference">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Error Code</TableHead>
                    <TableHead>HTTP</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>MISSING_API_KEY</TableCell><TableCell>401</TableCell><TableCell>No Authorization header provided</TableCell></TableRow>
                  <TableRow><TableCell>INVALID_API_KEY</TableCell><TableCell>401</TableCell><TableCell>API key doesn&apos;t match any partner</TableCell></TableRow>
                  <TableRow><TableCell>API_KEY_REVOKED</TableCell><TableCell>401</TableCell><TableCell>API key permanently revoked</TableCell></TableRow>
                  <TableRow><TableCell>PARTNER_SUSPENDED</TableCell><TableCell>403</TableCell><TableCell>Partner account temporarily suspended</TableCell></TableRow>
                  <TableRow><TableCell>VENUE_ACCESS_DENIED</TableCell><TableCell>403</TableCell><TableCell>Partner doesn&apos;t have access to venue</TableCell></TableRow>
                  <TableRow><TableCell>RATE_LIMIT_EXCEEDED</TableCell><TableCell>429</TableCell><TableCell>Too many requests</TableCell></TableRow>
                  <TableRow><TableCell>COURT_NOT_FOUND</TableCell><TableCell>404</TableCell><TableCell>Court ID does not exist</TableCell></TableRow>
                  <TableRow><TableCell>BLOCK_NOT_FOUND</TableCell><TableCell>404</TableCell><TableCell>Block not found or belongs to another partner</TableCell></TableRow>
                  <TableRow><TableCell>SLOT_UNAVAILABLE</TableCell><TableCell>409</TableCell><TableCell>Time slot already booked or blocked</TableCell></TableRow>
                  <TableRow><TableCell>PAST_DATE</TableCell><TableCell>400</TableCell><TableCell>Requested date is in the past</TableCell></TableRow>
                  <TableRow><TableCell>DATE_TOO_FAR</TableCell><TableCell>400</TableCell><TableCell>Date exceeds max advance days</TableCell></TableRow>
                  <TableRow><TableCell>WEBHOOK_NOT_CONFIGURED</TableCell><TableCell>400</TableCell><TableCell>No webhook URL configured</TableCell></TableRow>
                  <TableRow><TableCell>WEBHOOK_SECRET_MISSING</TableCell><TableCell>400</TableCell><TableCell>No webhook secret configured</TableCell></TableRow>
                </TableBody>
              </Table>
            </ApiSection>

            <ApiSection id="deprecated" title="Deprecated Endpoints">
              <div className="flex items-center gap-2 mb-2">
                <MethodBadge method="PATCH" />
                <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks/{`{blockReference}`}/status</code>
              </div>
              <p className="text-muted-foreground">
                <strong>Deprecated.</strong> Use <code className="rounded bg-muted px-1">DELETE /v1/partner/blocks/{`{blockReference}`}?reason=...</code> instead. Still works for backward compatibility.
              </p>
            </ApiSection>

            <ApiSection id="quick-start" title="Quick Start Guide">
              <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
                <li><strong className="text-foreground">Get your API key</strong> — Contact SPOTTS to get onboarded. You receive an API key (shown once), partner slug, and venue access confirmation.</li>
                <li><strong className="text-foreground">List courts</strong> — <code className="rounded bg-muted px-1 text-sm">GET /courts</code> with <code className="rounded bg-muted px-1 text-sm">Authorization: Bearer YOUR_API_KEY</code></li>
                <li><strong className="text-foreground">Check availability</strong> — <code className="rounded bg-muted px-1 text-sm">GET /courts/15/availability?date=YYYY-MM-DD</code></li>
                <li><strong className="text-foreground">Create a block</strong> — <code className="rounded bg-muted px-1 text-sm">POST /blocks</code> with court_id, date, start_time, end_time, partner_reference</li>
                <li><strong className="text-foreground">Release when done</strong> — <code className="rounded bg-muted px-1 text-sm">DELETE /blocks/BLK-xxx?reason=completed</code></li>
              </ol>
            </ApiSection>

            <ApiSection id="best-practices" title="Integration Best Practices">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Use idempotency:</strong> Always send a unique <code className="rounded bg-muted px-1">partner_reference</code> when creating blocks so retries don&apos;t create duplicates.</li>
                <li><strong className="text-foreground">Cache court lists:</strong> Cache <code className="rounded bg-muted px-1">GET /courts</code> and refresh every few hours.</li>
                <li><strong className="text-foreground">Handle rate limits:</strong> Check <code className="rounded bg-muted px-1">X-RateLimit-Remaining</code>; on 429, respect <code className="rounded bg-muted px-1">Retry-After</code>.</li>
                <li><strong className="text-foreground">Implement webhooks:</strong> Use webhooks for real-time notifications instead of polling.</li>
                <li><strong className="text-foreground">Verify webhook signatures:</strong> Always validate <code className="rounded bg-muted px-1">X-SPOTTS-Signature</code>.</li>
                <li><strong className="text-foreground">Timezone:</strong> All times are West Africa Time (WAT / UTC+1). Dates YYYY-MM-DD, times HH:MM 24-hour.</li>
              </ul>
            </ApiSection>

            <ApiSection id="support" title="Support">
              <p className="text-muted-foreground mb-2">For API support, integration questions, or to report issues:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong className="text-foreground">Email:</strong> <a href="mailto:api-support@spotts.ng" className="text-primary hover:underline">api-support@spotts.ng</a></li>
                <li><strong className="text-foreground">Partner Dashboard:</strong> Contact your SPOTTS account manager</li>
                <li><strong className="text-foreground">Status:</strong> status.spotts.ng</li>
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">Last updated: February 2026</p>
            </ApiSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Api;
