import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function () {
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
}