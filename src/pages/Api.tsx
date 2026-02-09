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
import { AlertTriangle } from "lucide-react";

const BASE_URL = "https://YOUR_BACKEND_DOMAIN/api/v1/partner";

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

const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
    <div className="flex gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-amber-800 text-sm">{children}</div>
    </div>
  </div>
);

const Api = () => {
  const navSections = [
    { id: "overview", label: "Overview" },
    { id: "court-relationships", label: "Court Relationships" },
    { id: "authentication", label: "Authentication" },
    { id: "rate-limiting", label: "Rate Limiting" },
    { id: "response-format", label: "Response Format" },
    { id: "endpoints", label: "Endpoints" },
    { id: "webhooks", label: "Webhooks" },
    { id: "error-codes", label: "Error Codes" },
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
              <p className="text-muted-foreground text-sm mt-2">
                <strong>Note:</strong> Replace <code className="rounded bg-muted px-1.5 py-0.5 text-sm">YOUR_BACKEND_DOMAIN</code> with your actual production API domain (e.g., <code className="rounded bg-muted px-1.5 py-0.5 text-sm">spotts-api-production.up.railway.app</code> or your custom domain).
              </p>
              <h3 className="text-lg font-semibold mt-6 mb-2">Key Concepts</h3>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Term</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-semibold">Courts</TableCell><TableCell>Individual playing areas within a venue (tennis courts, football pitches, etc.)</TableCell></TableRow>
                  <TableRow><TableCell className="font-semibold">Venues</TableCell><TableCell>Sports facilities that contain one or more courts</TableCell></TableRow>
                  <TableRow><TableCell className="font-semibold">Blocks</TableCell><TableCell>Time slot reservations created by partners (prevents customers from booking)</TableCell></TableRow>
                  <TableRow><TableCell className="font-semibold">Venue Scoping</TableCell><TableCell>Partners may be restricted to specific venues</TableCell></TableRow>
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-6 mb-2">Important: Cancellation Responsibility</h3>
              <WarningBox>
                <p className="font-semibold mb-2">CRITICAL:</p>
                <p>
                  When a booking is <strong>cancelled</strong> on your platform (and the slot is still in the future), you <strong>MUST</strong> release the block on SPOTTS immediately using the Release Block endpoint. Failure to do so will leave the slot blocked, preventing other customers from booking.
                </p>
              </WarningBox>
              <p className="text-muted-foreground text-sm mt-2">
                Note: Releasing blocks for <strong>completed</strong> or <strong>no_show</strong> bookings is optional — these slots are already in the past and don&apos;t affect availability. However, releasing them helps with tracking and keeping your block list clean.
              </p>
            </ApiSection>

            <ApiSection id="court-relationships" title="Court Relationships & Blocking Behavior">
              <p className="text-muted-foreground mb-4">
                Understanding how courts relate to each other is essential for managing availability correctly.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Parent/Child Courts</h3>
              <p className="text-muted-foreground mb-4">
                Some venues have courts that can be divided into smaller sections (e.g., a full football field can be split into two half-fields).
              </p>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Court Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Blocking Behavior</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-semibold">Parent Court</TableCell><TableCell>Full-size court (e.g., &quot;Full Field&quot;)</TableCell><TableCell>Booking blocks <strong>ALL child courts</strong> of the same sport</TableCell></TableRow>
                  <TableRow><TableCell className="font-semibold">Child Court</TableCell><TableCell>Sub-section of a parent (e.g., &quot;Half 1&quot;, &quot;Half 2&quot;)</TableCell><TableCell>Booking blocks the <strong>parent only</strong> (sibling courts remain available)</TableCell></TableRow>
                  <TableRow><TableCell className="font-semibold">Standalone Court</TableCell><TableCell>Independent court with no parent/children</TableCell><TableCell>Booking only blocks itself</TableCell></TableRow>
                </TableBody>
              </Table>

              <h4 className="text-md font-semibold mt-4 mb-2">Example Scenario</h4>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm mb-4">
                <li>&quot;Football Full Field&quot; (parent) has two children: &quot;Half 1&quot; and &quot;Half 2&quot;</li>
                <li>If you block <strong>&quot;Football Full Field&quot;</strong> → both &quot;Half 1&quot; and &quot;Half 2&quot; become unavailable</li>
                <li>If you block <strong>&quot;Half 1&quot;</strong> → &quot;Football Full Field&quot; becomes unavailable, but &quot;Half 2&quot; is still bookable</li>
              </ul>

              <h4 className="text-md font-semibold mt-4 mb-2">How to Identify</h4>
              <p className="text-muted-foreground mb-2 text-sm">
                Check the <code className="rounded bg-muted px-1.5 py-0.5 text-sm">is_parent_court</code>, <code className="rounded bg-muted px-1.5 py-0.5 text-sm">is_child_court</code>, and <code className="rounded bg-muted px-1.5 py-0.5 text-sm">parent_court_id</code> fields in the court object:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm mb-4">
                <li><code className="rounded bg-muted px-1">is_parent_court: true</code> = This court has children (booking blocks all children)</li>
                <li><code className="rounded bg-muted px-1">is_child_court: true</code> = This court is part of a parent (booking blocks the parent)</li>
                <li><code className="rounded bg-muted px-1">parent_court_id: null</code> and <code className="rounded bg-muted px-1">is_parent_court: false</code> = Standalone court</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-2">Cross-Sport Physical Space Sharing</h3>
              <p className="text-muted-foreground mb-4">
                Multiple sports can share the same physical court space. For example, a multipurpose hall might be configured for Basketball, Tennis, or Badminton at different times.
              </p>

              <h4 className="text-md font-semibold mt-4 mb-2">Blocking Rules</h4>
              <p className="text-muted-foreground mb-2 text-sm">When you book a court on a shared physical space:</p>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>You Book</TableHead>
                    <TableHead>What Gets Blocked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-semibold">Full Court</TableCell><TableCell>Entire physical space (all sports, all configurations)</TableCell></TableRow>
                  <TableRow><TableCell className="font-semibold">Half Court</TableCell><TableCell>Parent court (same sport), all full courts (other sports), corresponding half courts (other sports with same number). <strong>Does NOT block</strong> the other half (different number).</TableCell></TableRow>
                </TableBody>
              </Table>

              <h4 className="text-md font-semibold mt-4 mb-2">Example Scenario</h4>
              <p className="text-muted-foreground mb-2 text-sm">
                Basketball, Tennis, and Football all share &quot;Multipurpose Hall A&quot;. Each sport has: Full Court, Half 1, Half 2.
              </p>
              <p className="text-muted-foreground mb-2 text-sm">If you block <strong>Basketball Half 1</strong>:</p>
              <ul className="list-none pl-6 space-y-1 text-sm mb-4">
                <li className="text-emerald-600">Basketball Full → blocked</li>
                <li className="text-emerald-600">Tennis Half 1 → blocked (same physical half)</li>
                <li className="text-emerald-600">Football Half 1 → blocked (same physical half)</li>
                <li className="text-emerald-600">All Full Courts → blocked (can&apos;t book full if half is taken)</li>
                <li className="text-red-500">Basketball Half 2 → <strong>available</strong> (different physical half)</li>
                <li className="text-red-500">Tennis Half 2 → <strong>available</strong> (different physical half)</li>
                <li className="text-red-500">Football Half 2 → <strong>available</strong> (different physical half)</li>
              </ul>

              <h4 className="text-md font-semibold mt-4 mb-2">How It Works</h4>
              <p className="text-muted-foreground mb-4 text-sm">
                The API automatically handles all blocking logic. When you create a block, related courts are blocked accordingly. When you check availability, slots marked as <code className="rounded bg-muted px-1">unavailable</code> are blocked due to parent/child or cross-sport relationships.
              </p>

              <h4 className="text-md font-semibold mt-4 mb-2">Best Practice</h4>
              <p className="text-muted-foreground text-sm">
                Always check availability before attempting to create a block. The API will reject blocks on unavailable slots with a <code className="rounded bg-muted px-1">SLOT_UNAVAILABLE</code> error.
              </p>
            </ApiSection>

            <ApiSection id="authentication" title="Authentication">
              <p className="text-muted-foreground mb-4">
                All API requests require a Bearer token in the <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Authorization</code> header.
              </p>
              <CodeBlock>{`Authorization: Bearer YOUR_API_KEY`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">API Key Format</h3>
              <p className="text-muted-foreground mb-2">
                API keys follow the format: <code className="rounded bg-muted px-1.5 py-0.5 text-sm">spk_</code> followed by 48 random characters.
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                Example: <code className="rounded bg-muted px-1.5 py-0.5 text-sm">spk_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4</code>
              </p>
              <p className="text-muted-foreground text-sm">
                API keys are provided once during partner onboarding. They cannot be retrieved again — only rotated (which invalidates the old key).
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
                  <TableRow><TableCell>401</TableCell><TableCell><code>API_KEY_REVOKED</code></TableCell><TableCell>This API key has been permanently revoked</TableCell></TableRow>
                  <TableRow><TableCell>403</TableCell><TableCell><code>PARTNER_SUSPENDED</code></TableCell><TableCell>Your partner account is suspended</TableCell></TableRow>
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
              <h3 className="text-lg font-semibold mt-6 mb-2">Rate Limit Headers</h3>
              <p className="text-muted-foreground mb-2">Every response includes rate limit headers:</p>
              <CodeBlock>{`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 57`}</CodeBlock>
              <h3 className="text-lg font-semibold mt-6 mb-2">Rate Limit Exceeded Response</h3>
              <CodeBlock>{`HTTP 429 Too Many Requests

X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706140800
Retry-After: 60`}</CodeBlock>
              <CodeBlock className="mt-2">{`{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Rate limit exceeded. Maximum 60 read requests per minute."
}`}</CodeBlock>
            </ApiSection>

            <ApiSection id="response-format" title="Response Format">
              <p className="text-muted-foreground mb-4">All responses follow a consistent JSON structure.</p>
              <h3 className="text-lg font-semibold mb-2">Success Response</h3>
              <CodeBlock>{`{
  "success": true,
  "data": { ... },
  "message": "Optional description"
}`}</CodeBlock>
              <h3 className="text-lg font-semibold mt-4 mb-2">Error Response</h3>
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
                <h3 className="text-xl font-semibold mb-2">1. List Courts</h3>
                <p className="text-muted-foreground mb-4">Retrieve all courts the partner has access to.</p>

                <p className="text-sm font-medium mb-1">Query Parameters</p>
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
                    <TableRow><TableCell>venue_id</TableCell><TableCell>integer</TableCell><TableCell>No</TableCell><TableCell>Filter courts by specific venue ID</TableCell></TableRow>
                    <TableRow><TableCell>sport</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Filter by sport slug (e.g., football, tennis, badminton)</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X GET "${BASE_URL}/courts?sport=tennis" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "courts": [
      {
        "court_id": 15,
        "court_name": "Court A",
        "venue_id": 3,
        "venue_name": "Abuja Tennis Club",
        "venue_slug": "abuja-tennis-club",
        "sport": {
          "id": 4,
          "name": "Tennis",
          "slug": "tennis"
        },
        "is_parent_court": false,
        "is_child_court": false,
        "parent_court_id": null
      },
      {
        "court_id": 22,
        "court_name": "5-A-Side Pitch 1",
        "venue_id": 5,
        "venue_name": "Riverplate Sports Arena",
        "venue_slug": "riverplate-sports-arena",
        "sport": {
          "id": 1,
          "name": "Football",
          "slug": "football"
        },
        "is_parent_court": false,
        "is_child_court": true,
        "parent_court_id": 21
      }
    ],
    "total": 2
  }
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Court Object Fields</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>court_id</TableCell><TableCell>integer</TableCell><TableCell>Unique court identifier</TableCell></TableRow>
                    <TableRow><TableCell>court_name</TableCell><TableCell>string</TableCell><TableCell>Display name of the court</TableCell></TableRow>
                    <TableRow><TableCell>venue_id</TableCell><TableCell>integer</TableCell><TableCell>Parent venue identifier</TableCell></TableRow>
                    <TableRow><TableCell>venue_name</TableCell><TableCell>string</TableCell><TableCell>Display name of the venue</TableCell></TableRow>
                    <TableRow><TableCell>venue_slug</TableCell><TableCell>string</TableCell><TableCell>URL-friendly venue identifier</TableCell></TableRow>
                    <TableRow><TableCell>sport</TableCell><TableCell>object|null</TableCell><TableCell>Sport details (id, name, slug) or null</TableCell></TableRow>
                    <TableRow><TableCell>is_parent_court</TableCell><TableCell>boolean</TableCell><TableCell>Whether this is a parent/composite court (e.g., full field)</TableCell></TableRow>
                    <TableRow><TableCell>is_child_court</TableCell><TableCell>boolean</TableCell><TableCell>Whether this is a sub-court of a parent (e.g., half field)</TableCell></TableRow>
                    <TableRow><TableCell>parent_court_id</TableCell><TableCell>integer|null</TableCell><TableCell>Parent court ID if this is a child court</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* 2. Get Court Availability */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/courts/{`{courtId}`}/availability</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Get Court Availability</h3>
                <p className="text-muted-foreground mb-4">Check available time slots for a specific court on a given date.</p>

                <p className="text-sm font-medium mb-1">Path Parameters</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>courtId</TableCell><TableCell>integer</TableCell><TableCell>The court ID to check availability for</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Query Parameters</p>
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
                    <TableRow><TableCell>date</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>Date in YYYY-MM-DD format</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Validation Rules</p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm mb-4">
                  <li>Date must be today or in the future (no past dates)</li>
                  <li>Date must be within the partner&apos;s max_advance_days limit (default: 90 days)</li>
                </ul>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X GET "${BASE_URL}/courts/15/availability?date=2026-02-10" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code> (Venue Open)</p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-10",
    "is_open": true,
    "operating_hours": {
      "opening_time": "06:00",
      "closing_time": "22:00"
    },
    "slots": [
      { "start_time": "06:00", "end_time": "06:30", "status": "available" },
      { "start_time": "06:30", "end_time": "07:00", "status": "available" },
      { "start_time": "07:00", "end_time": "07:30", "status": "booked" },
      { "start_time": "07:30", "end_time": "08:00", "status": "booked" },
      { "start_time": "08:00", "end_time": "08:30", "status": "blocked" },
      { "start_time": "08:30", "end_time": "09:00", "status": "unavailable" }
    ]
  }
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response (Venue Closed)</p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-09",
    "is_open": false,
    "reason": "Venue is closed on this day.",
    "slots": []
  }
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response (Blackout Date)</p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-14",
    "is_open": false,
    "is_blackout": true,
    "reason": "Valentine's Day Tournament",
    "slots": []
  }
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Slot Status Values</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>available</TableCell><TableCell>The slot is free and can be blocked</TableCell></TableRow>
                    <TableRow><TableCell>booked</TableCell><TableCell>Already booked by a customer through the app</TableCell></TableRow>
                    <TableRow><TableCell>blocked</TableCell><TableCell>Blocked by a partner via the API or by venue staff</TableCell></TableRow>
                    <TableRow><TableCell>unavailable</TableCell><TableCell>Blocked due to parent/child court relationship</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mt-4 mb-1">Slot Object Fields</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>start_time</TableCell><TableCell>string</TableCell><TableCell>Slot start time in HH:MM format</TableCell></TableRow>
                    <TableRow><TableCell>end_time</TableCell><TableCell>string</TableCell><TableCell>Slot end time in HH:MM format</TableCell></TableRow>
                    <TableRow><TableCell>status</TableCell><TableCell>string</TableCell><TableCell>One of: available, booked, blocked, unavailable</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mt-4 mb-1">Error Responses</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Error Code</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>400</TableCell><TableCell>DATE_IN_PAST</TableCell><TableCell>The requested date is in the past</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>DATE_TOO_FAR_AHEAD</TableCell><TableCell>Date exceeds the partner&apos;s max advance days</TableCell></TableRow>
                    <TableRow><TableCell>403</TableCell><TableCell>VENUE_ACCESS_DENIED</TableCell><TableCell>Partner doesn&apos;t have access to this venue</TableCell></TableRow>
                    <TableRow><TableCell>404</TableCell><TableCell>COURT_NOT_FOUND</TableCell><TableCell>Court ID doesn&apos;t exist</TableCell></TableRow>
                    <TableRow><TableCell>422</TableCell><TableCell>VALIDATION_ERROR</TableCell><TableCell>Missing or invalid date parameter</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* 3. Create Block */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Create Block</h3>
                <p className="text-muted-foreground mb-4">Reserve a time slot on a court. This prevents customers from booking that slot.</p>

                <p className="text-sm font-medium mb-1">Request Body</p>
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
                    <TableRow><TableCell>court_id</TableCell><TableCell>integer</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>The court to block</TableCell></TableRow>
                    <TableRow><TableCell>date</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>Date in YYYY-MM-DD format</TableCell></TableRow>
                    <TableRow><TableCell>start_time</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>Start time in HH:MM format</TableCell></TableRow>
                    <TableRow><TableCell>end_time</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>End time in HH:MM format</TableCell></TableRow>
                    <TableRow><TableCell>partner_reference</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>Your unique reference ID for this block (max 255 chars)</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X POST "${BASE_URL}/blocks" \\
  -H "Authorization: Bearer spk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "court_id": 15,
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "partner_reference": "BLEU-BK-12345"
  }'`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">201 Created</code></p>
                <CodeBlock>{`{
  "success": true,
  "message": "Block created successfully.",
  "data": {
    "block_reference": "EXT-A1B2",
    "partner_reference": "BLEU-BK-12345",
    "court_id": 15,
    "court_name": "Court A",
    "venue_id": 3,
    "venue_name": "Abuja Tennis Club",
    "sport": {
      "id": 4,
      "name": "Tennis",
      "slug": "tennis"
    },
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "status": "active",
    "created_at": "2026-02-05T14:30:00+01:00",
    "released_at": null
  }
}`}</CodeBlock>

                <h4 className="text-md font-semibold mt-6 mb-2">Idempotency</h4>
                <p className="text-muted-foreground mb-2 text-sm">
                  If you send the same <code className="rounded bg-muted px-1">partner_reference</code> twice, the API returns the existing block with <code className="text-emerald-600">200 OK</code> instead of creating a duplicate. This makes the endpoint safe to retry on network failures.
                </p>
                <CodeBlock>{`HTTP 200 OK

{
  "success": true,
  "message": "Block already exists with this reference.",
  "data": {
    "block_reference": "EXT-A1B2",
    "partner_reference": "BLEU-BK-12345",
    ...
  }
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Error Responses</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Error Code</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>400</TableCell><TableCell>DATE_IN_PAST</TableCell><TableCell>Cannot block a slot in the past</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>DATE_TOO_FAR_AHEAD</TableCell><TableCell>Date exceeds partner&apos;s max advance days</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>VENUE_CLOSED</TableCell><TableCell>Venue is closed on this day</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>OUTSIDE_OPERATING_HOURS</TableCell><TableCell>Slot is outside operating hours</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>INVALID_TIME_RANGE</TableCell><TableCell>End time must be after start time</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>BLACKOUT_DATE</TableCell><TableCell>This date is unavailable</TableCell></TableRow>
                    <TableRow><TableCell>403</TableCell><TableCell>VENUE_ACCESS_DENIED</TableCell><TableCell>Partner doesn&apos;t have access to this venue</TableCell></TableRow>
                    <TableRow><TableCell>404</TableCell><TableCell>COURT_NOT_FOUND</TableCell><TableCell>Court ID doesn&apos;t exist</TableCell></TableRow>
                    <TableRow><TableCell>409</TableCell><TableCell>SLOT_UNAVAILABLE</TableCell><TableCell>Time slot is already booked or blocked</TableCell></TableRow>
                    <TableRow><TableCell>422</TableCell><TableCell>VALIDATION_ERROR</TableCell><TableCell>Missing or invalid fields</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Slot Unavailable Error Example</p>
                <CodeBlock>{`HTTP 409 Conflict

{
  "success": false,
  "error": "SLOT_UNAVAILABLE",
  "message": "This time slot is not available."
}`}</CodeBlock>
              </div>

              {/* 4. List Blocks */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">4. List Blocks</h3>
                <p className="text-muted-foreground mb-4">Retrieve all blocks created by your partner account.</p>

                <p className="text-sm font-medium mb-1">Query Parameters</p>
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
                    <TableRow><TableCell>court_id</TableCell><TableCell>integer</TableCell><TableCell>No</TableCell><TableCell>Filter by court ID</TableCell></TableRow>
                    <TableRow><TableCell>date_from</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Start date filter (YYYY-MM-DD)</TableCell></TableRow>
                    <TableRow><TableCell>date_to</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>End date filter (YYYY-MM-DD)</TableCell></TableRow>
                    <TableRow><TableCell>status</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Filter by status: active, released</TableCell></TableRow>
                    <TableRow><TableCell>per_page</TableCell><TableCell>integer</TableCell><TableCell>No</TableCell><TableCell>Results per page (max: 100, default: 50)</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X GET "${BASE_URL}/blocks?status=active&date_from=2026-02-01&per_page=50" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "blocks": [
      {
        "block_reference": "EXT-A1B2",
        "partner_reference": "BLEU-BK-12345",
        "court_id": 15,
        "court_name": "Court A",
        "venue_id": 3,
        "venue_name": "Abuja Tennis Club",
        "sport": { "id": 4, "name": "Tennis", "slug": "tennis" },
        "date": "2026-02-10",
        "start_time": "10:00",
        "end_time": "11:00",
        "status": "active",
        "created_at": "2026-02-05T14:30:00+01:00",
        "released_at": null
      },
      {
        "block_reference": "EXT-C3D4",
        "partner_reference": "BLEU-BK-12346",
        "court_id": 16,
        "court_name": "Court B",
        "venue_id": 3,
        "venue_name": "Abuja Tennis Club",
        "sport": { "id": 4, "name": "Tennis", "slug": "tennis" },
        "date": "2026-02-10",
        "start_time": "14:00",
        "end_time": "15:00",
        "status": "active",
        "created_at": "2026-02-05T15:00:00+01:00",
        "released_at": null
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 50,
      "total": 2,
      "last_page": 1
    }
  }
}`}</CodeBlock>
              </div>

              {/* 5. Get Block Details */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks/{`{blockReference}`}</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">5. Get Block Details</h3>
                <p className="text-muted-foreground mb-4">Retrieve details of a specific block by its reference.</p>

                <p className="text-sm font-medium mb-1">Path Parameters</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>blockReference</TableCell><TableCell>string</TableCell><TableCell>The SPOTTS-assigned block reference (e.g., EXT-A1B2)</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X GET "${BASE_URL}/blocks/EXT-A1B2" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "block_reference": "EXT-A1B2",
    "partner_reference": "BLEU-BK-12345",
    "court_id": 15,
    "court_name": "Court A",
    "venue_id": 3,
    "venue_name": "Abuja Tennis Club",
    "sport": { "id": 4, "name": "Tennis", "slug": "tennis" },
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "status": "active",
    "created_at": "2026-02-05T14:30:00+01:00",
    "released_at": null
  }
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Error Responses</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Error Code</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>404</TableCell><TableCell>BLOCK_NOT_FOUND</TableCell><TableCell>Block reference doesn&apos;t exist or belongs to another partner</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* 6. Reschedule Block (Atomic) */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="PUT" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks/{`{blockReference}`}/reschedule</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">6. Reschedule Block (Atomic)</h3>
                <p className="text-muted-foreground mb-4">Atomically reschedule a block to a new time slot. This endpoint ensures that either the reschedule succeeds completely (old block released, new block created), or fails completely — <strong>no partial state where the old block is released but the new slot is unavailable</strong>.</p>

                <p className="text-sm font-medium mb-1">Path Parameters</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>blockReference</TableCell><TableCell>string</TableCell><TableCell>The SPOTTS-assigned block reference to reschedule</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Request Body</p>
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
                    <TableRow><TableCell>court_id</TableCell><TableCell>integer</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>The new court to block</TableCell></TableRow>
                    <TableRow><TableCell>date</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>New date in YYYY-MM-DD format</TableCell></TableRow>
                    <TableRow><TableCell>start_time</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>New start time in HH:MM format</TableCell></TableRow>
                    <TableRow><TableCell>end_time</TableCell><TableCell>string</TableCell><TableCell><strong>Yes</strong></TableCell><TableCell>New end time in HH:MM format</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X PUT "${BASE_URL}/blocks/EXT-A1B2/reschedule" \\
  -H "Authorization: Bearer spk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "court_id": 15,
    "date": "2026-02-12",
    "start_time": "14:00",
    "end_time": "15:00"
  }'`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "message": "Block rescheduled successfully.",
  "data": {
    "old_block": {
      "block_reference": "EXT-A1B2",
      "court_id": 15,
      "date": "2026-02-10",
      "start_time": "10:00",
      "end_time": "11:00",
      "status": "released"
    },
    "new_block": {
      "block_reference": "EXT-C3D4",
      "partner_reference": "BLEU-BK-12345",
      "court_id": 15,
      "court_name": "Court A",
      "venue_id": 3,
      "venue_name": "Abuja Tennis Club",
      "date": "2026-02-12",
      "start_time": "14:00",
      "end_time": "15:00",
      "status": "active",
      "created_at": "2026-02-05T16:00:00+01:00"
    }
  }
}`}</CodeBlock>

                <h4 className="text-md font-semibold mt-6 mb-2">Why Use This Instead of Release + Create?</h4>
                <p className="text-muted-foreground mb-2 text-sm">
                  The <code className="rounded bg-muted px-1">release then create</code> approach is risky:
                </p>
                <ol className="list-decimal pl-6 space-y-1 text-muted-foreground text-sm mb-2">
                  <li><strong>Step 1:</strong> Release old block at 10:00 → succeeds</li>
                  <li><strong>Step 2:</strong> Create new block at 14:00 → <strong>FAILS</strong> (slot already taken)</li>
                  <li><strong>Result:</strong> User has no booking at all!</li>
                </ol>
                <p className="text-muted-foreground text-sm">
                  This endpoint does it atomically — either both operations succeed, or neither does.
                </p>

                <p className="text-sm font-medium mt-4 mb-1">Error Responses</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Error Code</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>400</TableCell><TableCell>DATE_IN_PAST</TableCell><TableCell>Cannot reschedule to a past date</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>DATE_TOO_FAR_AHEAD</TableCell><TableCell>Date exceeds partner&apos;s max advance days</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>VENUE_CLOSED</TableCell><TableCell>Venue is closed on the new day</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>OUTSIDE_OPERATING_HOURS</TableCell><TableCell>New slot is outside operating hours</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>INVALID_TIME_RANGE</TableCell><TableCell>End time must be after start time</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>BLACKOUT_DATE</TableCell><TableCell>New date is unavailable</TableCell></TableRow>
                    <TableRow><TableCell>403</TableCell><TableCell>VENUE_ACCESS_DENIED</TableCell><TableCell>Partner doesn&apos;t have access to the new venue</TableCell></TableRow>
                    <TableRow><TableCell>404</TableCell><TableCell>BLOCK_NOT_FOUND</TableCell><TableCell>Active block not found with this reference</TableCell></TableRow>
                    <TableRow><TableCell>404</TableCell><TableCell>COURT_NOT_FOUND</TableCell><TableCell>New court ID doesn&apos;t exist</TableCell></TableRow>
                    <TableRow><TableCell>409</TableCell><TableCell>SLOT_UNAVAILABLE</TableCell><TableCell>New time slot is already booked or blocked</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* 7. Release Block */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="DELETE" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/blocks/{`{blockReference}`}</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">7. Release Block</h3>
                <p className="text-muted-foreground mb-2">Release (cancel) a block, making the time slot available again for customers. Use this for cancellations — for rescheduling, use the Reschedule Block endpoint instead.</p>

                <WarningBox>
                  <strong>IMPORTANT:</strong> You <strong>MUST</strong> call this endpoint when a booking is <strong>cancelled</strong> and the slot is still in the future. This frees up the slot so other customers can book it.
                </WarningBox>

                <p className="text-sm font-medium mb-1">Path Parameters</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>blockReference</TableCell><TableCell>string</TableCell><TableCell>The SPOTTS-assigned block reference</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Query Parameters</p>
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
                    <TableRow><TableCell>reason</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Release reason: cancelled, completed, no_show</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X DELETE "${BASE_URL}/blocks/EXT-A1B2?reason=completed" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "message": "Block released successfully.",
  "release_reason": "completed"
}`}</CodeBlock>

                <h4 className="text-md font-semibold mt-6 mb-2">Idempotency</h4>
                <p className="text-muted-foreground mb-2 text-sm">If the block was already released, the API returns success:</p>
                <CodeBlock>{`{
  "success": true,
  "message": "Block was already released."
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Release Reasons</p>
                <Table className="mb-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reason</TableHead>
                      <TableHead>Required?</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>cancelled</TableCell><TableCell><strong>Yes</strong> (if slot is in future)</TableCell><TableCell>The booking was cancelled — releases the slot for others</TableCell></TableRow>
                    <TableRow><TableCell>completed</TableCell><TableCell>Optional</TableCell><TableCell>The session took place successfully — for tracking purposes only</TableCell></TableRow>
                    <TableRow><TableCell>no_show</TableCell><TableCell>Optional</TableCell><TableCell>The customer did not show up — for tracking purposes only</TableCell></TableRow>
                  </TableBody>
                </Table>
                <p className="text-muted-foreground text-sm">
                  Note: <code className="rounded bg-muted px-1">completed</code> and <code className="rounded bg-muted px-1">no_show</code> don&apos;t affect availability since the time has already passed. Use them for data hygiene and reporting.
                </p>

                <p className="text-sm font-medium mt-4 mb-1">Error Responses</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Error Code</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>404</TableCell><TableCell>BLOCK_NOT_FOUND</TableCell><TableCell>Block reference doesn&apos;t exist or belongs to another partner</TableCell></TableRow>
                    <TableRow><TableCell>422</TableCell><TableCell>INVALID_REASON</TableCell><TableCell>Invalid reason provided</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* 8. Webhook Deliveries */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="GET" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/webhooks/deliveries</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">8. Webhook Deliveries</h3>
                <p className="text-muted-foreground mb-4">View the history of webhook deliveries sent to your configured webhook URL.</p>

                <p className="text-sm font-medium mb-1">Query Parameters</p>
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
                    <TableRow><TableCell>status</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Filter by delivery status: success, failed, pending</TableCell></TableRow>
                    <TableRow><TableCell>event_type</TableCell><TableCell>string</TableCell><TableCell>No</TableCell><TableCell>Filter by event type (e.g., slot.booked, slot.freed)</TableCell></TableRow>
                    <TableRow><TableCell>per_page</TableCell><TableCell>integer</TableCell><TableCell>No</TableCell><TableCell>Results per page (max: 100, default: 50)</TableCell></TableRow>
                  </TableBody>
                </Table>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X GET "${BASE_URL}/webhooks/deliveries?status=failed&per_page=20" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "data": {
    "deliveries": [
      {
        "event_id": "evt_abc123_42",
        "event_type": "slot.freed",
        "status": "success",
        "attempts": 1,
        "response_status": 200,
        "created_at": "2026-02-05T14:35:00+01:00",
        "last_attempt_at": "2026-02-05T14:35:01+01:00",
        "payload": {
          "event_id": "evt_abc123_42",
          "event": "slot.freed",
          "timestamp": "2026-02-05T14:35:00+01:00",
          "data": {
            "court_id": 15,
            "court_name": "Court A",
            "venue_name": "Abuja Tennis Club",
            "date": "2026-02-10",
            "start_time": "10:00",
            "end_time": "11:00"
          }
        }
      }
    ],
    "pagination": { "current_page": 1, "per_page": 20, "total": 1, "last_page": 1 }
  },
  "webhook_config": {
    "url": "https://partner.example.com/webhooks/spotts",
    "status": "active",
    "consecutive_failures": 0
  }
}`}</CodeBlock>
              </div>

              {/* 9. Test Webhook */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <MethodBadge method="POST" />
                  <code className="text-sm font-mono text-muted-foreground">/v1/partner/webhooks/test</code>
                </div>
                <h3 className="text-xl font-semibold mb-2">9. Test Webhook</h3>
                <p className="text-muted-foreground mb-4">Send a test webhook to verify your endpoint is configured correctly.</p>
                <p className="text-muted-foreground text-sm mb-4">
                  <strong>Prerequisite:</strong> Webhook URL and secret must be configured by the SPOTTS admin team first.
                </p>

                <p className="text-sm font-medium mb-1">Example Request</p>
                <CodeBlock>{`curl -X POST "${BASE_URL}/webhooks/test" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Success Response <code className="text-emerald-600">200 OK</code></p>
                <CodeBlock>{`{
  "success": true,
  "message": "Test webhook sent successfully.",
  "status_code": 200,
  "response": "OK",
  "error": null
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Failure Response <code className="text-red-600">400 Bad Request</code></p>
                <CodeBlock>{`{
  "success": false,
  "message": "Test webhook failed.",
  "status_code": 500,
  "response": "Internal Server Error",
  "error": "HTTP 500"
}`}</CodeBlock>

                <p className="text-sm font-medium mt-4 mb-1">Error Responses</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Error Code</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>400</TableCell><TableCell>NO_WEBHOOK_URL</TableCell><TableCell>No webhook URL configured</TableCell></TableRow>
                    <TableRow><TableCell>400</TableCell><TableCell>NO_WEBHOOK_SECRET</TableCell><TableCell>No webhook secret configured</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </ApiSection>

            <ApiSection id="webhooks" title="Webhooks">
              <p className="text-muted-foreground mb-4">
                When configured, SPOTTS sends webhook notifications to your specified URL for events related to availability changes at venues you have access to.
              </p>

              <h3 className="text-lg font-semibold mb-2">Webhook Headers</h3>
              <CodeBlock>{`Content-Type: application/json
X-Spotts-Event: slot.booked
X-Spotts-Signature: <hmac_sha256_signature>
X-Spotts-Timestamp: 1706140800
X-Spotts-Event-Id: evt_abc123
User-Agent: SPOTTS-Webhook/1.0`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Signature Verification</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Signatures are generated using HMAC-SHA256 with the format: <code className="rounded bg-muted px-1">{`{timestamp}.{json_payload}`}</code>
              </p>

              <p className="text-sm font-medium mb-1">Node.js</p>
              <CodeBlock>{`const crypto = require('crypto');

function verifyWebhook(timestamp, payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(\`\${timestamp}.\${JSON.stringify(payload)}\`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// In your webhook handler:
app.post('/webhooks/spotts', (req, res) => {
  const timestamp = req.headers['x-spotts-timestamp'];
  const signature = req.headers['x-spotts-signature'];

  const isValid = verifyWebhook(
    timestamp,
    req.body,
    signature,
    process.env.SPOTTS_WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // Process the webhook...
  res.status(200).send('OK');
});`}</CodeBlock>

              <p className="text-sm font-medium mt-4 mb-1">Python</p>
              <CodeBlock>{`import hmac
import hashlib
import json

def verify_webhook(timestamp: str, payload: dict, signature: str, secret: str) -> bool:
    message = f"{timestamp}.{json.dumps(payload)}"
    expected = hmac.new(
        secret.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Webhook Events</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell>slot.booked</TableCell><TableCell>A slot was booked by a customer</TableCell></TableRow>
                  <TableRow><TableCell>slot.freed</TableCell><TableCell>A booking was cancelled, slot is now available</TableCell></TableRow>
                  <TableRow><TableCell>slot.blocked</TableCell><TableCell>A slot was blocked (by partner or venue staff)</TableCell></TableRow>
                  <TableRow><TableCell>slot.unblocked</TableCell><TableCell>A block was released, slot is now available</TableCell></TableRow>
                  <TableRow><TableCell>webhook.test</TableCell><TableCell>Test webhook (triggered via the test endpoint)</TableCell></TableRow>
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-6 mb-2">Webhook Payload Structure</h3>
              <CodeBlock>{`{
  "event_id": "evt_abc123_42",
  "event": "slot.freed",
  "timestamp": "2026-02-05T14:35:00+01:00",
  "data": {
    "court_id": 15,
    "court_name": "Court A",
    "venue_name": "Abuja Tennis Club",
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00"
  }
}`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Test Webhook Payload</h3>
              <CodeBlock>{`{
  "event_id": "evt_test123",
  "event": "webhook.test",
  "timestamp": "2026-02-05T14:35:00+01:00",
  "data": {
    "message": "This is a test webhook from SPOTTS",
    "partner_name": "Your Partner Name"
  }
}`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Retry Policy</h3>
              <p className="text-muted-foreground mb-4">
                Failed webhook deliveries are automatically retried. After consistent failures (default: 10), webhooks are automatically paused (circuit breaker pattern).
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Webhook Requirements</h3>
              <p className="text-muted-foreground mb-2">Your webhook endpoint must:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-sm">
                <li>Accept <code className="rounded bg-muted px-1">POST</code> requests with <code className="rounded bg-muted px-1">application/json</code> body</li>
                <li>Return a <code className="rounded bg-muted px-1">2xx</code> status code within <strong>10 seconds</strong></li>
                <li>Verify the <code className="rounded bg-muted px-1">X-Spotts-Signature</code> header</li>
                <li>Be idempotent (handle duplicate deliveries gracefully using <code className="rounded bg-muted px-1">event_id</code>)</li>
              </ul>
            </ApiSection>

            <ApiSection id="error-codes" title="Error Codes Reference">
              <p className="text-muted-foreground mb-4">Complete list of all error codes returned by the API:</p>
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
                  <TableRow><TableCell>API_KEY_REVOKED</TableCell><TableCell>401</TableCell><TableCell>API key has been permanently revoked</TableCell></TableRow>
                  <TableRow><TableCell>PARTNER_SUSPENDED</TableCell><TableCell>403</TableCell><TableCell>Partner account is temporarily suspended</TableCell></TableRow>
                  <TableRow><TableCell>VENUE_ACCESS_DENIED</TableCell><TableCell>403</TableCell><TableCell>Partner doesn&apos;t have access to the requested venue</TableCell></TableRow>
                  <TableRow><TableCell>RATE_LIMIT_EXCEEDED</TableCell><TableCell>429</TableCell><TableCell>Too many requests within the rate limit window</TableCell></TableRow>
                  <TableRow><TableCell>COURT_NOT_FOUND</TableCell><TableCell>404</TableCell><TableCell>Specified court ID does not exist</TableCell></TableRow>
                  <TableRow><TableCell>BLOCK_NOT_FOUND</TableCell><TableCell>404</TableCell><TableCell>Block reference not found or belongs to another partner</TableCell></TableRow>
                  <TableRow><TableCell>SLOT_UNAVAILABLE</TableCell><TableCell>409</TableCell><TableCell>Time slot is already booked or blocked</TableCell></TableRow>
                  <TableRow><TableCell>DATE_IN_PAST</TableCell><TableCell>400</TableCell><TableCell>Requested date is in the past</TableCell></TableRow>
                  <TableRow><TableCell>DATE_TOO_FAR_AHEAD</TableCell><TableCell>400</TableCell><TableCell>Date exceeds the partner&apos;s max advance days limit</TableCell></TableRow>
                  <TableRow><TableCell>VENUE_CLOSED</TableCell><TableCell>400</TableCell><TableCell>Venue is closed on this day</TableCell></TableRow>
                  <TableRow><TableCell>OUTSIDE_OPERATING_HOURS</TableCell><TableCell>400</TableCell><TableCell>Slot is outside operating hours</TableCell></TableRow>
                  <TableRow><TableCell>INVALID_TIME_RANGE</TableCell><TableCell>400</TableCell><TableCell>End time must be after start time</TableCell></TableRow>
                  <TableRow><TableCell>BLACKOUT_DATE</TableCell><TableCell>400</TableCell><TableCell>This date is unavailable</TableCell></TableRow>
                  <TableRow><TableCell>INVALID_REASON</TableCell><TableCell>422</TableCell><TableCell>Invalid release reason provided</TableCell></TableRow>
                  <TableRow><TableCell>RESCHEDULE_FAILED</TableCell><TableCell>500</TableCell><TableCell>Atomic reschedule operation failed</TableCell></TableRow>
                  <TableRow><TableCell>NO_WEBHOOK_URL</TableCell><TableCell>400</TableCell><TableCell>No webhook URL configured</TableCell></TableRow>
                  <TableRow><TableCell>NO_WEBHOOK_SECRET</TableCell><TableCell>400</TableCell><TableCell>No webhook secret configured</TableCell></TableRow>
                  <TableRow><TableCell>VALIDATION_ERROR</TableCell><TableCell>422</TableCell><TableCell>Request validation failed</TableCell></TableRow>
                </TableBody>
              </Table>
            </ApiSection>

            <ApiSection id="quick-start" title="Quick Start Guide">
              <h3 className="text-lg font-semibold mb-2">Step 1: Get Your API Key</h3>
              <p className="text-muted-foreground mb-4">
                Contact the SPOTTS team to get onboarded as a partner. You&apos;ll receive an API key in format <code className="rounded bg-muted px-1">spk_...</code> (shown only once — save it securely) and confirmation of which venues you have access to.
              </p>

              <h3 className="text-lg font-semibold mb-2">Step 2: List Available Courts</h3>
              <CodeBlock>{`curl -X GET "${BASE_URL}/courts" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 3: Check Availability</h3>
              <CodeBlock>{`curl -X GET "${BASE_URL}/courts/15/availability?date=2026-02-10" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 4: Create a Block</h3>
              <CodeBlock>{`curl -X POST "${BASE_URL}/blocks" \\
  -H "Authorization: Bearer spk_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "court_id": 15,
    "date": "2026-02-10",
    "start_time": "10:00",
    "end_time": "11:00",
    "partner_reference": "YOUR-BOOKING-ID-123"
  }'`}</CodeBlock>

              <h3 className="text-lg font-semibold mt-6 mb-2">Step 5: Release Cancelled Blocks (REQUIRED)</h3>
              <WarningBox>
                Always release blocks immediately when bookings are cancelled!
              </WarningBox>
              <CodeBlock>{`# When a booking is cancelled (REQUIRED - frees the slot for others)
curl -X DELETE "${BASE_URL}/blocks/EXT-A1B2?reason=cancelled" \\
  -H "Authorization: Bearer spk_your_api_key_here"

# When a booking is completed (OPTIONAL - for tracking only)
curl -X DELETE "${BASE_URL}/blocks/EXT-A1B2?reason=completed" \\
  -H "Authorization: Bearer spk_your_api_key_here"`}</CodeBlock>
            </ApiSection>

            <ApiSection id="best-practices" title="Integration Best Practices">
              <h3 className="text-lg font-semibold mb-2">1. Always Release Cancelled Blocks (Future Slots)</h3>
              <p className="text-muted-foreground mb-6">
                When a booking is <strong>cancelled</strong> on your platform and the slot is still in the future, immediately call the Release Block endpoint with <code className="rounded bg-muted px-1">reason=cancelled</code>. This is critical for maintaining accurate availability across platforms.
              </p>
              <p className="text-muted-foreground mb-6">
                Releasing blocks for <code className="rounded bg-muted px-1">completed</code> or <code className="rounded bg-muted px-1">no_show</code> bookings is optional — the time has already passed, so it doesn&apos;t affect availability. However, doing so keeps your block list clean and helps with reporting.
              </p>

              <h3 className="text-lg font-semibold mb-2">2. Use Idempotency Keys</h3>
              <p className="text-muted-foreground mb-6">
                Always include a unique <code className="rounded bg-muted px-1">partner_reference</code> when creating blocks. If a network error occurs, you can safely retry the same request without creating duplicate blocks.
              </p>

              <h3 className="text-lg font-semibold mb-2">3. Cache Court Lists</h3>
              <p className="text-muted-foreground mb-6">
                Court lists rarely change. Cache the response from <code className="rounded bg-muted px-1">GET /courts</code> and refresh every few hours rather than on every request.
              </p>

              <h3 className="text-lg font-semibold mb-2">4. Handle Rate Limits Gracefully</h3>
              <p className="text-muted-foreground mb-6">
                Check the <code className="rounded bg-muted px-1">X-RateLimit-Remaining</code> header. When approaching zero, back off and wait before making more requests. If you receive a <code className="rounded bg-muted px-1">429</code>, respect the <code className="rounded bg-muted px-1">Retry-After</code> header.
              </p>

              <h3 className="text-lg font-semibold mb-2">5. Implement Webhook Handlers</h3>
              <p className="text-muted-foreground mb-6">
                Set up a webhook endpoint to receive real-time notifications about availability changes. This is more efficient than polling.
              </p>

              <h3 className="text-lg font-semibold mb-2">6. Verify Webhook Signatures</h3>
              <p className="text-muted-foreground mb-6">
                Always validate the <code className="rounded bg-muted px-1">X-Spotts-Signature</code> header to ensure webhooks are genuinely from SPOTTS.
              </p>

              <h3 className="text-lg font-semibold mb-2">7. Handle Timezones Correctly</h3>
              <p className="text-muted-foreground">
                All times are in <strong>West Africa Time (WAT / UTC+1)</strong>. Dates are in <code className="rounded bg-muted px-1">YYYY-MM-DD</code> format. Times are in <code className="rounded bg-muted px-1">HH:MM</code> 24-hour format.
              </p>
            </ApiSection>

            <ApiSection id="support" title="Support">
              <p className="text-muted-foreground mb-4">For API support, integration questions, or to report issues:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li><strong className="text-foreground">Email:</strong> <a href="mailto:info@spottsapp.com" className="text-primary hover:underline">info@spottsapp.com</a></li>
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
