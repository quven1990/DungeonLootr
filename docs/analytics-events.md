# Analytics Event Contract

The site sends the same privacy-safe event names to GA4, Plausible, and Microsoft Clarity.
Plausible receives low-cardinality properties; Clarity receives the event name only.

## Events

| Event | Trigger | Properties |
|---|---|---|
| `code_copy` | A code is successfully copied | `code`, `code_status`, `presentation`, `page_path` |
| `code_copy_error` | Clipboard copy fails | `code_status`, `page_path` |
| `video_play` | Embedded YouTube player first reaches PLAYING | `video_id`, `placement`, `page_path` |
| `video_open_youtube` | User opens the video on YouTube | `video_id`, `placement`, `page_path` |
| `calculator_use` | Valid calculator inputs settle for 700 ms | `rate_bucket`, `attempts_bucket`, `target_percent`, `page_path` |
| `class_finder_use` | Class filters/search settle for 700 ms | `tier`, `mode`, `has_query`, `result_count`, `page_path` |
| `class_result_open` | User opens a class from filtered results | `class_slug`, `result_view`, `page_path` |
| `aspect_matcher_use` | User changes the Aspect goal | `goal`, `page_path` |
| `aspect_result_open` | User opens a matched class | `class_slug`, `goal`, `page_path` |

## Interpretation

- `code_copy` is a redemption-intent proxy. The website cannot observe whether Roblox accepts the code.
- `video_play` is counted once per embedded player mount, not on every pause/resume.
- Calculator rates and attempt counts are bucketed to avoid high-cardinality analytics.
- Class Finder never sends the text typed into its search field.
- No email, account ID, IP address, clipboard contents, or other user-provided text is added to event properties.

## Plausible goal setup

The event names above were registered as custom event goals for `dungeonlootr.top` through
the ShipSolo API on 2026-09-09. They can be queried through the Plausible goal breakdown after
the first production interactions arrive.
